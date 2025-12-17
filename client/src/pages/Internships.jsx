import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from "../api/internships";

import InternshipCard from "../components/InternshipCard";
import AddInternship from "../components/AddInternship";
import EditInternship from "../components/EditInternship";
import DeleteInternshipModal from "../components/DeleteInternshipModal";

export default function Internships() {
  const { isAdmin } = useAuth();
  const [internships, setInternships] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const load = async () => {
    const data = await getInternships();
    setInternships(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      {isAdmin && (
  <AddInternship
  onSubmit={async (data) => {
    try {
      console.log("SENDING TO BACKEND:", data);
      const res = await createInternship(data);
      console.log("CREATED:", res);
      load();
    } catch (err) {
      console.error("CREATE FAILED:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Create failed");
    }
  }}
  
  />
)}


      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((i) => (
          <InternshipCard
            key={i._id}
            internship={i}
            isAdmin={isAdmin}
            onEdit={setEditItem}
            onDelete={setDeleteItem}
          />
        ))}
      </div>

      {editItem && (
        <EditInternship
          internship={editItem}
          onClose={() => setEditItem(null)}
          onSave={async (data) => {
            await updateInternship(data._id, data);
            setEditItem(null);
            load();
          }}
        />
      )}

      {deleteItem && (
        <DeleteInternshipModal
          onClose={() => setDeleteItem(null)}
          onConfirm={async () => {
            await deleteInternship(deleteItem._id);
            setDeleteItem(null);
            load();
          }}
        />
      )}
    </div>
  );
}
