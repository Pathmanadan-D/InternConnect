import { useEffect, useState } from "react";
import { getMyApplications } from "../api/applications";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getMyApplications();
    setApps(data);
  };

  const statusColor = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">My Applications</h2>

      {apps.length === 0 && (
        <p className="text-gray-500">You have not applied yet.</p>
      )}

      <div className="space-y-4">
        {apps.map((a) => (
          <div
            key={a._id}
            className="bg-white border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {a.internship.title}
              </h3>
              <p className="text-sm text-gray-600">
                {a.internship.company} • {a.internship.location}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm capitalize ${statusColor(
                a.status
              )}`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
