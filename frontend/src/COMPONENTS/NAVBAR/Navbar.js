import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css/Navbar.css";
import { useHistory } from "react-router-dom";
import HamburgerMenu from "./Hamburger";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <HamburgerMenu user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="nav__login__signup__container">
        <div className="nav__bar__login" onClick={() => history.push("/login")}>
          LOGIN
        </div>
        <div className="nav__bar__signup" onClick={() => history.push("/signup")}>
          SIGN-UP
        </div>
      </div>
    );
  }

  return (
    <div className="nav__bar__container">
      <div className="home__logo" onClick={() => history.push("/")}>
        {/* <NavLink className="home__logo" exact to="/"></NavLink> */}
      </div>
      <div className="home__page__categories__container">
        <div onClick={() => history.push("/services")}>SERVICES</div>
        <div onClick={() => history.push("/employees")}>EMPLOYEES</div>
        <div onClick={() => history.push("/about")}>ABOUT</div>
      </div>
      <div className="hamburger__container">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
