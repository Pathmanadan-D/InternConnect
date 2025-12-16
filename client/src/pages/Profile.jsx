import React, { useEffect, useState } from "react";
import { getProfile, uploadResume } from "../api/profile";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error("Profile load failed:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("UPLOAD CLICKED"); // 👈 ADD THIS
  
    if (!resumeFile) {
      console.log("NO FILE SELECTED"); // 👈 ADD THIS
      return;
    }
  
    setLoading(true);
    setMessage("");
  
    try {
      await uploadResume(resumeFile);
      setMessage("✅ Resume uploaded successfully");
      fetchProfile();
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("❌ Resume upload failed");
    } finally {
      setLoading(false);
    }
  };
  

  if (!profile) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="bg-white rounded-xl border p-4 space-y-2">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>

        <p>
          <strong>Resume:</strong>{" "}
          {profile.resume ? profile.resume : "Not uploaded"}
        </p>
      </div>

      <form onSubmit={handleUpload} className="mt-6 space-y-3">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="block"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}