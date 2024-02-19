import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../context/AppContext";
import {
  addMyHotel,
  getHotelById,
  getMyHotel,
  updateHotelById,
} from "../actions/myHotels.actions";
import { useNavigate } from "react-router-dom";

export const useAddMyHotel = () => {
  const { showToast } = useGlobalContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: FormData) => addMyHotel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myHotels"] });
      showToast({ message: "Hotel Saved!", type: "Success" });
      navigate("/my-hotels");
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "Error" });
    },
  });
};

export const useGetMyHotel = () => {
  return useQuery({
    queryKey: ["myHotels"],
    queryFn: getMyHotel,
  });
};

export const useGetHotelById = (id: string) => {
  return useQuery({
    queryKey: ["hotelId", id],
    queryFn: () => getHotelById(id),
  });
};

export const useUpdateHotelById = () => {
  const { showToast } = useGlobalContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateHotelById({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myHotels"] });
      showToast({ message: "Hotel details updated", type: "Success" });
      navigate("/my-hotels");
    },
    onError: (error) => showToast({ message: error.message, type: "Error" }),
  });
};
