import axios from "../api/axios";

// Get logged-in user's profile
export const getProfile = async () => {
  const res = await axios.get("/profile");
  return res.data;
};

// Upload resume (PDF)
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  // ❌ DO NOT set Content-Type manually
  const res = await axios.post("/profile/resume", formData);

  return res.data;
};
