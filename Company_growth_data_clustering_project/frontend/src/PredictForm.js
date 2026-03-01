import React, { useState } from "react";
import { predict } from "./api";
import Result from "./Result";

export default function PredictForm() {
  const [formData, setFormData] = useState({
    industry_enc: "",
    country_enc: "",
    company_age: "",
    avg_size: "",
    current_employee_estimate: "",
    total_employee_estimate: "",
    model_type: "rf_category"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload = {
      ...formData,
      industry_enc: Number(formData.industry_enc),
      country_enc: Number(formData.country_enc),
      company_age: Number(formData.company_age),
      avg_size: Number(formData.avg_size),
      current_employee_estimate: Number(formData.current_employee_estimate),
      total_employee_estimate: Number(formData.total_employee_estimate)
    };

    try {
      const res = await predict(payload);
      setResult(res);
    } catch (err) {
      setResult({ error: "Error calling API" });
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Industry (encoded)", name: "industry_enc" },
          { label: "Country (encoded)", name: "country_enc" },
          { label: "Company Age", name: "company_age" },
          { label: "Average Size", name: "avg_size" },
          { label: "Current Employee Estimate", name: "current_employee_estimate" },
          { label: "Total Employee Estimate", name: "total_employee_estimate" }
        ].map((field) => (
          <div key={field.name}>
            <label>{field.label}:</label>
            <input
              type="number"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div>
          <label>Model Type:</label>
          <select name="model_type" value={formData.model_type} onChange={handleChange}>
            <option value="rf_category">RF Category</option>
            <option value="rf_level">RF Level</option>
            <option value="xgb_category">XGB Category</option>
            <option value="xgb_level">XGB Level</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && <Result result={result} />}
    </div>
  );
}
