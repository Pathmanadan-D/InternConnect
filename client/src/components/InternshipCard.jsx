import React from "react";

export default function InternshipCard({
  internship,
  isAdmin,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 space-y-2">
      <h3 className="text-lg font-semibold">{internship.title}</h3>

      <p className="text-sm text-gray-600">
        {internship.company} • {internship.location}
      </p>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 bg-purple-100 rounded">
          {internship.type}
        </span>
        <span className="px-2 py-1 bg-indigo-100 rounded">
          {internship.duration}
        </span>
        <span className="px-2 py-1 bg-green-100 rounded">
          {internship.stipend}
        </span>
      </div>

      <p className="text-sm text-gray-700">{internship.description}</p>

      {isAdmin && (
        <div className="flex gap-3 pt-3">
          <button
            onClick={() => onEdit(internship)}
            className="text-sm px-3 py-1 rounded bg-blue-600 text-white"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(internship)}
            className="text-sm px-3 py-1 rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
