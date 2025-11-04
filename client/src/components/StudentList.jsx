import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // ✅ You missed this line

  useEffect(() => {
    // Fetch all students from backend
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`http://localhost:5000/students/${id}`)
        .then(() => {
          alert("🗑️ Student deleted successfully!");
          setStudents(students.filter((s) => s._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting student:", err);
          alert("❌ Failed to delete student");
        });
    }
  };
  
  return (
    <div style={{ padding: "20px" }}>
      <h2>🎓 Student List</h2>

      {/* Add Student Button */}
      <button onClick={() => navigate("/add")}>➕ Add New Student</button>
      <br /><br />

      {students.length > 0 ? (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Year</th>
              <th>Actions</th> {/* ✅ Add a column for Edit/Delete */}
            </tr>
          </thead>
          <tbody>
  {students.map((s) => (
    <tr key={s._id}>
      <td>{s.name}</td>
      <td>{s.email}</td>
      <td>{s.course}</td>
      <td>{s.year}</td>
      <td>
        <button
          onClick={() => navigate(`/edit/${s._id}`)}
          style={{ marginRight: "10px" }}
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => handleDelete(s._id)}
          style={{ background: "red", color: "white" }}
        >
          🗑️ Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default StudentList;