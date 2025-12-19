import axios from "../api/axios";

// Student apply
export const applyInternship = async (internshipId) => {
  const res = await axios.post(`/applications/apply/${internshipId}`);
  return res.data;
};

// Admin view all applications
export const getAllApplications = async () => {
  const res = await axios.get("/applications/admin");
  return res.data;
};

export const updateApplicationStatus = async (id, status) => {
  const res = await axios.put(`/applications/${id}/status`, { status });
  return res.data;
};
