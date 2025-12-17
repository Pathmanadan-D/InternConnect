import React, { useState } from "react";

export default function EditInternship({ internship, onSave, onClose }) {
  const [form, setForm] = useState(internship);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-3">
        <h3 className="font-semibold">Edit Internship</h3>

        {Object.keys(form).map((key) => (
          key !== "_id" && (
            <input
              key={key}
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          )
        ))}

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
