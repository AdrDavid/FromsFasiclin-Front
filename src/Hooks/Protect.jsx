import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RotaProtegida({ children }) {
  const { token, validateToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        const isValid = await validateToken();
        setIsAuthenticated(isValid);
      }
    };

    checkAuth();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
