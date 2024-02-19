import { API_BASE_URL } from "./auth.actions";

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) throw new Error("Failed to add hotel");

  return response.json();
};

export const getMyHotel = async () => {
  const response = await fetch(`${API_BASE_URL}/api/hotel`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed to get my hotels");

  return response.json();
};

export const getHotelById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/hotel/${id}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("failed to fetch hotel By Id ");

  return await response.json();
};

export const updateHotelById = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/hotel/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update Hotel");

  return await response.json();
};
