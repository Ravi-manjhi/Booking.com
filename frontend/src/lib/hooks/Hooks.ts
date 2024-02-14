import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IRegisterForm, ISignINForm } from "../types";
import {
  authRegister,
  authSignIn,
  authSignOut,
  validateToken,
} from "../actions/actions";
import { useGlobalContext } from "../../context/AppContext";

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
  const queryClient = useQueryClient();
  const { showToast } = useGlobalContext();
  return useMutation({
    mutationFn: authSignOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validateAuth"] });
      showToast({ message: "Logout Success", type: "Success" });
    },
    onError: (error) => showToast({ message: error.message, type: "Error" }),
  });
};
