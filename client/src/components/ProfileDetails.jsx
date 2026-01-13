import React, { useState } from "react";
import { updateProfile } from "../api/profile";

export default function ProfileDetails({ profile, onUpdated }) {
  const [form, setForm] = useState({
    course: profile.course || "",
    year: profile.year || "",
    phone: profile.phone || "",
    location: profile.location || "",
    skills: profile.skills || "",
    about: profile.about || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ THIS WAS MISSING — CRITICAL
  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      await updateProfile(form);
      onUpdated(); // reload profile in parent
    } catch (err) {
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Edit Profile</h3>

      <input
        name="course"
        value={form.course}
        onChange={handleChange}
        placeholder="Course"
        className="w-full border rounded p-2"
      />

      <input
        name="year"
        value={form.year}
        onChange={handleChange}
        placeholder="Year"
        className="w-full border rounded p-2"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border rounded p-2"
      />

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full border rounded p-2"
      />

      <input
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Skills (comma separated)"
        className="w-full border rounded p-2"
      />

      <textarea
        name="about"
        value={form.about}
        onChange={handleChange}
        placeholder="About you"
        rows={3}
        className="w-full border rounded p-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        onClick={handleSave}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
