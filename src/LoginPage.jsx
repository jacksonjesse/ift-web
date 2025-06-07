import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import logo from "./assets/ift@2x.png";

const API_BASE = "http://localhost:8080";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        `${API_BASE}/login`,
        { email, password },
        { withCredentials: true }
      );
      onLogin();
    } catch {
      setError("Invalid login. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-700 to-purple-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="w-full max-w-sm shadow-2xl p-6 rounded-2xl bg-white/80 backdrop-blur">
        <CardContent>
          <img src={logo} alt="IFT Logo" className="mx-auto mb-4 w-28" />
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
            IFT
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <motion.div
                className="text-red-600 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            <Button type="submit" className="w-full mt-4">
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default LoginPage;
