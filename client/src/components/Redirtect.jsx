import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../recoil/userState";

export default function Redirect({ children }) {
  let user = false;
  // const user = useRecoilValue(userInfo);
  if (!user) {
    return children;
  }

  return <Navigate to={"/"} />;
}
