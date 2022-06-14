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
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="nav__bar__container">
      <div className="home__logo" onClick={() => history.push("/")}>
        {/* <NavLink className="home__logo" exact to="/"></NavLink> */}
      </div>
      <div className="home__page__categories__container">
        <div onClick={() => history.push("/home")}>SERVICES</div>
        <div onClick={() => history.push("/employees")}>EMPLOYEES</div>
        <div onClick={() => history.push("/about")}>ABOUT</div>
      </div>
      <div>{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
