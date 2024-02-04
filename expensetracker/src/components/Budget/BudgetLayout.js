import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import CRUD from "./ManageBudget";

const BudgetLayout = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <CRUD />
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
    align: "right",
  },
};

export default BudgetLayout;
