import { api } from "../api/Api";

export const checkAvailability = async (email) => {
  const res = await api.post("/auth/check-availability", { email });

  if (res.status !== 200) {
    throw new Error(res.data.message || "Email not available");
  }

  return res.data;
};
