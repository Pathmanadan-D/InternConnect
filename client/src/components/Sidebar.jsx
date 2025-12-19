import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaSignOutAlt, FaTable, FaBriefcase } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";


const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors";

const linkClass = ({ isActive }) =>
  `${linkBase} ${
    isActive
      ? "bg-purple-100 text-purple-700"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
  }`;
  

  export default function Sidebar() {
    const { isAdmin, logout } = useAuth();
  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden md:flex md:w-64 shrink-0 h-[calc(100dvh-4rem)] sticky top-16 p-4"
    >
      <div className="w-full h-full backdrop-blur-xl bg-white/70 border border-gray-200 rounded-2xl p-4">
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={linkClass} end>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            <FaTable /> Dashboard
          </NavLink>
          <NavLink to="/internships" className={linkClass}>
            <FaBriefcase /> Internships
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            <FaUser /> Profile
          </NavLink>
          {isAdmin && (
  <>
    <NavLink to="/admin" className={linkClass}>
      <FaTable /> Manage Internships
    </NavLink>

    <NavLink to="/admin/applications" className={linkClass}>
      <FaBriefcase /> Applications
    </NavLink>
  </>
)}

          <button
  onClick={logout}
  className="mt-4 flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
>
  <FaSignOutAlt /> Logout
</button>

        </nav>
      </div>
    </motion.aside>
  );
}


