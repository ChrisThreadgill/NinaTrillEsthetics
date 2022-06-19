import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as currentEmployeeActions from "../../store/currentEmployee";

function HamburgerMenu({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const currentEmployee = useSelector((state) => state.currentEmployee);

  const openMenu = () => {
    if (showMenu) setShowMenu(false);
    else {
      setShowMenu(true);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(currentEmployeeActions.cleanCurrentEmployee());
    history.push("/");
  };

  return (
    <div className="hamburger__menu__container">
      <div className="hamburger__button" onClick={() => openMenu()}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {showMenu && (
        <div className="nav__bar__dropdown">
          <div>{`Hi, ${user.fName}`}</div>
          {currentEmployee && currentEmployee.id ? (
            <div
              className="hamburger__menu__option"
              onClick={() => {
                openMenu();
                history.push("/portal");
              }}
            >{`Portal`}</div>
          ) : (
            <div
              className="hamburger__menu__option"
              onClick={() => {
                openMenu();
                history.push("/profile");
              }}
            >{`Profile`}</div>
          )}
          {currentEmployee && currentEmployee ? (
            <></>
          ) : (
            <div
              className="hamburger__menu__option"
              onClick={() => {
                openMenu();
                history.push("/services");
              }}
            >{`Book Now!`}</div>
          )}
          {/* <div
            className="hamburger__menu__option"
            onClick={() => {
              openMenu();
              history.push("/services");
            }}
          >{`Book Now!`}</div> */}
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
