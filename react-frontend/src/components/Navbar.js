import React, { useContext, useEffect, useState } from "react";
import DropDown from "./DropDown";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import jwt from "jwt-decode";
import axios from "axios";
const Navbar = () => {
  const style = {
    marginRight: "20px",
  };
  const { user } = useContext(AuthContext);
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">MoneyManagement</Link>
          </div>
          {user ? (
            <ul className="nav-links">
              <div className="profileBrand" style={{ marginRight: "10px" }}>
                <Link to="/profile">{user.name}</Link>
              </div>
              <DropDown />
            </ul>
          ) : (
            <ul className="nav-links">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
