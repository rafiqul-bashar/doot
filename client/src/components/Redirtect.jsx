import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Redirect({ children }) {
  let user = false;

  if (!user) {
    return children;
  }

  return <Navigate to={"/"} />;
}
