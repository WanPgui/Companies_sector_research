// src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) return alert("Enter email and password");

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(u => u.email === email)) {
      return alert("Email already exists");
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);

    // Redirect to Predict page after signup
    navigate("/predict");
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Create Account</h2>
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
      <button onClick={handleSignup} style={btn}>
        Create Account
      </button>
      <p>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

const input = { padding: 8, margin: "5px 0", width: 250 };
const btn = { padding: "8px 16px", marginTop: 10, cursor: "pointer" };