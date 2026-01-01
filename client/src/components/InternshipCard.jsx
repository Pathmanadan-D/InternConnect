import React, { useState } from "react";
import { motion } from "framer-motion";
import { applyInternship } from "../api/applications";
import { useAuth } from "../context/AuthContext";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function InternshipCard({
  internship,
  isAdmin,
  onEdit,
  onDelete,
}) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    if (!isAuthenticated) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);
      await applyInternship(internship._id);
      setApplied(true);
      alert("Application submitted");
    } catch (err) {
      alert(err?.response?.data?.message || "Apply failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white/80 backdrop-blur-xl border border-gray-200 
                 rounded-2xl shadow-sm hover:shadow-xl p-5 space-y-4"
    >
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {internship.title}
        </h3>
        <p className="text-sm text-gray-600">
          {internship.company}
        </p>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-100 text-purple-700">
          <FaMapMarkerAlt /> {internship.location}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-indigo-100 text-indigo-700">
          <FaClock /> {internship.duration}
        </span>
        {internship.stipend && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700">
            <FaMoneyBillWave /> {internship.stipend}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 line-clamp-3">
        {internship.description}
      </p>

      {/* ADMIN ACTIONS */}
      {isAdmin && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onEdit(internship)}
            className="flex-1 px-3 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(internship)}
            className="flex-1 px-3 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}

      {/* STUDENT APPLY */}
      {!isAdmin && (
  internship.status === "open" ? (
    <button
      onClick={handleApply}
      disabled={loading || applied}
      className={`w-full mt-2 py-2 rounded-lg text-white text-sm transition
        ${
          applied
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }
      `}
    >
      {applied
        ? "Applied"
        : loading
        ? "Applying..."
        : "Apply"}
    </button>
  ) : (
    <button
      disabled
      className="w-full mt-2 py-2 rounded-lg bg-gray-300 text-gray-600 text-sm cursor-not-allowed"
    >
      Closed
    </button>
  )
)}

    </motion.div>
  );
}
