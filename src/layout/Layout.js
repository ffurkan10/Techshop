import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useIsLoggedIn } from "../config/Hooks";

const Layout = () => {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn === null) return <Loading />;
  else if (isLoggedIn === false) return <Navigate replace to="/sign-in" />;

  return <Outlet />;
};

export default Layout;
