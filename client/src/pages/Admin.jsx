import React from "react";
import AddStudent from "../components/AddStudent"; // ✅ import the form

const rows = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  student: `Student ${i + 1}`,
  internship: ["Frontend", "Backend", "ML", "UI/UX"][i % 4],
}));

export default function Admin() {
  return (
    <div className="py-8">

      <h2 className="text-2xl font-semibold text-gray-900">Admin</h2>

      {/* ✅ ADD STUDENT FORM HERE */}
      <div className="mt-6">
        <AddStudent />
      </div>

      {/* TABLE SECTION */}
      <div className="mt-6 overflow-x-auto rounded-2xl backdrop-blur-xl bg-white/70 border border-gray-200">
        <table className="min-w-full text-left text-gray-900">
          <thead className="text-gray-600">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Internship</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{r.student}</td>
                <td className="px-4 py-3">{r.internship}</td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 mr-2">
                    Edit
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-red-500/90 hover:bg-red-500 text-white">
                    Delete
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
