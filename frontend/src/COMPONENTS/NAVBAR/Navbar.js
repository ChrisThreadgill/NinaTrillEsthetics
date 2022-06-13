import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css/Navbar.css";
import HamburgerMenu from "./Hamburger";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <HamburgerMenu user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="nav__bar__container">
      <div className="home__logo">{/* <NavLink className="home__logo" exact to="/"></NavLink> */}</div>
      <div className="home__page__categories__container">
        <div>SERVICES</div>
        <div>EMPLOYEES</div>
        <div>ABOUT</div>
      </div>
      <div>{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
