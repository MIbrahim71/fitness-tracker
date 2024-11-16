import api from "./api";

export const getCheckIns = async () => {
  try {
    const response = await api.get("/checkin/summary");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch checkins" };
  }
};

export const handleCheckIn = async (date) => {
  try {
    console.log("Sending check-in date:", date);
    const response = await api.post(`/checkin`, { date });
    return response.data;
  } catch (error) {
    console.error("Error checking in:", error.message);
  }
};
