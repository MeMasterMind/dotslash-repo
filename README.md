
# Transaction Compliance Tool: Anomaly Detection and Explainable AI  

![Anomaly Detection](https://img.shields.io/badge/Anomaly%20Detection-Isolation%20Forest-brightgreen)
![Explainability](https://img.shields.io/badge/Explainability-SHAP-blue)
![Python](https://img.shields.io/badge/Python-3.8%2B-yellow)
![NodeJS](https://img.shields.io/badge/NodeJS-22.11%2B-green)


## Overview  

In today’s stringent regulatory environment, businesses must manage complex compliance requirements effectively. Our comprehensive transaction compliance solution combines advanced analytics, machine learning, and a multilingual chatbot interface to streamline compliance, detect anomalies, and maintain financial oversight. 



## Key Functionalities

### 1. Fault and Anomaly Detection
- **Real-Time Monitoring**: Live overview of compliance health.
- **Isolation Forest Algorithm**: Identifies irregular transaction patterns and isolates anomalies early.

### 2. User-Specific Data Input and Adaptive Learning
- **Customizable Data Input**: Add individual transaction records without uploading entire files.
- **Model Re-Training**: Continuously adapts to updated datasets for improved anomaly detection.

### 3. Suspicious Activity Analysis
- **Comprehensive Scanning**: Analyzes transaction patterns and client profiles for fraud detection.
- **Risk Assessment Models**: Quantifies and prioritizes risks for effective response.

### 4. Machine Learning-Driven Compliance
- **Automated Processes**: Frees up resources by automating compliance tasks.
- **Predictive Insights**: Mitigates risks proactively with advanced analytics.
- **Continuous Learning**: Adapts to new data and regulatory updates.

### 5. Multilingual Chatbot Integration for Financial Guidance
- **Real-Time Assistance**: Open Web UI integrated with LLaMA for multilingual support.
- **Analytical Insights**: Data-driven responses and financial forecasts.

## Detecting Faults and Anomalies in Transaction Data

### Process
1. **Data Ingestion**: Securely ingest financial data in real-time or add individual transactions.
2. **Anomaly Detection**: Isolation Forest algorithm retrains with each input for precision.
3. **Automated Alerts**: Immediate alerts for proactive compliance actions.
4.  **95% Model Accuracy**:
![model accuracy](https://i.imgur.com/e5x9Fa9.jpeg)

## Solution Overview

Our transaction compliance solution streamlines financial processes, detects compliance risks early, and enhances financial oversight by leveraging:
- Sophisticated machine learning models.
- Customizable data input.
- Multilingual support:
![multilingual support ](https://i.imgur.com/G5G3nPy.jpeg)

## Technologies Used  
### Machine Learning
- *Programming Language*: Python 3.8+ 
- *Libraries*:
  - pandas – Data manipulation.
  - scikit-learn – Machine learning algorithms (Isolation Forest).
  - shap – Explainable AI.
  - matplotlib – Visualization.
  - pickle – Model persistence.  
 ### Web App
 - *Programming Language*: Javascript
 - *Libraries & Tools*:
   - Node JS / Express  - Backend server setup
   - Mongo DB - Database to store user data
   - multer, csv-writer & csv-parser - To Manipulate data recieved through http requests and feed it into our ML model
   - child_process - to run the ML model directly in our NodeJS environment
   - React - Front-end
   - Lucide Icons - Icon library


## Installation  & How to use

1. Clone the repository:  
 ```bash
 git clone https://github.com/memastermind/dotslash-repo.git
 cd final-hack
   ```

2. Run the front-end:
```bash
cd client
npm install
npm run dev
or
npm build
```
   

3. Start the server, along with the ML model:
```bash
cd ..
cd server
npm install
npm start
```
4. Run the chat bot locally (it will automatically connect to our app):
- download [llama3.2:1b](https://ollama.com/library/llama3.2:1b)
- run [docker desktop](https://www.docker.com/products/docker-desktop/)
-  open a new terminal instance on your pc and run:
```bash
docker run -d -p 6969:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```
5. The app is up and running!! Go to the url mentioned in your terminal to view it. Make sure to checkout `server/transactions.csv` to get an idea of the required transaction fields (this is also available in the dashboard ui). 


## Example Outputs  

### 1. Anomalies Detected  
via form filling or direct CSV upload:
![running program GIF](https://i.imgur.com/lnxuurF.gif)
  
  
### 2. Scatter Plot  
A scatter plot showing anomalies in the Amount column is displayed with anomalies in red.  (Development only)

![Scatter Plot](https://i.imgur.com/OhOpvyq.jpeg)


## Future Enhancements  

1. *Additional Features*:
   - Incorporate other columns like Merchant Name, Transaction Time, and Is Fraud? for enhanced analysis.  
2. *Real-Time Stream Integration*:
   - Enable detection in real-time transaction streams.  
3. *Interactive UI*:
   - Build a front-end dashboard for easier interaction and insights visualization.  
4. *Advanced Explainability*:
   - Add interactive SHAP visualizations for detailed feature importance analysis.  
5. *Regulatory Compliance*:
   - Extend to meet compliance standards such as PCI DSS and GDPR.  


## Contributing  

Contributions are welcome! Please fork the repository, create a branch, and submit a pull request.  


## License  

This project is licensed under the MIT License. See the LICENSE file for details.  
