import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const [tab, setTab] = useState("login");

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

        <AnimatePresence mode="wait">
          {tab === "login" ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="mt-6 space-y-4"
            >
              <Input label="Email" type="email" />
              <Input label="Password" type="password" />
              <button className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:brightness-110 transition">
                Login
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
            >
              <Input label="Name" />
              <Input label="Email" type="email" />
              <Input label="Password" type="password" />
              <button className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:brightness-110 transition">
                Create account
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Input({ label, type = "text" }) {
  return (
    <label className="block text-left">
      <span className="text-gray-700 text-sm">{label}</span>
      <input
        type={type}
        className="mt-2 w-full px-4 py-2 rounded-xl bg-white/70 border border-gray-200 focus:border-purple-400 outline-none text-gray-900 placeholder-gray-400 transition"
        placeholder={label}
      />
    </label>
  );
}


