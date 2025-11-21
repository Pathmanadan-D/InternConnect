import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStudent from "../components/AddStudent";

export default function Admin() {
  const [students, setStudents] = useState([]);

  // ✅ Fetch students from backend
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      console.log("RESPONSE FROM BACKEND:", res.data);
      setStudents(res.data);
      console.log("STUDENTS STATE:", res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Load on page start
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="py-8">

      <h2 className="text-2xl font-semibold text-gray-900">Admin</h2>

      {/* Add student form */}
      <div className="mt-6">
        <AddStudent onStudentAdded={fetchStudents} />
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl backdrop-blur-xl bg-white/70 border border-gray-200">
        <table className="min-w-full text-left text-gray-900">
          <thead className="text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
          {!Array.isArray(students) ? (
    <tr><td colSpan="4">Backend returned invalid data</td></tr>
  ) : students.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-gray-500" colSpan="4">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s._id} className="border-t border-gray-200">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.course}</td>
                  <td className="px-4 py-3">{s.year}</td>

                  <td className="px-4 py-3">
                    <button className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 mr-2">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-red-500/90 hover:bg-red-500 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
