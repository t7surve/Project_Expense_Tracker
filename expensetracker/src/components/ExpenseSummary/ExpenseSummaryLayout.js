import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ExpenseSummary from "./ExpenseSummary";

const ExpenseSummaryLayout = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <ExpenseSummary />
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

export default ExpenseSummaryLayout;
