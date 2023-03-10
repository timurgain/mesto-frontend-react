import React from "react";
import { Navigate } from "react-router-dom";
import AuthUserContext from "../contexts/AuthUserContext";

function ProtectedRoute({ element: Component, ...props }) {
  const { loggedIn } = React.useContext(AuthUserContext);
  return loggedIn
    ? ( <Component {...props} /> )
    : ( <Navigate to="/sign-in" replace /> );
}

export default ProtectedRoute;
