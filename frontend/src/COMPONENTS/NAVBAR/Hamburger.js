import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as currentEmployeeActions from "../../store/currentEmployee";

function HamburgerMenu({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  // console.log(user);
  console.log(showMenu);

  const openMenu = () => {
    if (showMenu) setShowMenu(false);
    else {
      setShowMenu(true);
    }
  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(currentEmployeeActions.cleanCurrentEmployee());
    history.push("/");
  };

  return (
    <div className="hamburger__menu__container">
      {/* <button className="hamburger__button" onClick={() => openMenu()}>
        Menu
      </button> */}
      {/* <svg className="hamburger__button" viewBox="0 0 100 80" width="40" height="40" onClick={() => openMenu()}>
        <rect className="rectangle" width="50" height="7"></rect>
        <rect className="rectangle" y="20" width="50" height="7"></rect>
        <rect className="rectangle" y="40" width="50" height="7"></rect>
      </svg> */}
      <div className="hamburger__button" onClick={() => openMenu()}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {showMenu && (
        <div className="nav__bar__dropdown">
          <div>{`Hi, ${user.fName}`}</div>
          <div
            className="hamburger__menu__option"
            onClick={() => {
              openMenu();
              history.push("/profile");
            }}
          >{`Profile`}</div>
          <div
            className="hamburger__menu__option"
            onClick={() => {
              openMenu();
              history.push("/services");
            }}
          >{`Book Now!`}</div>
          <div
            className="hamburger__menu__option"
            onClick={() => {
              openMenu();
              history.push("/about");
            }}
          >{`Directions`}</div>
          <button className="hamburger__menu__logout" onClick={logout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
