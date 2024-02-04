import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Welcome to the Expense Tracker Dashboard </h1>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    align: "left",
    height: "100%",
  },
  content: {
    padding: "20px",
    flex: 1,
    textalign: "right",
  },
};

export default Dashboard;
