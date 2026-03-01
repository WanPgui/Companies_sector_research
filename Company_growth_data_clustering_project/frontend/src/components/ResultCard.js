import React from "react";

export default function ResultCard({ result }) {
  if (!result) return null;
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px", borderRadius: "8px", maxWidth: "500px" }}>
      <h3>Prediction Result</h3>
      <p><strong>Cluster:</strong> {result.cluster}</p>
      <p><strong>Prediction:</strong> {result.prediction}</p>
      <p><strong>Confidence:</strong> {(result.confidence*100).toFixed(2)}%</p>
    </div>
  );
}
