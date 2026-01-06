import { useEffect, useState } from "react";
import {
  getAdminApplications,
  updateApplicationStatus,
} from "../api/applications";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";


const statusStyle = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-700",
    icon: <FaClock />,
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-700",
    icon: <FaCheckCircle />,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-700",
    icon: <FaTimesCircle />,
  },
};

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [status, setStatus] = useState("");

  const [params] = useSearchParams();
  const internshipId = params.get("internship"); // ✅ FIRST

  const load = async () => {
    const data = await getAdminApplications({
      internship: internshipId || undefined,
      status: status || undefined,
    });
    setApps(data);
  };  
  
  

  useEffect(() => {
    load();
  }, [internshipId, status]);
  


  const updateStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    load();
  };



  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Applications</h2>

      <div className="flex gap-3 items-center">
  <label className="text-sm font-medium">Status:</label>
  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="border rounded px-3 py-2 text-sm"
  >
    <option value="">All</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
  </select>
</div>


      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Internship</th>
              <th className="p-3">Resume</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {apps.map((a, i) => {
              const status = statusStyle[a.status];
              const isFinal = a.status !== "pending";

              return (
                <motion.tr
                  key={a._id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="font-medium">{a.student.name}</div>
                    <div className="text-xs text-gray-500">
                      {a.student.email}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="font-medium">
                      {a.internship.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {a.internship.company}
                    </div>
                  </td>

                  <td className="p-3 text-center">
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

                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        disabled={isFinal}
                        onClick={() =>
                          updateStatus(a._id, "approved")
                        }
                        className={`px-3 py-1 rounded text-white text-xs
                          ${
                            isFinal
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }
                        `}
                      >
                        Approve
                      </button>

                      <button
                        disabled={isFinal}
                        onClick={() =>
                          updateStatus(a._id, "rejected")
                        }
                        className={`px-3 py-1 rounded text-white text-xs
                          ${
                            isFinal
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }
                        `}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
