import { useEffect, useState } from "react";
import {
  getAllApplications,
  updateApplicationStatus,
} from "../api/applications";

export default function AdminApplications() {
  const [apps, setApps] = useState([]);

  const load = async () => {
    const data = await getAllApplications();
    setApps(data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    load();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Applications</h2>

      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Internship</th>
              <th className="p-3">Resume</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {apps.map((a) => (
              <tr key={a._id} className="border-t">
                <td className="p-3">
                  {a.student.name}
                  <br />
                  <span className="text-xs text-gray-500">
                    {a.student.email}
                  </span>
                </td>

                <td className="p-3">
                  {a.internship.title}
                  <br />
                  <span className="text-xs text-gray-500">
                    {a.internship.company}
                  </span>
                </td>

                <td className="p-3">
                  {a.student.resume && (
                    <a
                      href={`http://localhost:5000/${a.student.resume}`}
                      target="_blank"
                      className="text-purple-600 underline"
                    >
                      View
                    </a>
                  )}
                </td>

                <td className="p-3 capitalize">{a.status}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => updateStatus(a._id, "approved")}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(a._id, "rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
