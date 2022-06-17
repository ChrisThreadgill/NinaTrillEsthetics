import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState();
  const user = useSelector((state) => state.session.user);
  const employee = useSelector((state) => state.currentEmployee);
  console.log(employee);

  useEffect(() => {
    if (employee) setLoaded(true);
  }, [dispatch]);

  return loaded && <Route {...props}>{user?.id == employee?.id ? props.children : <Redirect to="/login" />}</Route>;
};

export default ProtectedRoute;
