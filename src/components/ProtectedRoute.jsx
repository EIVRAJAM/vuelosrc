import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const userRoles = JSON.parse(localStorage.getItem("roles"));

  if (!token || !userRoles) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.some((role) => userRoles.includes(role))) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
