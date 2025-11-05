import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-gray-900 to-purple-400 text-transparent bg-clip-text">
          InternConnect — Your Path to Industry
        </h1>
        <p className="mt-6 text-gray-700 text-lg">
          Find, Apply, and Track Your Internship Opportunities
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/auth"
            className="px-5 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 transition"
          >
            Login
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:brightness-110 transition shadow-[0_0_35px_8px_rgba(168,85,247,0.35)]"
          >
            Get Started
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-purple-200/60 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-52 w-52 rounded-full bg-fuchsia-200/50 blur-3xl" />
      </motion.div>
    </div>
  );
}


