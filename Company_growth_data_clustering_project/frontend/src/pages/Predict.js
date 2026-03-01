// src/pages/Predict.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

const INDUSTRIES = [
  { label: "Technology", value: 0 },
  { label: "Finance", value: 1 },
  { label: "Healthcare", value: 2 },
  { label: "Retail", value: 3 }
];

const COUNTRIES = [
  { label: "USA", value: 0 },
  { label: "Kenya", value: 1 },
  { label: "India", value: 2 },
  { label: "Germany", value: 3 }
];

export default function Predict({ currentUser }) {
  const [formData, setFormData] = useState({
    industry_enc: 0,
    country_enc: 0,
    company_age: 5,
    avg_size: 50,
    current_employee_estimate: 50,
    total_employee_estimate: 50,
    model_type: "auto"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
    if (currentUser) {
      const userHistory = stored
        .filter(p => p.userEmail === currentUser.email)
        .slice(-10);
      setHistoryData(userHistory);
    } else {
      setHistoryData([]);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to make predictions.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const models = ["rf_category", "rf_level", "xgb_category", "xgb_level"];
      let bestResult = null;

      const apiUrl = process.env.REACT_APP_API_URL + "/predict";

      for (let model of models) {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, model_type: model })
        });

        const res = await response.json();

        if (!res.error) {
          if (!bestResult || res.confidence > bestResult.confidence) {
            bestResult = { ...res, model_type: model };
          }
        }
      }

      if (!bestResult) bestResult = { error: "All model predictions failed" };

      setResult(bestResult);

      if (!bestResult.error) saveToHistory(bestResult);

      setDebugInfo({
        request: JSON.stringify(formData, null, 2),
        response: JSON.stringify(bestResult, null, 2),
        apiUrl
      });
    } catch (err) {
      console.error("Prediction request failed:", err);
      const errorRes = { error: err.message || "API request failed" };
      setResult(errorRes);
      setDebugInfo({
        request: JSON.stringify(formData, null, 2),
        response: JSON.stringify(errorRes, null, 2),
        apiUrl: process.env.REACT_APP_API_URL + "/predict"
      });
    }

    setLoading(false);
  };

  const saveToHistory = (res) => {
    const stored = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
    const newEntry = { ...formData, result: res, userEmail: currentUser.email, timestamp: new Date().toISOString() };

    const exists = stored.some(item => item.userEmail === newEntry.userEmail && item.timestamp === newEntry.timestamp);
    if (!exists) {
      stored.push(newEntry);
      localStorage.setItem("predictionHistory", JSON.stringify(stored));
    }

    const updatedUserHistory = stored.filter(p => p.userEmail === currentUser.email).slice(-10);
    setHistoryData(updatedUserHistory);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence == null) return "#000";
    if (confidence >= 0.75) return "#2e7d32";
    if (confidence >= 0.5) return "#f9a825";
    return "#c62828";
  };

  const chartData = {
    labels: historyData.map((_, i) => `#${i + 1}`),
    datasets: [
      { label: "Cluster", data: historyData.map(h => h.result?.cluster ?? 0), backgroundColor: "#4CAF50" },
      { label: "Confidence (%)", data: historyData.map(h => ((h.result?.confidence ?? 0) * 100).toFixed(2)), backgroundColor: "#2196F3" }
    ]
  };

  const chartOptions = { responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Your Recent Predictions" } }, scales: { y: { beginAtZero: true } } };

  return (
    <div style={container}>
      <h1 style={title}>Company Growth Prediction</h1>
      <div style={dashboardGrid}>
        <div style={{ ...card, gridColumn: "span 2", minHeight: "80vh" }}>
          <h2 style={cardTitle}>Input Features</h2>
          <form onSubmit={handleSubmit} style={form}>
            <div style={field}>
              <label>Industry</label>
              <select name="industry_enc" value={formData.industry_enc} onChange={handleChange} style={input}>
                {INDUSTRIES.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
            </div>
            <div style={field}>
              <label>Country</label>
              <select name="country_enc" value={formData.country_enc} onChange={handleChange} style={input}>
                {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            {[
              { name: "company_age", label: "Company Age", min: 1, max: 50 },
              { name: "avg_size", label: "Average Size", min: 1, max: 1000 },
              { name: "current_employee_estimate", label: "Current Employees", min: 1, max: 1000 },
              { name: "total_employee_estimate", label: "Total Employees", min: 1, max: 5000 }
            ].map(f => (
              <div key={f.name} style={field}>
                <label>{f.label}: <strong>{formData[f.name]}</strong></label>
                <input type="range" name={f.name} min={f.min} max={f.max} value={formData[f.name]} onChange={handleChange} />
              </div>
            ))}
            <div style={field}>
              <label>Model Type</label>
              <select name="model_type" value={formData.model_type} onChange={handleChange} style={input}>
                <option value="auto">Auto Select Best</option>
                <option value="rf_category">RF Category</option>
                <option value="rf_level">RF Level</option>
                <option value="xgb_category">XGB Category</option>
                <option value="xgb_level">XGB Level</option>
              </select>
            </div>
            <button type="submit" disabled={loading} style={button}>{loading ? "Predicting..." : "Run Prediction"}</button>
          </form>
        </div>

        {result && (
          <div style={{ ...card, gridColumn: "span 2", background: "#f0f4f8" }}>
            {result.error ? (
              <div style={{ color: "#c62828" }}>
                <h2>Error</h2>
                <p>{result.error}</p>
              </div>
            ) : (
              <>
                <h2 style={cardTitle}>Prediction Result</h2>
                <div style={kpiGrid}>
                  <div style={kpiCard}><h3>Cluster</h3><p>{result.cluster}</p></div>
                  <div style={kpiCard}><h3>Prediction</h3><p>{result.prediction}</p></div>
                  <div style={kpiCard}><h3>Confidence</h3><p style={{ color: getConfidenceColor(result.confidence) }}>{(result.confidence * 100).toFixed(2)}%</p></div>
                  <div style={kpiCard}><h3>Model Used</h3><p>{result.model_type}</p></div>
                </div>
              </>
            )}
          </div>
        )}

        {historyData.length > 0 && (
          <div style={{ ...card, gridColumn: "span 2" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}

        <div style={{ ...card, gridColumn: "span 2", background: "#fff3e0" }}>
          <h2 style={cardTitle}>Debug Info</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
<strong>API URL:</strong> {debugInfo.apiUrl || "-"}{"\n"}
<strong>Request:</strong>{"\n"}{debugInfo.request || "-"}{"\n"}
<strong>Response:</strong>{"\n"}{debugInfo.response || "-"}
          </pre>
        </div>
      </div>
    </div>
  );
}

/* Styles */
const container = { width: "100%", padding: "20px", boxSizing: "border-box" };
const title = { textAlign: "center", marginBottom: "25px", color: "#1e3c72" };
const dashboardGrid = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", alignItems: "stretch" };
const card = { padding: "24px", borderRadius: "12px", background: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", height: "100%" };
const cardTitle = { marginBottom: "15px", color: "#1e3c72" };
const form = { display: "flex", flexDirection: "column", gap: "16px", height: "100%", justifyContent: "space-between" };
const field = { display: "flex", flexDirection: "column", gap: "6px" };
const input = { padding: "10px", borderRadius: "6px", border: "1px solid #ccc" };
const button = { padding: "14px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" };
const kpiGrid = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginTop: "15px" };
const kpiCard = { padding: "15px", background: "#e8f0fe", borderRadius: "8px", textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" };
