// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
      setUser(found);

      // Redirect to Predict page after login
      navigate("/predict");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={input}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={input}
      />
      <br />
      <button onClick={handleLogin} style={btn}>
        Login
      </button>
      <p>
        New user?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Create Account
        </span>
      </p>
    </div>
  );
}

const input = { padding: 8, margin: "5px 0", width: 250 };
const btn = { padding: "8px 16px", marginTop: 10, cursor: "pointer" };