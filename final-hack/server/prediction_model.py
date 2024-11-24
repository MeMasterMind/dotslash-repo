import sys
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
import shap
import json
import pickle

def process_csv(file_path):
    # Load the dataset
    try:
        credit_df = pd.read_csv(file_path)
    except Exception as e:
        return {"error": f"Failed to load CSV file: {str(e)}"}

    # Fill missing values using forward fill
    credit_df.fillna(method='ffill', inplace=True)

    # Ensure 'Amount' column exists
    if 'Amount' not in credit_df.columns:
        return {"error": "The uploaded CSV file must contain an 'Amount' column."}

    # Remove the '$' sign from 'Amount' and convert it to numeric
    try:
        credit_df['Amount'] = credit_df['Amount'].replace({r'\$': '', ',': ''}, regex=True).astype(float)
    except Exception as e:
        return {"error": f"Failed to process 'Amount' column: {str(e)}"}

    # Select relevant features for anomaly detection
    features = credit_df[['Amount']].copy()

    # Normalize the 'Amount' column
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)

    # Train the Isolation Forest model
    iso_forest = IsolationForest(contamination=0.05, random_state=42)
    credit_df['anomaly_score'] = iso_forest.fit_predict(features_scaled)

    # Flag anomalies (-1 is an anomaly, 1 is normal)
    credit_df.loc[:, 'anomaly'] = credit_df['anomaly_score'].apply(lambda x: 'Anomaly' if x == -1 else 'Normal')

    # Add SHAP explanations
    background_data = shap.kmeans(features_scaled, 10)
    explainer = shap.KernelExplainer(iso_forest.decision_function, background_data)
    shap_values = explainer.shap_values(features_scaled)

    # Add explanations to the anomalies
    def get_explanation(index):
        shap_explanation = shap_values[index]
        explanation = {
            "feature_contributions": [
                {"feature": features.columns[i], "contribution": shap_explanation[i]}
                for i in range(len(features.columns))
            ]
        }
        explanation_text = f"This transaction increased the suspicion score by {shap_explanation[0]:.2f}, due to the feature '{features.columns[0]}'."
        explanation["explanation_text"] = explanation_text
        return explanation

    anomalies = credit_df[credit_df['anomaly'] == 'Anomaly']
    anomalies = anomalies.copy()  # Creating a copy to avoid modifying the original DataFrame
    anomalies.loc[:, 'explanation'] = anomalies.index.map(lambda i: get_explanation(i))

    # Convert anomalies to JSON format
    anomalies_json = anomalies.to_json(orient='records')
    return json.loads(anomalies_json)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "File path not provided as an argument."}))
        sys.exit(1)

    file_path = sys.argv[1]
    result = process_csv(file_path)
    print(json.dumps(result))
