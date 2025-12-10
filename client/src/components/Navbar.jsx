import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `px-3 py-1 rounded-md transition-colors ${
    isActive
      ? "bg-purple-100 text-purple-700"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
  }`;

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

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
          {!isAuthenticated ? (
            <Link
              to="/auth"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:brightness-110 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaUserCircle className="text-gray-700" size={24} />
                <span className="hidden sm:inline">{user?.name || "User"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

