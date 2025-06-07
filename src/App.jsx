import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginPage from "./LoginPage";
import LadderPage from "./LadderPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

function AppRoutes({ authed, setAuthed }) {
  return (
    <Routes>
      <Route
        path="/ladder/afl"
        element={
          authed ? (
            <LadderPage onLogout={() => setAuthed(false)} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/"
        element={
          authed ? (
            <Navigate to="/ladder/afl" replace />
          ) : (
            <LoginPage onLogin={() => setAuthed(true)} />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);

  // Check for existing session on mount (optional, depends on backend)
  useEffect(() => {
    (async () => {
      try {
        await axios.get(`${API_BASE}/afl-ladder?round=12&year=2025`, {
          withCredentials: true,
        });
        setAuthed(true);
      } catch {
        setAuthed(false);
      }
    })();
  }, []);

  return (
    <Router>
      <AppRoutes authed={authed} setAuthed={setAuthed} />
    </Router>
  );
}