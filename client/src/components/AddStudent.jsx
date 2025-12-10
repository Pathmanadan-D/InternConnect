import React, { useState } from "react";
import axios from "../api/axios";

function AddStudent({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/students", formData);

      alert("Student added successfully!");

      setFormData({ name: "", email: "", course: "", year: "" });

      if (onStudentAdded) onStudentAdded(); // refresh list + close modal
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Failed to add student!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

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
        Add Student
      </button>
    </form>
  );
}

export default AddStudent;
