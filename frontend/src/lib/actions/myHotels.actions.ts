import { API_BASE_URL } from "./auth.actions";

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const getMyHotel = async () => {
  const response = await fetch(`${API_BASE_URL}/api/hotel`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get my hotels");
  }

  return response.json();
};
