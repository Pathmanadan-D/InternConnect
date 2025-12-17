import React, { useState } from "react";

export default function AddInternship({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    duration: "",
    stipend: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const hasEmpty = Object.values(form).some((v) => !v.trim());
  
    if (hasEmpty) {
      alert("All fields are required");
      return;
    }
  
    console.log("CREATE CLICKED");
    console.log("FORM DATA:", form);
  
    await onSubmit(form);
  };
  

  return (
    <div className="bg-white border rounded-xl p-4 space-y-3">
      <h3 className="font-semibold">Add Internship</h3>

      <input
  name="title"
  placeholder="Title"
  value={form.title}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded"
/>

<input
  name="company"
  placeholder="Company"
  value={form.company}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded"
/>

<input
  name="location"
  placeholder="Location"
  value={form.location}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded"
/>

{/* 🔥 IMPORTANT FIX — ENUM SAFE */}
<select
  name="type"
  value={form.type}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded"
>
  <option value="">Select Type</option>
  <option value="Remote">Remote</option>
  <option value="Onsite">Onsite</option>
  <option value="Hybrid">Hybrid</option>
</select>

<input
  name="duration"
  placeholder="Duration (e.g. 3 Months)"
  value={form.duration}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded"
/>

<input
  name="stipend"
  placeholder="Stipend (e.g. LKR 30,000)"
  value={form.stipend}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded"
/>

<textarea
  name="description"
  placeholder="Description"
  value={form.description}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded"
/>


      <button
        type="button"
        onClick={handleCreate}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Create
      </button>
    </div>
  );
}
