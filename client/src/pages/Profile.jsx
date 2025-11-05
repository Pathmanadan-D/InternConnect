import React from "react";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="lg:col-span-1 p-5 rounded-2xl backdrop-blur-xl bg-white/70 border border-gray-200"
      >
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-gray-200" />
          <button className="mt-4 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition">
            Upload Photo
          </button>
        </div>
        <div className="mt-6 space-y-3">
          <Field label="Name" value="Alex Student" />
          <Field label="Course" value="Computer Science" />
          <Field label="Year" value="3rd" />
          <Field label="Email" value="alex@student.edu" />
        </div>
        <button className="mt-6 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:brightness-110 transition text-white">
          Save Changes
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="lg:col-span-2 p-5 rounded-2xl backdrop-blur-xl bg-white/70 border border-gray-200"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
          <button className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition">
            Upload Resume
          </button>
        </div>
        <div className="mt-6">
          <div className="text-gray-700 text-sm">Profile Completion</div>
          <div className="mt-2 h-3 rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <label className="block">
      <div className="text-gray-700 text-sm">{label}</div>
      <input
        defaultValue={value}
        className="mt-1 w-full px-3 py-2 rounded-lg bg-white/70 border border-gray-200 text-gray-900"
      />
    </label>
  );
}


