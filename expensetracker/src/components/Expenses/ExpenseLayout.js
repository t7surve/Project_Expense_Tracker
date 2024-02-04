import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ManageExpenses from "./ManageExpenses";

const ExpenseLayout = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <ManageExpenses />
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

export default ExpenseLayout;
