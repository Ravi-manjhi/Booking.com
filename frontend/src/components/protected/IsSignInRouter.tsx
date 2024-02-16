import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import React, { useEffect } from "react";

const IsSignIn = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useGlobalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn && pathname === "/sign-in") {
        navigate("/sign-in");
      }
      if (!isLoggedIn && pathname === "/sign-up") {
        navigate("/sign-up");
      }
    }
  }, [isLoading, isLoggedIn, navigate, pathname]);

  if (isLoading)
    return (
      <div className="flex bg-white text-gray-500 h-dvh items-center justify-center">
        <h3 className="text-bold">Loading...</h3>
      </div>
    );

  if (isLoggedIn && !isLoading) return navigate("/");

  return children;
};

export default IsSignIn;
