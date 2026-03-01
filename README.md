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

The data from the model comparison indicate that both random forest and XGBoost are very effective at forecasting companies' growth patterns. Nevertheless, the Random Forest performed slightly higher in all metrics of evaluation, which is why it is the most reliable model to use in this project.

Random Forest had an accuracy of 99.83, whereas XGBoost had an accuracy of 99.37, which was the same as the growth level prediction. On the same note, in growth category prediction, the accuracy of random forest was 99.81, while that of XGBoost was 99.57. Despite the fact that both models show high predictive power, the random forest has a slightly higher accuracy, recall, and F1-score.

The large performance indicates that the dataset contains strong patterns that can be used to separate the various company growth patterns using machine learning algorithms. Specifically, the models could help to classify companies into growth categories with minimum error.

The other key outcome of the analysis is the feature importance ranking. The findings indicate that those related to employees are the strongest predictors of growth in the company. Specifically:

Predictions were the highest in Total Employees.
Influence was also tremendous among the current Employees.
The Company Size (mean) had an intermediate impact.
The company age, country, and industry took part in the prediction less.

This implies that the size and growth of the workforce in the company are the best predictors of growth potential. Firms with high rates of growth in the number of employees are more prone to be rated as having higher growth rates.

Also, the clustering step was useful in determining patterns in the data. The grouping process formed the companies into eight different clusters, which are various structural or growth profiles amongst companies. This enhanced the learning capabilities by the model of meaningful relationships between the company attributes and growth outcomes.

On balance, the analysis supports the idea that the machine learning models are effective in determining the growth trends and predicting the development of the company with reference to the chosen features.

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


Future Work Recommendations

Community Recommendations

The created system of the Company Growth Prediction can be applied by various stakeholders, including researchers, business analysts, investors, and policymakers who are interested in knowing the pattern of development of companies in the industry and in different countries.

First, the system may be used in research activities in schools and industries to determine growth patterns in various sectors. The model outputs can be used by researchers to determine the impact of the size of the workforce, the age of the company, and the type of industry on the expansion of the company with time. This will help in economic analysis and sector performance analysis.

Second, the platform is capable of aiding sector analysis by allowing users to compare the performance of companies in various industries under the same conditions. With the input features, the users can change the features to simulate possible conditions of a company and watch the predictions of growth change. This renders the system convenient in the identification of high-growth sectors and the emergent market opportunities.

Third, the application can be used to help in company evaluation and decision-making. The model can help investors and analysts to estimate the potential growth of companies prior to making investment decisions. The tool can also be utilized internally by organizations to determine their stage of growth as compared to the general trends of growth in such firms.

The other significant suggestion is that the fusion of other sources of data should be employed to enhance the accuracy of predictions. The existing model is primarily based on the characteristics of the company demographic and workforce. Including wider business indicators that are more real-life would greatly improve the prediction ability of the system. As an illustration, financial results indicators, sales patterns, capitalization, and the market might give more in-depth understanding of how the company is growing.

Future Work

The existing system is effective and has high rates of prediction, but there are a number of possibilities to develop it and increase the platform.

One of such improvements is the creation of a mobile-optimized user interface. The mobile phones in use today like smartphones and tablets, have many users who access analytical tools. The interface should also be optimized to smaller screens to enhance accessibility and usability and enable the user to engage the prediction system conveniently anywhere.

The other possible improvement is the incorporation of multi-language. As the system can be accessed by the representatives of various countries and regions, it would be more inclusive to offer language choices and make the application more visible to a larger audience. This would also facilitate cross-border research and business analysis in the international markets.

The other area that should be developed is continuous retraining of the machine learning models with live or updated data. With changes in business environments with time, the patterns of company growth can also evolve. The introduction of automated retraining pipelines would enable the system to change with the new data and ensure a high level of prediction accuracy. This might be done through connection with the system with databases or APIs that frequently refresh the company information.

Lastly, the implementation of scalable cloud infrastructure with monitoring and performance tracking would increase the level of reliability of the system when used in real-life circumstances. This would enable the platform to serve bigger loads of users and be stable in times of large volumes.

All in all, such future enhancements would transform the Company Growth Prediction system into a more powerful, scalable, and useful tool in academic research and the real-life business analysis.


