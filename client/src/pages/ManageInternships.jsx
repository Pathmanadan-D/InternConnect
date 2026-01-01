import { useEffect, useState } from "react";
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
  toggleInternshipStatus,
} from "../api/internships";

import AddInternship from "../components/AddInternship";
import EditInternship from "../components/EditInternship";
import DeleteInternshipModal from "../components/DeleteInternshipModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";




export default function ManageInternships() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  

  const [internships, setInternships] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  

  const load = async () => {
    const data = await getInternships();
    setInternships(data);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="text-center text-gray-500 py-20">
        Access denied
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manage Internships</h1>

      {/* CREATE */}
      <AddInternship
        onSubmit={async (data) => {
          await createInternship(data);
          load();
        }}
      />

      {/* TABLE */}
      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Applications</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {internships.map((i) => (
              <tr key={i._id} className="border-t">
              <td className="p-3 font-medium">{i.title}</td>
              <td className="p-3">{i.company}</td>
              <td className="p-3">{i.location}</td>
            
              {/* STATUS COLUMN */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      i.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {i.status}
                </span>
              </td>

              <td className="p-3">
  <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs font-medium">
    {i.applicationCount || 0}
  </span>
</td>

            
              {/* ACTIONS */}
              <td className="p-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => setEditItem(i)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>
            
                <button
                  onClick={async () => {
                    await toggleInternshipStatus(i._id);
                    load();
                  }}
                  className={`px-3 py-1 rounded text-white
                    ${
                      i.status === "open"
                        ? "bg-orange-600"
                        : "bg-green-600"
                    }`}
                >
                  {i.status === "open" ? "Close" : "Open"}
                </button>
            
                <button
                  onClick={() => setDeleteItem(i)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>

                <button
  onClick={() =>
    navigate(`/admin/applications?internship=${i._id}`)
  }
  className="px-3 py-1 bg-purple-600 text-white rounded"
>
  View
</button>

              </td>
            </tr>
            
            ))}

            {internships.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No internships created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT */}
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

      {/* DELETE */}
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
