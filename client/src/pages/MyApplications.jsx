import { useEffect, useState } from "react";
import { getMyApplications } from "../api/applications";
import { motion } from "framer-motion";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
} from "react-icons/fa";

const statusConfig = {
  pending: {
    label: "Pending",
    color: "text-amber-600 bg-amber-50",
    icon: <FaClock />,
  },
  approved: {
    label: "Approved",
    color: "text-green-600 bg-green-50",
    icon: <FaCheckCircle />,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-600 bg-red-50",
    icon: <FaTimesCircle />,
  },
};

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then(setApps);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">My Applications</h1>

      {apps.length === 0 && (
        <p className="text-gray-500">You have not applied yet.</p>
      )}

      <div className="space-y-4">
        {apps.map((a, i) => {
          const status = statusConfig[a.status];

          return (
            <motion.div
              key={a._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FaBriefcase className="text-purple-600" />
                    {a.internship.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {a.internship.company}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                >
                  {status.icon}
                  {status.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
