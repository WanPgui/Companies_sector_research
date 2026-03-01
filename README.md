#  Companies Sector Research: Company Growth Prediction Project

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-green)
![Netlify](https://img.shields.io/badge/Frontend-Netlify-success)

---

## Table of Contents
1. Project Overview
2. Features & Models
3. System Requirements
4. Installation and Setup
5. Usage
6. Testing Strategies
7. Demonstration & Screenshots
8. Deployment Links
9. Analysis
10. Discussion
11. Recommendations & Future Work

---

## Link to demo video; https://drive.google.com/drive/folders/1D1Dof7iyBkeCpdZoWuEurGkT4evuKkIo?usp=sharing


## Project Overview
The Company Growth Prediction application predicts the growth trajectory of companies based on multiple features:

- Industry
- Country
- Company age
- Employee metrics

It leverages machine learning models (Random Forest, XGBoost) for clustering  similar companies and growth-level predictions. Users can track prediction history and visualize insights through interactive charts to predict sector performances.

Deployment Highlights:
- Backend API deployed on Render
- Frontend React app deployed on Netlify

---

## Features & Models

| Feature | Description | Model Options |
|---------|-------------|---------------|
| Growth Prediction | Predicts the growth cluster of a company | Auto-select best model, or choose manually |
| Input Sliders & Dropdowns | Interactive UI for entering company features | N/A |
| History Tracking | View historical predictions in charts | N/A |
| Debug Info | Inspect API requests and responses | N/A |
| ML Models | Ensemble learning for accurate predictions | Random Forest, XGBoost (future: LightGBM, CatBoost) |

---

## System Requirements
Backend: Python 3.10+, Flask, scikit-learn, XGBoost, LightGBM, CatBoost  
Frontend: Node.js 18+, npm 9+, React 18+  
Browser Compatibility: Chrome, Firefox, Safari

---

## Installation and Setup

### Backend (Render)
Clone the repository and navigate to project:
git clone https://github.com/WanPgui/Companies_sector_research.git  
cd Companies_sector_research/Company_growth_data_clustering_project  

Create and activate a virtual environment:
python -m venv venv  
# Linux / Mac  
source venv/bin/activate  
# Windows  
venv\Scripts\activate  

Install dependencies:
pip install -r requirements.txt  

Run the backend API:
python app.py  

Test API Endpoints:
- GET / → {"routes":["/predict","/template","/health"],"status":"API Running"}  
- POST /predict → Accepts JSON payload, returns cluster, prediction, confidence  

### Frontend (React / Netlify)
Navigate to frontend directory:
cd frontend  

Install dependencies:
npm install  

Run locally (optional):
npm start  

Build for deployment:
npm run build  

Deploy to Netlify:
- Link repository to Netlify  
- Ensure .netlify.toml configured  
- Set environment variable: REACT_APP_API_URL=https://companies-sector-research.onrender.com  

---

## Usage
1. Open the deployed frontend  
2. Select Industry and Country  
3. Adjust sliders for: Company Age, Average Size, Current Employees, Total Employees  
4. Choose Model Type or leave as Auto  
5. Click Run Prediction  
6. Observe: Prediction cluster, confidence, model used, history chart updates  

---

## Testing Strategies
# Testing Steps for Company Growth Prediction Project


## 1. Backend Testing (API)

**Start the Backend API**
cd Companies_sector_research/Company_growth_data_clustering_project  
source venv/bin/activate   # Linux/Mac  
venv\Scripts\activate      # Windows  
python app.py  


**Start the Backend Locally**
cd frontend  
npm install  
npm start  
- Ensure the console displays: API Running or the local browser:http://localhost:5000 shows that "Backend is running!".
**Check API Routes**
- Open a browser or Postman  
- Test GET `/` → should return: {"routes":["/predict","/template","/health"],"status":"API Running"}

**Test the Predict Endpoint**
- Endpoint: POST `/predict`  
- Example JSON payload:  
{"industry": "Technology","country": "Kenya","company_age": 5,"avg_size": 50,"current_employees": 45,"total_employees": 60,"model_type": "Auto"}  

- Expected response: cluster, prediction, confidence, and model used  
- Confirm API handles edge values (very small or very large numbers)

**Check Debug Info**
- Verify request/response JSON shows correct mapping from input → output  
- Ensure there are no console errors  

---

## 2. Frontend Testing (React)

**Start the Frontend Locally**
cd frontend  
npm install  
npm start  

- Open browser at http://localhost:3000  

**Test UI Components**
- Check sliders, dropdowns, and input fields  
- Confirm both Auto and Manual model selection work  

**Run Predictions**
- Fill in all inputs and click Run Prediction  
- Observe:  
  - Predicted cluster  
  - Confidence value  
  - Model used  
  - History chart updates in real-time  

**Check Responsiveness**
- Resize browser to mobile and tablet sizes  
- Verify charts, sliders, and other UI elements adjust correctly  

---

## 3. End-to-End Testing

- Input data in frontend → click Run Prediction → results appear  
- Verify backend logs match frontend display  
- Test edge cases (company age = 0 or 100+, total employees = 1 or 10000+)  
- Confirm history chart updates after multiple predictions  
- Ensure API latency < 1 second  

---

## Demonstration & Screenshots
1. Introduction  
   - Explain project purpose, features, and deployment links  

2. Backend Demo  
   - Show API running on Render  
   - Test GET `/` and POST `/predict` using Postman  

3. Frontend Demo  
   - Open Netlify frontend  
   - Fill inputs for a company and click Run Prediction  
   - Highlight predicted cluster, confidence, and model used  

4. Edge Case Example  
   - Use extreme/unusual input values  
   - Show how prediction and confidence behave  

5. History Chart  
   - Make multiple predictions and show chart updating  

6. Debug Panel  
   - Toggle debug info to show API request/response JSON  

7. Conclusion  
   - Summarize predictions, accuracy, and potential use cases  

---

- Prediction results: cluster, confidence, model  
- History chart after multiple predictions  
- Debug info JSON requests/responses  
- Video demo (5 min) showing: flow, model selection, edge case handling, history chart
  
Link to demo video- https://drive.google.com/drive/folders/1D1Dof7iyBkeCpdZoWuEurGkT4evuKkIo?usp=drive_link


(link to other related files with screenshots and graphs: https://github.com/WanPgui/Companies_sector_research/tree/main/Files)  

Link to the document for further analysis; https://docs.google.com/document/d/1FyGAE_pZvPNrI3Ia3kf9BCSbKmb4VWiyY7VK8NtN5BE/edit?usp=sharing

---

## Deployment Links
- Backend API (Render): https://companies-sector-research.onrender.com  
- Frontend App (Netlify): https://companies-sector-research-app.netlify.app
---

## Analysis
- Predictions align with expected growth patterns  
- Confidence reflects model certainty across industries  
- Extreme values may slightly lower confidence  
- Project objectives achieved: interactive prediction, multiple models, history tracking, chart visualization  

---

## Discussion
Milestones Achieved:
- Full-stack backend and React frontend deployment  
- Multiple ML models with dynamic selection  
- Visual presentation of prediction history

 This project aimed to create a system that would forecast the company's growth using machine learning models and compare the performance of various algorithms. This was accomplished according to the results received.

Interestingly, the comparison between random forest and XGBoost shows that ensemble learning techniques are highly efficient for structured business data. In this instance, it was a bit superior to random Forest and this is mainly due to the fact that random forest is resistant to noise, it can handle large data sets, and it lowers overfitting by averaging several decision trees.

Even though XGBoost is commonly believed to have better results in most machine learning problems, the hyperparameters have to be more carefully tuned. Random Forest was more suitable and stable in this project and corresponded to the nature of the dataset.

Another critical real-life experience identified by the results is that the growth of the companies has an incredibly strong correlation with the increase in the workforce. Organizations that are expanding the number of workers are likely to realize greater growth. This is in line with real business dynamics in which, in most cases, expansion of operations necessitates an increase in the number of employees.

The next important point is that the data is highly voluminous as it consists of millions of records on companies. Due to this reason, model training and assessment were conducted on a sampled dataset to enhance the efficiency of the calculation and ensure reliable results.

System-wise, the application that is developed has been successful in combining machine learning with a full-stack web system. The model predictions are revealed in the form of an API to the back end, and the front-end application lets the user input the company attributes and gives real-time predictions as well as visualizes results.

This renders the system applicable in:

Business analysts
Investors
Scholars in the field of company development.
Strategic planning and forecasting.

On the whole, the project indicates that machine learning can be used to process real-world business data and produce meaningful insights and predictive analytics.



Impact:
- Provides quick, data-driven insights on company growth potential  
- Supports decision-making for investors, analysts, and researchers  

---

## Recommendations & Future Work
Community Recommendations:
- Use for research, sector analysis, and company evaluation  
- Integrate additional data sources for improved predictions  

Future Work:
- Mobile-optimized UI  
- Multi-language support   
- Continuous retraining with live data


