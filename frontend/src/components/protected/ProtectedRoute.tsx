import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/sign-in");
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading)
    return (
      <div className="flex bg-white text-gray-500 h-dvh items-center justify-center">
        <h3 className="text-bold">Loading...</h3>
      </div>
    );

  return children;
};

export default ProtectedRoute;
