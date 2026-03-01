// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home({ currentUser }) {
  const [status, setStatus] = useState("");
  const [allPredictions, setAllPredictions] = useState([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    fetch(`${API_URL}/`)
      .then((res) => res.text())
      .then((data) => setStatus(data))
      .catch(() => setStatus("Backend not reachable"));

    const stored = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
    setAllPredictions(stored);
  }, []);

  /* ---------- Compute Cluster Counts & Avg Confidence ---------- */
  const clusters = [0, 1, 2, 3];

  const clusterCounts =
    allPredictions.length > 0
      ? clusters.map((c) => allPredictions.filter((p) => p.result?.cluster === c).length)
      : [12, 19, 8, 15]; // fallback demo

  const clusterConfidence =
    allPredictions.length > 0
      ? clusters.map((c) => {
          const filtered = allPredictions.filter(
            (p) => p.result?.cluster === c && p.result?.confidence != null
          );
          const avg =
            filtered.length > 0
              ? filtered.reduce((acc, p) => acc + p.result.confidence, 0) / filtered.length
              : 0;
          return +(avg * 100).toFixed(2); // convert to %
        })
      : [80, 75, 60, 90]; // demo fallback

  /* ---------- Chart Data ---------- */
  const clusterData = {
    labels: clusters.map((c) => `Cluster ${c}`),
    datasets: [
      {
        label: "Total Predictions",
        data: clusterCounts,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const confidenceData = {
    labels: clusters.map((c) => `Cluster ${c}`),
    datasets: [
      {
        label: "Avg Confidence (%)",
        data: clusterConfidence,
        borderColor: "#10b981",
        backgroundColor: "#10b98133",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  /* ---------- KPIs ---------- */
  const kpis = [
    { title: "Total Predictions", value: allPredictions.length || 54 },
    {
      title: "Avg Cluster",
      value:
        allPredictions.length > 0
          ? (
              allPredictions.reduce((acc, p) => acc + (p.result?.cluster || 0), 0) /
              allPredictions.length
            ).toFixed(2)
          : "1.87",
    },
    {
      title: "Successful Saves",
      value:
        allPredictions.length > 0
          ? allPredictions.filter((p) => p.result && !p.result.error).length
          : 48,
    },
    { title: "Backend Status", value: status || "Connected" },
  ];

  return (
    <div
      style={{
        padding: "40px",
        width: "100%",
        minHeight: "100vh",
        fontFamily: "'Inter', Arial, sans-serif",
        background: "#f8fafc",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#1e3c72",
          fontSize: "32px",
        }}
      >
        Company Growth Analytics
      </h1>

      {/* Project Sections */}
      {[...[ 
        {
          title: "Project Summary",
          content:
            "The Company Growth Analytics project is designed to help businesses and analysts predict company growth trends based on multiple features such as industry, country, company age, and employee estimates. By combining a predictive model with an intuitive frontend interface, users can make data-driven decisions to support strategic planning and business development.",
        },
        {
          title: "Problem Statement",
          content:
            "Many businesses struggle to forecast growth accurately due to scattered data, varying industry patterns, and lack of accessible predictive tools. Decision-making without proper analytics can lead to inefficient resource allocation and missed opportunities in competitive markets.",
        },
        {
          title: "Mission",
          content:
            "Our mission is to provide a reliable, user-friendly tool that enables companies and analysts to understand growth patterns, predict potential outcomes, and make informed business decisions with confidence.",
        },
        {
          title: "Why It Works",
          content:
            "The system works by using machine learning models trained on historical company data to identify growth patterns. Users interact with an intuitive interface that captures relevant company attributes, sends them to the backend for processing, and returns actionable predictions in real time. The combination of predictive modeling, data analytics, and simplicity ensures high usability and accurate insights.",
        },
        {
          title: "Solution",
          content:
            "The solution is a web-based platform where users can input company features and instantly receive predictions about growth clusters, expected outcomes, and confidence levels. The platform integrates a Node.js backend to handle predictive logic and a React frontend for responsive, easy-to-use interaction, making data-driven decisions accessible to all users.",
        },
      ]].map((section, idx) => (
        <section
          key={idx}
          style={{
            marginBottom: "25px",
            background: "#fff",
            padding: "25px",
            borderRadius: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "15px", color: "#1e3c72" }}>{section.title}</h2>
          <p style={{ color: "#333", lineHeight: "1.6" }}>{section.content}</p>
        </section>
      ))}

      {/* Go to Predict Page */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link
          to="/predict"
          style={{
            padding: "15px 35px",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            borderRadius: "10px",
            fontSize: "16px",
          }}
        >
          Go to Predict Page
        </Link>
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#1e3c72" }}>Growth Cluster Distribution</h3>
          <Bar data={clusterData} />
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#1e3c72" }}>Average Confidence per Cluster</h3>
          <Line data={confidenceData} />
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "25px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <h4 style={{ marginBottom: "10px" }}>{kpi.title}</h4>
            <p style={{ fontSize: "24px", fontWeight: "600", color: "#2563eb" }}>{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}