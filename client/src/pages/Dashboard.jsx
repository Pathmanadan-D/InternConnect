import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Internships", value: 42 },
  { label: "Applied", value: 12 },
  { label: "Interviews", value: 4 },
  { label: "Offers", value: 2 },
];

export default function Dashboard() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="rounded-2xl p-5 backdrop-blur-xl bg-white/70 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="text-3xl font-extrabold text-gray-900">{s.value}</div>
            <div className="mt-2 text-gray-600">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


