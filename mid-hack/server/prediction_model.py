import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
import json
import sys

csv_path = sys.argv[1]
credit_df = pd.read_csv(csv_path)

credit_df.fillna(method='ffill', inplace=True)

credit_df['Amount'] = credit_df['Amount'].replace({r'\$': '', ',': ''}, regex=True).astype(float)

features = credit_df[['Amount']].copy()

scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)

iso_forest = IsolationForest(contamination=0.05, random_state=42)
credit_df['anomaly_score'] = iso_forest.fit_predict(features_scaled)

credit_df['anomaly'] = credit_df['anomaly_score'].apply(lambda x: 'Anomaly' if x == -1 else 'Normal')

anomalies = credit_df[credit_df['anomaly'] == 'Anomaly']

result = anomalies[['User', 'Card', 'Year', 'Month', 'Day', 'Time', 'Amount', 'Merchant Name', 'Is Fraud?']].to_json(orient='records')

print(result)
