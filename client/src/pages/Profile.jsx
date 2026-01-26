import React, { useEffect, useState } from "react";
import { getProfile, uploadResume } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import ProfileDetails from "../components/ProfileDetails";
import { calculateProfileCompletion } from "../utils/profileCompletion";


export default function Profile() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      updateUser(data); // ✅ SYNC AUTH CONTEXT
    } catch (err) {
      console.error("Profile load failed:", err);
    }
  };
  

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;

    setLoading(true);
    setMessage("");

    try {
      await uploadResume(resumeFile);
      setMessage("✅ Resume uploaded successfully");
      loadProfile();
    } catch {
      setMessage("❌ Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <p className="p-6">Loading profile...</p>;
  }

  const completion = calculateProfileCompletion(profile);

  const profileChecklist = [
    {
      label: "Resume uploaded",
      completed: Boolean(profile.resume),
    },
    {
      label: "Course & year",
      completed: Boolean(profile.course && profile.year),
    },
    {
      label: "Phone",
      completed: Boolean(profile.phone),
    },
    {
      label: "Location",
      completed: Boolean(profile.location),
    },
    {
      label: "Skills",
      completed: Array.isArray(profile.skills)
        ? profile.skills.length > 0
        : Boolean(profile.skills),
    },
  ];
  


  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* LEFT — PROFILE INFO */}
      <div className="md:col-span-1 bg-white border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-xl font-bold text-purple-700">
            {profile.name?.[0]}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                profile.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {profile.role.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.course && <p><strong>Course:</strong> {profile.course}</p>}
          {profile.year && <p><strong>Year:</strong> {profile.year}</p>}
        </div>

        {/* PROFILE COMPLETION */}
        <div>
          <p className="text-sm font-medium mb-1">Profile Completion</p>

{/* PROFILE CHECKLIST */}
<div className="mt-3 space-y-1">
  {profileChecklist.map((item) => (
    <div
      key={item.label}
      className={`text-xs flex items-center gap-2 ${
        item.completed ? "text-green-600" : "text-red-600"
      }`}
    >
      <span>{item.completed ? "✔" : "✖"}</span>
      <span>{item.label}</span>
    </div>
  ))}
</div>


          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{completion}% complete</p>
        </div>
      </div>

      {/* ✅ ADD HERE */}
      <div className="md:col-span-3">
  <ProfileDetails
    profile={profile}
    onUpdated={loadProfile}
  />
</div>


      {/* RIGHT — RESUME */}
      <div className="md:col-span-2 bg-white border rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Resume</h3>
          {profile.resume ? (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
              Uploaded
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
              Not uploaded
            </span>
          )}
        </div>

        {profile.resume && (
          <a
            href={`http://localhost:5000/${profile.resume}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-purple-600 underline text-sm"
          >
            View Resume
          </a>
        )}

        {/* STUDENT ONLY — UPLOAD */}
        {profile.role === "student" && (
          <form onSubmit={handleUpload} className="space-y-3">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload / Replace Resume"}
            </button>
          </form>
        )}

        {message && <p className="text-sm">{message}</p>}
      </div>
    </div>
  );
}
