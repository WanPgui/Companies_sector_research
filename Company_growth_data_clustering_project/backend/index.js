// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS specifically for your frontend origin
app.use(
  cors({
    origin: "http://localhost:3000", // change to deployed frontend URL
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON bodies
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Dummy models for demonstration
const MODELS = ["rf_category", "rf_level", "xgb_category", "xgb_level"];

// Function to simulate prediction for a model
function runModel(modelType, data) {
  // Replace with actual ML inference logic
  return {
    cluster: Math.floor(Math.random() * 5), // 0-4 clusters
    prediction: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
    confidence: Math.random(), // 0-1
    model_type: modelType // always include model_type
  };
}

// Predict route
app.post("/predict", (req, res) => {
  const data = req.body;

  console.log("=== Backend received data ===");
  console.log(data);

  if (!data || typeof data !== "object") {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    let result;

    if (data.model_type === "auto") {
      // Run all models and pick the one with highest confidence
      const results = MODELS.map(model => runModel(model, data));
      results.sort((a, b) => b.confidence - a.confidence);
      result = results[0]; // best model
      console.log("Auto-selected model result:", result);
    } else if (MODELS.includes(data.model_type)) {
      // Run specified model
      result = runModel(data.model_type, data);
      console.log("Specified model result:", result);
    } else {
      return res.status(400).json({ error: "Invalid model_type" });
    }

    // Send response including the model_type used
    res.json(result);
  } catch (err) {
    console.error("Prediction failed:", err);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});