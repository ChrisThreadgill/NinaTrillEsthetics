import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function HamburgerMenu({ user }) {
  const dispatch = useDispatch();
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
  };

  return (
    <>
      <button onClick={() => openMenu()}>Menu</button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.fName}</li>
          <li>{user.lName}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default HamburgerMenu;
