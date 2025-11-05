import React from "react";
import { motion } from "framer-motion";

const data = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  company: ["TechNova", "BlueLabs", "QuantumSoft", "OrbitAI"][i % 4],
  role: ["Frontend Intern", "Backend Intern", "ML Intern", "UI/UX Intern"][i % 4],
}));

export default function Internships() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-900">Internships</h2>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          placeholder="Search"
          className="px-4 py-2 rounded-xl bg-white/70 border border-gray-200 text-gray-900 placeholder-gray-400"
        />
        <select className="px-4 py-2 rounded-xl bg-white/70 border border-gray-200 text-gray-900">
          <option>Course</option>
          <option>CS</option>
          <option>IT</option>
        </select>
        <select className="px-4 py-2 rounded-xl bg-white/70 border border-gray-200 text-gray-900">
          <option>Year</option>
          <option>2nd</option>
          <option>3rd</option>
          <option>4th</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.03 }}
            className="p-5 rounded-2xl backdrop-blur-xl bg-white/70 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="text-lg font-semibold text-gray-900">{card.company}</div>
            <div className="text-gray-700 mt-1">{card.role}</div>
            <button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:brightness-110 transition text-white">
              Apply
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


