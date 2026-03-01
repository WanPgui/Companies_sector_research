from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load models
kmeans = joblib.load("kmeans_cluster_model (1).pkl")

# Random Forest models
rf_category = joblib.load("random_forest_growth_category.pkl")
rf_level = joblib.load("random_forest_growth_level.pkl")

# XGBoost models
xgb_category = joblib.load("xgboost_growth_category.pkl")
xgb_level = joblib.load("xgboost_growth_level.pkl")

# Mapping for easy selection
MODEL_MAP = {
    "rf_category": rf_category,
    "rf_level": rf_level,
    "xgb_category": xgb_category,
    "xgb_level": xgb_level
}

# Features for KMeans (6 features)
KMEANS_FEATURES = [
    'industry_enc',
    'country_enc',
    'company_age',
    'avg_size',
    'current_employee_estimate',
    'total_employee_estimate'
]

# Features for ML models (7 features including cluster_enc)
ML_FEATURES = KMEANS_FEATURES + ['cluster_enc']

@app.route("/")
def home():
    return "API Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        # Select model type
        model_type = data.get("model_type", "rf_category")
        if model_type not in MODEL_MAP:
            return jsonify({"error": f"Invalid model_type. Choose from {list(MODEL_MAP.keys())}"}), 400

        model = MODEL_MAP[model_type]

        # Convert input to DataFrame
        df = pd.DataFrame([data])
        df.drop(columns=["model_type"], errors="ignore", inplace=True)

        # Check for missing features for KMeans
        missing_kmeans = [f for f in KMEANS_FEATURES if f not in df.columns]
        if missing_kmeans:
            return jsonify({"error": f"Missing features for KMeans: {missing_kmeans}"}), 400

        # Predict cluster using KMeans
        cluster = int(kmeans.predict(df[KMEANS_FEATURES])[0])

        # Add cluster_enc for ML model
        df['cluster_enc'] = cluster

        # Check for missing features for ML model
        missing_ml = [f for f in ML_FEATURES if f not in df.columns]
        if missing_ml:
            return jsonify({"error": f"Missing features for ML model: {missing_ml}"}), 400

        # Reorder columns for ML model
        df = df[ML_FEATURES]

        # Predict growth class
        pred = model.predict(df)[0]
        prob = model.predict_proba(df).max()

        return jsonify({
            "cluster": cluster,
            "prediction": str(pred),
            "confidence": float(prob)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/template")
def template():
    try:
        return send_file("classification_results.csv", as_attachment=True)
    except FileNotFoundError:
        return jsonify({"error": "Template file not found"}), 404

import os
from os import getenv, path

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render uses dynamic port
    app.run(host="0.0.0.0", port=port)