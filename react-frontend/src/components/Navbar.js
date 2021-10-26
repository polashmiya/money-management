import React, { useContext } from "react";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const style = {
    marginRight: "20px",
  };
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">MoneyManagement</Link>
          </div>
          {auth ? (
            <ul className="nav-links">
              <div className="profileBrand" style={{marginRight:"10px"}}>
                <Link to="/profile">Md Polash Miya</Link>
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
