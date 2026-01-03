import React from "react";
import { useAuth } from "../context/AuthContext";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";

export default function Dashboard() {
  const { isAdmin } = useAuth();

  return (
    <div className="space-y-6">
      {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
    </div>
  );
}
