import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
      <h1 className="text-3xl font-bold text-blue-600">
      InternConnect Frontend
      </h1>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
