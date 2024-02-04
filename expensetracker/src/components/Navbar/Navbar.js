import React from "react";
import "./navstyle.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <i className="fa-solid fa-font-awesome"></i>
        <a href="#">LOGO</a>
      </div>
      <div className="menu">
        <div className="menu-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <a href="/loginform">
          <button className="log-in">Log In</button>
        </a>
      </div>
      <div className="menu-btn">
        <i className="fa-solid fa-bars"></i>
      </div>
    </nav>
  );
};

export default Navbar;
