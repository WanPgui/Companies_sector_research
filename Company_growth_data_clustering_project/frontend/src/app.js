// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/"); // redirect to home
  };

  return (
    <div style={appLayout}>
      {/* Sidebar */}
      <aside style={sidebar}>
        <div style={logo}>Companies Cluster Growth Analytics</div>

        <nav style={nav}>
          <NavLink to="/" style={linkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/predict" style={linkStyle}>
            Predict
          </NavLink>
          <NavLink to="/history" style={linkStyle}>
            History
          </NavLink>

          {/* Login / Signup or Logout */}
          {!user && (
            <>
              <NavLink to="/login" style={linkStyle}>
                Login
              </NavLink>
              <NavLink to="/signup" style={linkStyle}>
                Create Account
              </NavLink>
            </>
          )}
          {user && (
            <button onClick={handleLogout} style={logoutBtn}>
              Logout
            </button>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={mainArea}>
        <header style={topBar}>
          <div style={topTitle}>
            {user ? `Welcome, ${user.email}` : "Machine Learning Analytics"}
          </div>
        </header>

        <div style={content}>
          <Routes>
            {/* Pass currentUser to pages */}
            <Route path="/" element={<Home currentUser={user} />} />
            <Route
              path="/predict"
              element={user ? <Predict currentUser={user} /> : <Login setUser={setUser} />}
            />
            <Route
              path="/history"
              element={user ? <History currentUser={user} /> : <Login setUser={setUser} />}
            />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

/* Layout */
const appLayout = {
  display: "flex",
  height: "100vh",
  width: "100%",
  background: "#f5f7fb",
  fontFamily: "'Inter', sans-serif"
};

/* Sidebar */
const sidebar = {
  width: "240px",
  background: "#1f2937",
  color: "white",
  display: "flex",
  flexDirection: "column",
  padding: "25px 20px",
  boxShadow: "2px 0 8px rgba(0,0,0,0.08)"
};

const logo = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "30px"
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const linkStyle = ({ isActive }) => ({
  padding: "10px 14px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "white",
  background: isActive ? "#3b82f6" : "transparent",
  transition: "0.2s",
  fontWeight: 500
});

const logoutBtn = {
  marginTop: "10px",
  padding: "8px 12px",
  background: "#f44336",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
  fontWeight: "500"
};

/* Main area */
const mainArea = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
};

/* Top bar */
const topBar = {
  height: "60px",
  background: "white",
  display: "flex",
  alignItems: "center",
  padding: "0 30px",
  borderBottom: "1px solid #e5e7eb"
};

const topTitle = {
  fontSize: "16px",
  fontWeight: "600"
};

/* Page content */
const content = {
  flex: 1,
  padding: "30px",
  overflowY: "auto"
};