import { useEffect, useState } from "react";
import { getAllApplications } from "../api/applications";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getAllApplications();
    setApplications(data);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Applications</h2>

      {applications.map((app) => (
        <div
          key={app._id}
          className="bg-white border rounded-xl p-4 flex justify-between"
        >
          <div>
            <p className="font-medium">
              {app.student.name} ({app.student.email})
            </p>
            <p className="text-sm text-gray-600">
              {app.internship.title} — {app.internship.company}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
            {app.status}
          </span>
        </div>
      ))}
    </div>
  );
}
