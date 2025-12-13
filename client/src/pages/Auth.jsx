import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { login, register } = useAuth();
  const [tab, setTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to login. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(signupData.name, signupData.email, signupData.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to sign up. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md backdrop-blur-2xl bg-white/70 border border-gray-200 rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 p-1 rounded-xl bg-gray-100">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 px-4 py-2 rounded-lg transition ${
              tab === "login" ? "bg-white text-gray-900" : "text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 px-4 py-2 rounded-lg transition ${
              tab === "signup" ? "bg-white text-gray-900" : "text-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <AnimatePresence mode="wait">
          {tab === "login" ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="mt-6 space-y-4"
              onSubmit={handleLogin}
            >
              <Input
                label="Email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
              <Input
                label="Password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
              <button
                className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="mt-6 space-y-4"
              onSubmit={handleSignup}
            >
              <Input
                label="Name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                required
              />
              <Input
                label="Email"
                type="email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
              <Input
                label="Password"
                type="password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
              <button
                className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Input({ label, type = "text", value, onChange, required }) {
  return (
    <label className="block text-left">
      <span className="text-gray-700 text-sm">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full px-4 py-2 rounded-xl bg-white/70 border border-gray-200 focus:border-purple-400 outline-none text-gray-900 placeholder-gray-400 transition"
        placeholder={label}
      />
    </label>
  );
}