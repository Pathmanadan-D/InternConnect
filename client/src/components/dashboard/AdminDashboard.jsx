import React, { useEffect, useState } from "react";
import { getInternships } from "../../api/internships";
import { getAdminApplications } from "../../api/applications";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    applications: 0,
  });

  useEffect(() => {
    const load = async () => {
      const internships = await getInternships();
      const applications = await getAdminApplications().catch(() => []);


      setStats({
        total: internships.length,
        open: internships.filter(i => i.status === "open").length,
        closed: internships.filter(i => i.status === "closed").length,
        applications: applications.length,
      });
    };

    load();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Total Internships" value={stats.total} />
      <StatCard label="Open" value={stats.open} />
      <StatCard label="Closed" value={stats.closed} />
      <StatCard label="Applications" value={stats.applications} />
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
