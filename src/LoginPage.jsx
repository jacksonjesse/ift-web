import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import logo from "./assets/ift@2x.png";
import NavBar from "./components/NavBar";

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
    <>
      <NavBar loggedIn={false} />
      <motion.div
        className="flex items-center justify-center min-h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="w-full max-w-sm shadow-lg rounded-xl bg-white">
          <CardContent>
            <h2 className="text-4xl font-bold text-center mb-2 text-gray-700">
              IFT
            </h2>
            <div className="text-xl text-center mb-6 text-gray-500 font-light">
              Footy tips. Without the boring.
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
              />
              <Input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"
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
              <Button
                type="submit"
                className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold rounded"
              >
                Sign In
              </Button>
            </form>
            <div className="text-center mt-4">
              <a href="#" className="text-blue-700 text-sm hover:underline">
                Forgot Your Password?
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

export default LoginPage;