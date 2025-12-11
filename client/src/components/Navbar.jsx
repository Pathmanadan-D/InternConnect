import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const navLinkClass = ({ isActive }) =>
  `px-3 py-1 rounded-md transition-colors ${
    isActive
      ? "bg-purple-100 text-purple-700"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
  }`;

export default function Navbar() {

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-purple-500" />
          <span className="font-semibold text-gray-900 tracking-wide">InternConnect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/internships" className={navLinkClass}>
            Internships
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
          <NavLink to="/admin" className={navLinkClass}>
            Admin
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:brightness-110 transition"
          >
            Login
          </Link>
          <FaUserCircle className="text-gray-700" size={24} />
        </div>
      </div>
    </motion.header>
  );
}


