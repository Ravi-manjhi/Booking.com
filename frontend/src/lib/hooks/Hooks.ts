import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IRegisterForm, ISignINForm } from "../types";
import {
  addMyHotel,
  authRegister,
  authSignIn,
  authSignOut,
  validateToken,
} from "../actions/actions";
import { useGlobalContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export const useAuthRegister = () => {
  const { showToast } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: IRegisterForm) => authRegister(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validateAuth"] });
      showToast({ message: "User Register Successful", type: "Success" });
    },
    onError: (error) => showToast({ message: error?.message, type: "Error" }),
  });
};

export const useCheckLoggedIn = () => {
  return useQuery({
    queryKey: ["validateAuth"],
    queryFn: validateToken,
    retry: false,
  });
};

export const useAuthLogin = () => {
  const { showToast } = useGlobalContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: ISignINForm) => authSignIn(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validateAuth"] });
      showToast({ message: "Login Success", type: "Success" });
    },
    onError: (error) => showToast({ message: error.message, type: "Error" }),
  });
};

export const useAuthSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useGlobalContext();
  return useMutation({
    mutationFn: authSignOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validateAuth"] });
      showToast({ message: "Logout Success", type: "Success" });
      navigate(0);
    },
    onError: (error) => showToast({ message: error.message, type: "Error" }),
  });
};

export const useAddMyHotel = () => {
  const { showToast } = useGlobalContext();

  return useMutation({
    mutationFn: (data: FormData) => addMyHotel(data),
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "Success" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "Error" });
    },
  });
};
