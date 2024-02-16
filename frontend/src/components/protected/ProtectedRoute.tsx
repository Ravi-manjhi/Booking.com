import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import React, { useEffect } from "react";
import Loading from "../ui/Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/sign-in");
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) return <Loading />;

  return children;
};

export default ProtectedRoute;
