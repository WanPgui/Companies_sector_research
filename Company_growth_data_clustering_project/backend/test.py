import pandas as pd
import joblib

model = joblib.load("random_forest_growth_category.pkl")
kmeans = joblib.load("kmeans_cluster_model (1).pkl")

# Example input
df = pd.DataFrame([{
    "industry_enc": 2,
    "country_enc": 1,
    "company_age": 10,
    "avg_size": 50,
    "current_employee_estimate": 200,
    "total_employee_estimate": 220
}])

# Predict cluster
cluster = int(kmeans.predict(df)[0])
df['cluster_enc'] = cluster

# Predict
pred = model.predict(df)[0]
prob = model.predict_proba(df).max()

print(pred, prob)
