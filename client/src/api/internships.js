import axios from "./axios";

// Public
export const getInternships = async () => {
  const res = await axios.get("/internships");
  return res.data;
};

// Admin only
export const createInternship = async (data) => {
  const res = await axios.post("/internships", data);
  return res.data;
};

export const updateInternship = async (id, data) => {
  const res = await axios.put(`/internships/${id}`, data);
  return res.data;
};

export const deleteInternship = async (id) => {
  const res = await axios.delete(`/internships/${id}`);
  return res.data;
};
