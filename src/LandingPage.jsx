import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import NavBar from "./NavBar";
import logo from "./assets/ift@2x.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8080";

export default function LandingPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      navigate("/ladder/afl");
    } catch {
      setError("Invalid login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar loggedIn={false} />
      {/* Hero Section */}
      <div className="pt-24 pb-10 px-4 flex flex-col-reverse md:flex-row max-w-6xl mx-auto items-center gap-10">
        {/* Left: Hero/Promo */}
        <div className="flex-1 text-center md:text-left">
          <img src={logo} alt="IFT Logo" className="mx-auto md:mx-0 w-28 mb-4" />
          <h1 className="text-5xl font-black mb-2 text-blue-900 leading-tight">
            IFT Footy Tipping
          </h1>
          <p className="text-2xl text-blue-800 font-semibold mb-4">
            Footy tips. Without the boring.
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Welcome to IFT — the home of fun, fast, and fiercely competitive AFL tipping. 
            No spam, no popups, just seriously addictive footy fun with your mates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="https://ift.tips/about"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-blue-700 text-white px-6 py-3 font-bold text-lg hover:bg-blue-800 transition"
            >
              Learn More
            </a>
            <a
              href="mailto:support@ift.tips"
              className="rounded bg-gray-100 text-blue-800 px-6 py-3 font-semibold border border-blue-200 hover:bg-blue-100 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
        {/* Right: Login Card */}
        <motion.div
          className="flex-1 max-w-md w-full mx-auto"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="shadow-xl rounded-2xl">
            <CardContent>
              <h2 className="text-2xl font-bold mb-2 text-blue-800 text-center mt-4">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <Input
                  type="email"
                  placeholder="Email address"
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
                    className="text-red-600 text-sm text-center"
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
              <div className="text-center mt-4 mb-2">
                <a href="#" className="text-blue-700 text-sm hover:underline">
                  Forgot your password?
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* Features / How it Works */}
      <section className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            title="Twists & Powerplays"
            description="Fire a Powerplay for double points, but choose wisely! Sudden Death and bonus rounds keep every week spicy."
            icon="⚡"
          />
          <Feature
            title="Wildcard Tipping"
            description="Anyone can play it safe. Can you outsmart your mates and pick the upsets? It’s chaos, it’s unpredictable—and it’s how legends are made."
            icon="🎲"
          />
          <Feature
            title="No Ads, No Bookies"
            description="No betting, no spam, no nonsense. Just pure, private comp fun—and all the bragging rights."
            icon="🥳"
          />
        </div>
      </section>
    </div>
  );
}

// Simple feature card
function Feature({ title, description, icon }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold text-blue-900 text-xl mb-1">{title}</div>
      <div className="text-gray-600 text-center">{description}</div>
    </div>
  );
}