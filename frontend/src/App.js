import "./index.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./COMPONENTS/FORMS/Auth/Login";
import SignupFormPage from "./COMPONENTS/FORMS/Auth/Signup";
import * as sessionActions from "./store/session";
import * as currentEmployeeAction from "./store/currentEmployee";
import Navigation from "./COMPONENTS/NAVBAR/Navbar";
import DatePickerTest from "./COMPONENTS/test/Test";
import TestAppointments from "./COMPONENTS/test/TestAppointments";
import EmployeePortal from "./COMPONENTS/EMPLOYEEPORTAL/EmployeePortal";
import HomePageServices from "./COMPONENTS/SITEHOME/SERVICES/HomePageServices";
import HomePageEmployees from "./COMPONENTS/SITEHOME/EMPLOYEES/HomePageEmployees";
import CustomerHomePage from "./COMPONENTS/CUSTOMERHOME/CustomerHomePage";
import ProtectedRoute from "./COMPONENTS/FORMS/Auth/ProtectedRoute";
import SiteHomePage from "./COMPONENTS/SITEHOME/SiteHomePage";
import ProtectedRouteCustomer from "./COMPONENTS/FORMS/Auth/ProtectedRouteCustomer";
import HomePageAbout from "./COMPONENTS/SITEHOME/ABOUT/HomePageAbout";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentEmployee = useSelector((state) => state.currentEmployee);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() =>
      dispatch(currentEmployeeAction.checkEmployment(1)).then(() => setIsLoaded(true))
    );
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
            <HomePageAbout></HomePageAbout>
          </Route>
          <ProtectedRoute path="/portal">
            <EmployeePortal></EmployeePortal>
          </ProtectedRoute>
          {/* <Route path="/portal"> */}
          {/* {currentEmployee && currentEmployee.role > 2 ? <h1>hello</h1> : <EmployeePortal></EmployeePortal>} */}
          {/* </Route> */}

          <ProtectedRouteCustomer path="/profile">
            <CustomerHomePage></CustomerHomePage>
          </ProtectedRouteCustomer>
          <Route path="/">
            <SiteHomePage></SiteHomePage>
          </Route>
          {/* <Route path="/profile"></Route> */}

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
