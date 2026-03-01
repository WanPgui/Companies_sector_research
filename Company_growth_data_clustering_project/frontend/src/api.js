// src/api.js

// Make sure REACT_APP_API_URL is set in .env
const API_URL = process.env.REACT_APP_API_URL || "https://your-backend.onrender.com";

// DEBUG: log the API URL being used
console.log("Using API URL:", API_URL);

/**
 * POST data to /predict endpoint
 * @param {Object} data - the prediction input data
 * @returns {Promise<Object>} - prediction result or error
 */
export async function predict(data) {
  if (!data || typeof data !== "object") {
    console.error("Invalid input data:", data);
    return { error: "Invalid input data" };
  }

  try {
    console.log("Sending POST to backend:", `${API_URL}/predict`);
    console.log("POST payload:", data);

    const res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("Raw response status:", res.status);

    const json = await res.json();

    console.log("Backend response JSON:", json);

    if (!res.ok) {
      return { error: json.error || "Unknown error from server" };
    }

    // If auto mode, log which model was automatically selected
    if (data.model_type === "auto" && json.model_type) {
      console.log(`Auto-selected model: ${json.model_type} (confidence: ${json.confidence})`);
    }

    return json;
  } catch (err) {
    console.error("API request failed:", err);
    return { error: err.message || "Network error" };
  }
}

/**
 * GET /template endpoint
 * @returns {Promise<string|null>} - Blob URL for download or null
 */
export async function downloadTemplate() {
  try {
    const res = await fetch(`${API_URL}/template`);

    if (!res.ok) {
      throw new Error("Template not found");
    }

    const blob = await res.blob();
    console.log("Template downloaded successfully");
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error("Template download failed:", err);
    return null;
  }
}
