import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LandingPage from "./LandingPage";
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
            <LandingPage onLogin={() => setAuthed(true)} />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let timeout;
    if (loading) {
      timeout = setTimeout(() => setShowLoader(true), 1000);
    } else {
      setShowLoader(false);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  if (loading && showLoader) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <svg
          className="animate-spin h-16 w-16 text-blue-700 mb-4"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-blue-800">IFT Footy Tipping</h1>
        <p className="text-blue-600 mt-2 text-lg animate-pulse">Warming up the Sherrin…</p>
      </div>
    );
  }
  if (loading && !showLoader) {
    return null;
  }

  return (
    <Router>
      <AppRoutes authed={authed} setAuthed={setAuthed} />
    </Router>
  );
}