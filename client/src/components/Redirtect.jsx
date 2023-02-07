import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Redirect({ children }) {
  const { userToken } = useSelector((state) => state.auth);
  if (!userToken) {
    return <Navigate to={"/auth-login"} replace />;
  }
  return children;
}
