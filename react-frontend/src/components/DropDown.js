import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const DropDown = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
  }, [ref]);
  const onClick = () => {
    setShow(!show);
  };
  return (
    <div className="dropDown">
      <div className="dropDownIcon" onClick={onClick} ref={ref}>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
      </div>
      <div className={show ? " ddc show" : " ddc dropDownContent"}>
        <Link to="/profile">Profile</Link>
        <Link to="/reset">Reset Password</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/signout">Sign Out</Link>
      </div>
    </div>
  );
};

export default DropDown;
