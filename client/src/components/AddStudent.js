import React, { useState } from "react";
import axios from "axios";

function AddStudent() {
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
      const res = await axios.post("http://localhost:5000/students", formData);
      console.log("Student added:", res.data);
      alert("Student added successfully!");
      setFormData({ name: "", email: "", course: "", year: "" });
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Failed to add student!");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />{" "}
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
