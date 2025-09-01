// routes/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import DashBoardLayout from "../components/layout/dashboard/DashBoardLayout";
import { AuthContext } from "../context/auth/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Eğer roles prop’u varsa ve kullanıcının rolü listede yoksa yönlendir
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <DashBoardLayout>{children}</DashBoardLayout>;
};

export default PrivateRoute;
