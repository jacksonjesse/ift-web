import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Card, CardContent } from "./components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import NavBar from "./NavBar";

const API_BASE = "http://localhost:8080";

const TEAM_NAME_MAP = {
  ADELAIDE: "Adelaide",
  BRISBANE: "Brisbane",
  CARLTON: "Carlton",
  COLLINGWOOD: "Collingwood",
  ESSENDON: "Essendon",
  FREMANTLE: "Fremantle",
  GEELONG: "Geelong",
  GOLD_COAST: "Gold Coast",
  GWS: "GWS Giants",
  HAWTHORN: "Hawthorn",
  MELBOURNE: "Melbourne",
  KANGAROOS: "North Melbourne",
  PORT_ADELAIDE: "Port Adelaide",
  RICHMOND: "Richmond",
  ST_KILDA: "St. Kilda",
  SYDNEY: "Sydney",
  WEST_COAST: "West Coast",
  WESTERN_BULLDOGS: "Western Bulldogs"
};

function toOrdinal(n) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function LadderRow({ pos, animate }) {
  return (
    <motion.tr
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.35 }}
      className="odd:bg-white even:bg-blue-50"
    >
      <td className="px-2 py-3 font-bold text-left">{toOrdinal(pos.position)}</td>
      <td className="px-2 py-3 text-left">
        {TEAM_NAME_MAP[pos.team] || pos.team}
      </td>
      <td className="px-2 py-3">{pos.wins}</td>
      <td className="px-2 py-3">{pos.losses}</td>
      <td className="px-2 py-3">{pos.draws}</td>
      <td className="px-2 py-3">{pos.pointsFor}</td>
      <td className="px-2 py-3">{pos.pointsAgainst}</td>
      <td className="px-2 py-3">{pos.percentage?.toFixed(1)}</td>
      <td className="px-2 py-3">{pos.points}</td>
    </motion.tr>
  );
}

function LadderPage({ onLogout }) {
  const [ladder, setLadder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRound, setSelectedRound] = useState(12);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_BASE}/afl-ladder?round=${selectedRound}&year=2025`,
          { withCredentials: true }
        );
        setLadder(data.positions);
      } catch {
        // Session expired, force logout
        onLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, [onLogout, selectedRound]);

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center pt-20">
      <NavBar onLogout={onLogout} />
      <Card className="w-full max-w-3xl shadow-2xl p-6 rounded-2xl bg-white/80 backdrop-blur">
        <CardContent>
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">AFL Ladder</h2>
          <div className="flex justify-center mb-6">
            <Select value={selectedRound.toString()} onValueChange={val => setSelectedRound(Number(val))}>
              <SelectTrigger className="w-56 text-lg">
                <SelectValue placeholder="Select round…" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 25 }).map((_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i === 0
                      ? "Opening Round"
                      : i === 1
                      ? "Round 1"
                      : `Round ${i}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AnimatePresence>
            {loading ? (
              <motion.div
                key="loader"
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg
                  className="animate-spin mx-auto h-10 w-10 text-blue-700"
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
                <p className="mt-4 text-blue-800">Loading Ladder...</p>
              </motion.div>
            ) : (
              <motion.table
                key="ladder"
                className="w-full table-auto text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-2 py-3 text-left">Place</th>
                    <th className="px-2 py-3 text-left">Team</th>
                    <th className="px-2 py-3">W</th>
                    <th className="px-2 py-3">L</th>
                    <th className="px-2 py-3">D</th>
                    <th className="px-2 py-3">F</th>
                    <th className="px-2 py-3">A</th>
                    <th className="px-2 py-3">%</th>
                    <th className="px-2 py-3">P</th>
                  </tr>
                </thead>
                <tbody>
                  {ladder.map((pos, i) => (
                    <LadderRow
                      pos={{
                        position: pos.position,
                        team: pos.team,
                        wins: pos.wins,
                        losses: pos.losses,
                        draws: pos.draws,
                        pointsFor: pos.pointsFor,
                        pointsAgainst: pos.pointsAgainst,
                        percentage: pos.percentage,
                        points: pos.points,
                      }}
                      key={pos.team}
                      animate
                    />
                  ))}
                </tbody>
              </motion.table>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

export default LadderPage;