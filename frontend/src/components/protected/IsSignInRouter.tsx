import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import React, { useEffect } from "react";

const IsSignInRouter = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useGlobalContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn && pathname === "/sign-in") {
        navigate("/");
      }
      if (isLoggedIn && pathname === "/sign-up") {
        navigate("/");
      }
    }
  }, [isLoading, isLoggedIn, navigate, pathname]);

  if (isLoading)
    return (
      <div className="flex bg-white text-gray-500 h-dvh items-center justify-center">
        <h3 className="text-bold">Loading...</h3>
      </div>
    );

  return children;
};

export default IsSignInRouter;
