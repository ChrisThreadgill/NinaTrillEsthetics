import "./index.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./COMPONENTS/FORMS/Auth/Login";
import SignupFormPage from "./COMPONENTS/FORMS/Auth/Signup";
import * as sessionActions from "./store/session";
import Navigation from "./COMPONENTS/NAVBAR/Navbar";

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
        </Switch>
      )}
    </>
  );
}

export default App;