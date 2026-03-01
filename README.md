# Companies_sector_research
Company Growth Prediction Project
Table of Contents

Project Overview

Features

System Requirements

Installation and Setup

Usage

Testing Strategies

Demonstration & Screenshots

Deployment Links

Analysis

Discussion

Recommendations & Future Work

Project Overview

The Company Growth Prediction application predicts the growth trajectory of companies based on multiple features such as industry, country, company age, and employee metrics.

It leverages machine learning models (Random Forest, XGBoost) for clustering and growth-level predictions. The app tracks prediction history and displays visual insights through interactive charts.

This project demonstrates full-stack deployment with:

Backend API deployed on Render

Frontend React app deployed on Netlify

Features

Predict company growth cluster and confidence

Auto-select the best performing model or manually choose a model

Input features via interactive sliders and dropdowns

View historical predictions in charts

Debug info to verify API requests/responses

System Requirements

Backend: Python 3.10+, Flask, scikit-learn, XGBoost, LightGBM, CatBoost

Frontend: Node.js 18+, npm 9+, React 18+

Browser compatible: Chrome, Firefox, Safari

Installation and Setup
Backend (Render)

Clone the repository:

git clone https://github.com/WanPgui/Companies_sector_research.git
cd Companies_sector_research/Company_growth_data_clustering_project

Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

Install Python dependencies:

pip install -r requirements.txt

Run the backend API:

python app.py

Test API endpoints in browser or Postman:

GET / → Returns {"routes":["/predict","/template","/health"],"status":"API Running"}

POST /predict → Accepts JSON payload, returns cluster, prediction, confidence

Frontend (React / Netlify)

Navigate to frontend directory:

cd frontend

Install Node dependencies:

npm install

Run locally (optional):

npm start

Build frontend for deployment:

npm run build

Deploy to Netlify:

Link to repo

Ensure .netlify.toml is configured

Confirm environment variable:

REACT_APP_API_URL=https://companies-sector-research.onrender.com
Usage

Open the deployed frontend (Netlify link below)

Select Industry, Country

Adjust sliders for:

Company Age

Average Size

Current Employees

Total Employees

Choose Model Type or leave as Auto

Click Run Prediction

Observe:

Prediction cluster and confidence

Model used

History chart updates

Testing Strategies

Unit / Component Testing

Tested individual frontend components: dropdowns, sliders, prediction cards

Integration Testing

End-to-end test from input → API → result → chart update

Boundary / Edge Value Testing

Extreme values for company age, employee size, and total employees

Performance Testing

Tested app on low-end laptop, standard desktop, and mobile browser

Verified API latency < 1 second for predictions

Demonstration & Screenshots

Screenshot of prediction result with cluster, confidence, and model

Screenshot of history chart updating after multiple predictions

Screenshot of debug info showing request and response JSON

Video demo (5 minutes) demonstrating:

Prediction flow

Model auto-selection

Edge case testing

History chart

(Insert screenshots/video links here)

Deployment Links

Backend API (Render): https://companies-sector-research.onrender.com

Frontend App (Netlify): https://your-netlify-link.netlify.app

Analysis

Predictions are consistent with expected growth patterns for test inputs

Confidence values reflect model certainty across different industries and employee sizes

Some edge cases (extremely small or large values) may produce slightly lower confidence due to clustering behavior

Objectives from the project proposal are fully achieved: interactive prediction, multiple model support, history tracking, chart visualization

Discussion

Milestones Achieved:

Full-stack deployment of backend API and React frontend

Integration of multiple ML models with dynamic selection

Visual presentation of prediction history

Impact:

Provides quick, data-driven insights on company growth potential

Supports decision-making for investors, analysts, and researchers

Recommendations & Future Work

Community Recommendations:

Use for research, sector analysis, and company evaluation

Can be integrated with additional data sources for improved predictions

Future Work:

Mobile-optimized UI

Multi-language support

Add more ML models (LightGBM, CatBoost)

Continuous retraining with live data
