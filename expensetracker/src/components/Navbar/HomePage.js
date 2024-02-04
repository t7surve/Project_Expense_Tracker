import React from "react";
import "./navstyle.css";
import Navbar from "./Navbar";
import Footer from "../Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="bsect">
        <h1 className="htg">
          <span style={{ color: "red" }}>
            <b>EXPE</b>
          </span>
          <span style={{ color: "white" }}>
            <b>NSE</b>
          </span>
          <span style={{ color: "red" }}>
            <b>TRAC</b>
          </span>
          <span style={{ color: "white" }}>
            <b>KER</b>
          </span>{" "}
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
