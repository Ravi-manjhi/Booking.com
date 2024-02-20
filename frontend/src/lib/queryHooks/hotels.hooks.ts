import { useQuery } from "@tanstack/react-query";
import { ISearchParams } from "../types";
import { searchHotels } from "../actions/hotels.action";

export const useSearchHotels = (searchParams: ISearchParams) => {
  return useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => searchHotels(searchParams),
  });
};
