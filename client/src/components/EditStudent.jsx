import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const EditStudent = ({ student, onStudentUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: ""
  });

  // ⭐ NEW STATES ADDED
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load the selected student's data into the form
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        course: student.course || "",
        year: student.year || ""
      });
    }
  }, [student]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ⭐ UPDATED SUBMIT FUNCTION WITH LOADING + ERROR HANDLING
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await axios.put(`/students/${student._id}`, formData);

      if (onStudentUpdated) onStudentUpdated();
    } catch (err) {
      console.error("Error updating student:", err);
      setErrorMessage("❌ Failed to update student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">

      {/* ⭐ ERROR MESSAGE UI */}
      {errorMessage && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}

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

      {/* ⭐ UPDATED BUTTON WITH LOADING STATE */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-purple-600 text-white py-2 rounded-lg 
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
      >
        {loading ? "Updating..." : "Update Student"}
      </button>

    </form>
  );
};

export default EditStudent;
