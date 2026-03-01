// src/pages/History.js
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function History({ currentUser }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, [currentUser]);

  /* ---------- LOAD HISTORY + REMOVE DUPLICATES ---------- */
  const loadHistory = () => {
    const stored = localStorage.getItem("predictionHistory");
    if (!stored) return;

    let allPredictions = JSON.parse(stored);

    // Remove duplicate predictions
    const uniqueMap = new Map();

    allPredictions.forEach(p => {
      const key = JSON.stringify({
        userEmail: p.userEmail,
        industry_enc: p.industry_enc,
        country_enc: p.country_enc,
        company_age: p.company_age,
        avg_size: p.avg_size,
        current_employee_estimate: p.current_employee_estimate,
        total_employee_estimate: p.total_employee_estimate
      });

      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, p);
      }
    });

    const cleanedHistory = Array.from(uniqueMap.values());

    localStorage.setItem("predictionHistory", JSON.stringify(cleanedHistory));

    const userPredictions = currentUser
      ? cleanedHistory.filter(p => p.userEmail === currentUser.email)
      : [];

    setHistory(userPredictions);
  };

  /* ---------- CLEAR HISTORY ---------- */
  const clearHistory = () => {
    const stored = localStorage.getItem("predictionHistory");
    if (!stored) return;

    const allPredictions = JSON.parse(stored);

    const remaining = allPredictions.filter(
      p => p.userEmail !== currentUser.email
    );

    localStorage.setItem("predictionHistory", JSON.stringify(remaining));
    setHistory([]);
  };

  /* ---------- DOWNLOAD CSV ---------- */
  const downloadCSV = () => {
    if (history.length === 0) return;

    const headers = [
      "Time",
      "Industry",
      "Country",
      "Company Age",
      "Average Size",
      "Current Employees",
      "Total Employees",
      "Model",
      "Cluster",
      "Prediction",
      "Confidence (%)"
    ];

    const rows = history.map(item => [
      item.timestamp
        ? new Date(item.timestamp).toLocaleString()
        : "",
      item.industry_enc,
      item.country_enc,
      item.company_age,
      item.avg_size,
      item.current_employee_estimate,
      item.total_employee_estimate,
      item.model_type,
      item.result?.cluster ?? "",
      item.result?.prediction ?? "",
      item.result?.confidence
        ? (item.result.confidence * 100).toFixed(2)
        : ""
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "prediction_history.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ---------- KPI METRICS ---------- */
  const totalPredictions = history.length;

  const avgConfidence =
    history.length > 0
      ? (
          history.reduce((sum, h) => sum + (h.result?.confidence || 0), 0) /
          history.length
        ) * 100
      : 0;

  /* ---------- CLUSTER DISTRIBUTION ---------- */
  const clusterCounts = {};
  history.forEach(h => {
    const cluster = h.result?.cluster;
    if (cluster !== undefined) {
      clusterCounts[cluster] = (clusterCounts[cluster] || 0) + 1;
    }
  });

  const clusterLabels = Object.keys(clusterCounts);
  const clusterValues = Object.values(clusterCounts);

  const chartData = {
    labels: clusterLabels.map(c => `Cluster ${c}`),
    datasets: [
      {
        label: "Predictions per Cluster",
        data: clusterValues,
        backgroundColor: "#4CAF50"
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <h1>Prediction Analytics</h1>

        {history.length > 0 && (
          <div style={buttonGroup}>
            <button onClick={downloadCSV} style={downloadBtn}>
              Download CSV
            </button>

            <button onClick={clearHistory} style={clearBtn}>
              Clear History
            </button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div style={kpiGrid}>
        <div style={kpiCard}>
          <h3>Total Predictions</h3>
          <p>{totalPredictions}</p>
        </div>

        <div style={kpiCard}>
          <h3>Average Confidence</h3>
          <p>{avgConfidence.toFixed(2)}%</p>
        </div>

        <div style={kpiCard}>
          <h3>Clusters Detected</h3>
          <p>{clusterLabels.length}</p>
        </div>
      </div>

      {/* Chart */}
      {history.length > 0 && (
        <div style={chartCard}>
          <h3>Cluster Distribution</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Table */}
      {history.length === 0 ? (
        <div style={emptyState}>
          No predictions yet. Run predictions to populate analytics.
        </div>
      ) : (
        <div style={tableWrapper}>
          <table style={table}>
            <thead style={thead}>
              <tr>
                <th style={th}>Time</th>
                <th style={th}>Industry</th>
                <th style={th}>Country</th>
                <th style={th}>Age</th>
                <th style={th}>Avg Size</th>
                <th style={th}>Current Employees</th>
                <th style={th}>Total Employees</th>
                <th style={th}>Model</th>
                <th style={th}>Cluster</th>
                <th style={th}>Prediction</th>
                <th style={th}>Confidence</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, idx) => (
                <tr key={idx} style={row}>
                  <td style={td}>
                    {item.timestamp
                      ? new Date(item.timestamp).toLocaleString()
                      : "-"}
                  </td>
                  <td style={td}>{item.industry_enc}</td>
                  <td style={td}>{item.country_enc}</td>
                  <td style={td}>{item.company_age}</td>
                  <td style={td}>{item.avg_size}</td>
                  <td style={td}>{item.current_employee_estimate}</td>
                  <td style={td}>{item.total_employee_estimate}</td>
                  <td style={td}>{item.model_type}</td>
                  <td style={td}>{item.result?.cluster ?? "-"}</td>
                  <td style={td}>{item.result?.prediction ?? "-"}</td>
                  <td style={td}>
                    {item.result?.confidence != null
                      ? (item.result.confidence * 100).toFixed(2) + "%"
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const container = {
  width: "100%",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "25px"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const buttonGroup = {
  display: "flex",
  gap: "10px"
};

const clearBtn = {
  padding: "10px 18px",
  background: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer"
};

const downloadBtn = {
  padding: "10px 18px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer"
};

const kpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

const kpiCard = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  textAlign: "center"
};

const chartCard = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

const emptyState = {
  padding: "60px",
  textAlign: "center",
  background: "#fafafa",
  borderRadius: "10px"
};

const tableWrapper = { width: "100%", overflowX: "auto" };

const table = { width: "100%", borderCollapse: "collapse", background: "white" };

const thead = { background: "#1e3c72", color: "white" };

const th = { padding: "12px", textAlign: "center" };

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
  textAlign: "center"
};

const row = { background: "white" };