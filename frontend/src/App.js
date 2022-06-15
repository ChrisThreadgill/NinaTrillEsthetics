import "./index.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./COMPONENTS/FORMS/Auth/Login";
import SignupFormPage from "./COMPONENTS/FORMS/Auth/Signup";
import * as sessionActions from "./store/session";
import Navigation from "./COMPONENTS/NAVBAR/Navbar";
import DatePickerTest from "./COMPONENTS/test/Test";
import TestAppointments from "./COMPONENTS/test/TestAppointments";
import EmployeePortal from "./COMPONENTS/EMPLOYEEPORTAL/EmployeePortal";
import HomePageServices from "./COMPONENTS/SITEHOME/SERVICES/HomePageServices";
import HomePageEmployees from "./COMPONENTS/SITEHOME/EMPLOYEES/HomePageEmployees";
import CustomerHomePage from "./COMPONENTS/CUSTOMERHOME/CustomerHomePage";
import ProtectedRoute from "./COMPONENTS/FORMS/Auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded}></Navigation>
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage></LoginFormPage>
          </Route>
          <Route path="/signup">
            <SignupFormPage></SignupFormPage>
          </Route>
          <Route path="/services">
            <HomePageServices></HomePageServices>
          </Route>
          <Route path="/employees">
            <HomePageEmployees></HomePageEmployees>
          </Route>
          <Route path="/about">
            <HomePageEmployees></HomePageEmployees>
          </Route>
          <ProtectedRoute path="/profile">
            <CustomerHomePage></CustomerHomePage>
          </ProtectedRoute>
          {/* <Route path="/profile"></Route> */}
          <Route path="/portal">
            <EmployeePortal></EmployeePortal>
          </Route>

          <Route path="/test">
            <DatePickerTest></DatePickerTest>
          </Route>
          <Route path="/testAppointments">
            <TestAppointments></TestAppointments>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
