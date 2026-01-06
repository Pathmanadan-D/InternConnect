import React, { useEffect, useState } from "react";
import { getInternships } from "../../api/internships";
import { getMyApplications } from "../../api/applications";
import { useAuth } from "../../context/AuthContext";


export default function StudentDashboard() {
  const [stats, setStats] = useState({
    internships: 0,
    applied: 0,
  });

  const { isAuthenticated } = useAuth();


  useEffect(() => {
    if (!isAuthenticated) return;
    const load = async () => {
      const internships = await getInternships();
      const applications = await getMyApplications();

      setStats({
        internships: internships.length,
        applied: applications.length,
      });
    };

    load();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <StatCard label="Open Internships" value={stats.internships} />
      <StatCard label="Applied" value={stats.applied} />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
