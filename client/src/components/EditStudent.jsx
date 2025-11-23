import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditStudent({ studentId, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: ""
  });

  // 1️⃣ Load existing student data
  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`http://localhost:5000/students/${studentId}`)
      .then((res) => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
          course: res.data.course,
          year: res.data.year
        });
      })
      .catch((err) => console.error("Error fetching student:", err));
  }, [studentId]);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2️⃣ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/students/${studentId}`,
        formData
      );

      alert("Student updated successfully!");

      if (onUpdated) onUpdated(); // refresh list & close modal
    } catch (err) {
      console.error("Error updating student:", err);
      alert("Failed to update student!");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
      >
        Update Student
      </button>
    </form>
  );
}
