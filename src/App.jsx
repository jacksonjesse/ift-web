import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginPage from "./LoginPage";
import LadderPage from "./LadderPage";

const API_BASE = "http://localhost:8080";

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

  return authed ? (
    <LadderPage onLogout={() => setAuthed(false)} />
  ) : (
    <LoginPage onLogin={() => setAuthed(true)} />
  );
}