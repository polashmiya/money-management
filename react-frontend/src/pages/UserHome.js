import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const UserHome = () => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <div className="container1">
        <div className="brand">Octobar</div>
        <div className="rightFlex">
          <div className="search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="addIcon btn"> + </div>
        </div>
      </div>
      <div className="homePage">
        <div className="left">
          <Calendar className="calender" onChange={onChange} value={date} />
          {console.log(date)}
        </div>
        <div className="right">
          <h2>{date.toDateString()}</h2>
          <div className="info">
            <table>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>Buy a Mobile</td>
                <td>25400 tk</td>
                <td>
                  <button className="btn">Edit</button>{" "}
                  <button className="btn">Remove</button>
                </td>
              </tr>
              <tr>
                <td>Buy a Mobile and Treat Friends</td>
                <td>25400 tk</td>
                <td>
                  <button className="btn">Edit</button>{" "}
                  <button className="btn">Remove</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
