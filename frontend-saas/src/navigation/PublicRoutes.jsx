import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      setRedirect(true);
    }
  }, [isAuthenticated, loading]);

  if (loading) return <div>Loading...</div>;
  if (redirect) return <Navigate to="/" replace />; // redirect tetiklenir

  return children;
};

export default PublicRoute;
