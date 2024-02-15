import { IRegisterForm, ISignINForm } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT
  ? import.meta.env.VITE_API_ENDPOINT
  : "";

export const authRegister = async (formData: IRegisterForm) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
};

export const authSignIn = async (formData: ISignINForm) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};

export const authSignOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
};
