import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";
import AddStudent from "../components/AddStudent";
import Modal from "../components/Modal";
import EditStudent from "../components/EditStudent";



export default function Admin() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Delete modal states
const [isDeleteOpen, setIsDeleteOpen] = useState(false);
const [selectedStudentId, setSelectedStudentId] = useState(null);
// Edit modal states
const [isEditOpen, setIsEditOpen] = useState(false);
const [selectedStudent, setSelectedStudent] = useState(null);



  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };
//open delete model
  const openDeleteModal = (id) => {
    setSelectedStudentId(id);
    setIsDeleteOpen(true);
  };
  
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };
  
//close delete model
const closeDeleteModal = () => {
  setIsDeleteOpen(false);
  setSelectedStudentId(null);
};

//Delete student function
const deleteStudent = async () => {
  try {
    await axios.delete(`http://localhost:5000/students/${selectedStudentId}`);
    closeDeleteModal();
    fetchStudents(); // refresh table
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-900">Admin</h2>

      {/* Add student button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          + Add Student
        </button>
      </div>

      <Modal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  title="Edit Student"
>
  <EditStudent
    student={selectedStudent}
    onStudentUpdated={() => {
        fetchStudents();
        setIsEditOpen(false);
    }}
  />
</Modal>


      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Student"
      >
        <AddStudent
          onStudentAdded={() => {
            fetchStudents();
            setIsModalOpen(false); // close when done
          }}
        />
      </Modal>

      {/* Student table */}
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

                  <button
                      onClick={() => openEditModal(s)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 
                      hover:bg-gray-50 hover:shadow-sm 
                      transition-all duration-200 active:scale-[0.97] mr-2"
                   >
                          Edit
                      </button>


                   <button
                      onClick={() => openDeleteModal(s._id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500 text-white 
                      hover:bg-red-600 hover:shadow-md 
                      transition-all duration-200 active:scale-[0.97]"
                 >
                     Delete
                  </button>


                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <DeleteModal
  isOpen={isDeleteOpen}
  onClose={closeDeleteModal}
  onConfirm={deleteStudent}
/>

    </div>
  );
}
