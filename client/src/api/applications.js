import api from "./axios";

// Student apply
export const applyInternship = async (internshipId) => {
  const res = await api.post(`/applications/apply/${internshipId}`);
  return res.data;
};

// Student view own applications
export const getMyApplications = async () => {
  const res = await api.get("/applications/my");
  return res.data;
};

// ✅ SINGLE admin fetch function (FILTERABLE)
export const getAdminApplications = async (params = {}) => {
  const res = await api.get("/applications/admin", { params });
  return res.data;
};

// Admin update status
export const updateApplicationStatus = async (id, status) => {
  const res = await api.put(`/applications/${id}/status`, { status });
  return res.data;
};
