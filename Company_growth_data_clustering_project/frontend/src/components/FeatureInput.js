import React from "react";

export default function FeatureInput({ label, type="number", value, onChange, min, max, options }) {
  if (type === "select") {
    return (
      <div style={{ margin: "10px 0" }}>
        <label>{label}: </label>
        <select value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div style={{ margin: "10px 0" }}>
      <label>{label}: </label>
      <input type="range" min={min} max={max} value={value} onChange={onChange} />
      <span style={{ marginLeft: "10px" }}>{value}</span>
    </div>
  );
}
