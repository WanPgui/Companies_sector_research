import React from "react";

export default function Result({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="result-card">
        <h2>Error</h2>
        <p>{result.error}</p>
      </div>
    );
  }

  return (
    <div className="result-card">
      <h2>Prediction Result</h2>
      <p><strong>Cluster:</strong> {result.cluster}</p>
      <p><strong>Prediction:</strong> {result.prediction}</p>
      <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
    </div>
  );
}
