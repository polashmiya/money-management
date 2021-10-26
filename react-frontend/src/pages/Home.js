import React from "react";
import video from "../videos/1stMoney.mp4";
const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to the Money Management System</h1>
      <h1>Please Login First!</h1>
      <video width="50%" height="400" loop={true} autoPlay={true} muted={true} controls>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
