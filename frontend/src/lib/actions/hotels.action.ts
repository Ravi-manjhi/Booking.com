import { IHotelSearchResponse, ISearchParams } from "../types";
import { API_BASE_URL } from "./auth.actions";

export const searchHotels = async (
  searchParams: ISearchParams
): Promise<IHotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("sortOptions", searchParams.sortOptions || "");
  queryParams.append("maxPrice", searchParams.maxPrice?.toLocaleString() || "");

  searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) throw new Error("failed to get All hotelData");

  return await response.json();
};
