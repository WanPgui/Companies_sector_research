from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import logging
import os

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

# Load all models
try:
    kmeans = joblib.load("kmeans_cluster_model (1).pkl")
    rf_category = joblib.load("random_forest_growth_category.pkl")
    rf_level = joblib.load("random_forest_growth_level.pkl")
    xgb_category = joblib.load("xgboost_growth_category.pkl")
    xgb_level = joblib.load("xgboost_growth_level.pkl")
    logging.info("Models loaded successfully.")
except Exception as e:
    logging.error(f"Error loading models: {e}")

# Map model names to objects for easy selection
MODEL_MAP = {
    "rf_category": rf_category,
    "rf_level": rf_level,
    "xgb_category": xgb_category,
    "xgb_level": xgb_level
}

# Features used by KMeans
KMEANS_FEATURES = [
    'industry_enc',
    'country_enc',
    'company_age',
    'avg_size',
    'current_employee_estimate',
    'total_employee_estimate'
]

# Features used by ML models (includes cluster)
ML_FEATURES = KMEANS_FEATURES + ['cluster_enc']

# Root route to check if API is running
@app.route("/")
def home():
    return jsonify({
        "status": "API Running",
        "routes": ["/predict", "/template", "/health"]
    })

# Health check endpoint
@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200

# Endpoint to make predictions
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        # Select the model type from request, default is rf_category
        model_type = data.get("model_type", "rf_category")
        if model_type not in MODEL_MAP:
            return jsonify({"error": f"Invalid model_type. Choose from {list(MODEL_MAP.keys())}"}), 400

        model = MODEL_MAP[model_type]

        # Convert input data to DataFrame
        df = pd.DataFrame([data])
        df.drop(columns=["model_type"], errors="ignore", inplace=True)

        # Check for missing features needed for KMeans
        missing_kmeans = [f for f in KMEANS_FEATURES if f not in df.columns]
        if missing_kmeans:
            return jsonify({"error": f"Missing features for KMeans: {missing_kmeans}"}), 400

        # Predict cluster using KMeans
        cluster = int(kmeans.predict(df[KMEANS_FEATURES])[0])
        df['cluster_enc'] = cluster  # Add cluster info to ML features

        # Check for missing features needed for ML model
        missing_ml = [f for f in ML_FEATURES if f not in df.columns]
        if missing_ml:
            return jsonify({"error": f"Missing features for ML model: {missing_ml}"}), 400

        # Reorder columns for ML model
        df = df[ML_FEATURES]

        # Make prediction and get confidence
        pred = model.predict(df)[0]
        prob = model.predict_proba(df).max()

        return jsonify({
            "cluster": cluster,
            "prediction": str(pred),
            "confidence": float(prob)
        })

    except Exception as e:
        logging.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

# Endpoint to download template CSV
@app.route("/template")
def template():
    try:
        return send_file("classification_results.csv", as_attachment=True)
    except FileNotFoundError:
        return jsonify({"error": "Template file not found"}), 404

# Start the Flask app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render sets PORT automatically
    logging.info(f"Starting server on port {port}")
    app.run(host="0.0.0.0", port=port)
