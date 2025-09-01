// routes/AppRoute.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";

import Analysis from "../pages/analysis/Analysis";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/products/Products";
import Users from "../pages/users/Users";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute roles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute roles={["admin"]}>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute roles={["admin"]}>
              <Orders />
            </PrivateRoute>
          }
        />

        <Route
          path="/analysis"
          element={
            <PrivateRoute roles={["admin"]}>
              <Analysis />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute roles={["admin", "user"]}>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Yetkisiz erişim için */}
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
