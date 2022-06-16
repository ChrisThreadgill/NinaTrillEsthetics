import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.session.user);
  const employee = useSelector((state) => state.currentEmployee);
  return <Route {...props}>{user?.id == employee?.id ? props.children : <Redirect to="/login" />}</Route>;
};

export default ProtectedRoute;
