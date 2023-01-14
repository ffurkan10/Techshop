import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../config/Hooks";
import { useSelector } from "react-redux";
import Loading from "../components/loading/Loading";

const AuthLayout = () => {
  const isLoggedIn = useIsLoggedIn();
  const error = useSelector((state) => state.auth.error);

  if (isLoggedIn === null) {
    return <Loading />;
  } else if (isLoggedIn === true) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="sign">
      <div className="sign__container">
        <Outlet />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default AuthLayout;
