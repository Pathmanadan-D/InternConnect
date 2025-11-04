import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    year: ""
  });

  // Fetch existing student data when page loads
  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.error("Error fetching student:", err));
  }, [id]);

  // Update the student in MongoDB
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/students/${id}`, student)
      .then(() => {
        alert("✅ Student updated successfully!");
        navigate("/"); // Go back to student list
      })
      .catch((err) => {
        console.error("Error updating student:", err);
        alert("❌ Failed to update student");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>✏️ Edit Student</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          required
        />
        <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="Course"
          value={student.course}
          onChange={(e) => setStudent({ ...student, course: e.target.value })}
          required
        />
        <br /><br />
        <input
          type="number"
          placeholder="Year"
          value={student.year}
          onChange={(e) => setStudent({ ...student, year: e.target.value })}
          required
        />
        <br /><br />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
