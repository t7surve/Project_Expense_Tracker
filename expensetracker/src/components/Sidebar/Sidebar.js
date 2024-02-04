import React, { useState } from "react";
import "../Sidebar/sidebar.css";
import Dashboard from "../Dashboard/Dashboard";
import BudgetLayout from "../Budget/BudgetLayout";
import ExpenseLayout from "../Expenses/ExpenseLayout";
import ExpenseSummaryLayout from "../ExpenseSummary/ExpenseSummaryLayout";


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedContent: null };
  }

  handleItemClick = (content) => {
    this.setState({ selectedContent: content });
  };

  renderContent() {
    switch (this.state.selectedContent) {
      case "Home":
        return <Dashboard />;
      case "Manage Budget":
        return <BudgetLayout />;
      case "Manage Expenses":
        return <ExpenseLayout />;
      case "Expense Summary":
        return <ExpenseSummaryLayout />;
      default:
        return null;
    }
  }
  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/loginform";
  };
  render() {
    return (
      <div>
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>LOGO</h2>
          </div>
          <ul className="sidebar-list">
            <li onClick={() => this.handleItemClick("Home")}>
              <a href="/dashboard">Home</a>
            </li>
            <li onClick={() => this.handleItemClick("Budget")}>
              <a href="/budgetlayout">Manage Budget</a>
            </li>
            <li onClick={() => this.handleItemClick("Expenses")}>
              <a href="/ExpenseLayout">Manage Expenses</a>
            </li>
            <li onClick={() => this.handleItemClick("Expenses")}>
              <a href="/ExpenseSummary">Expense Summary</a>
            </li>
            <li onClick={() => this.handleLogout()}>Logout
            </li>
            {/* <li>
              <button onClick={() => this.handleLogout()}>Logout</button>
            </li> */}
          </ul>
        </div>
        <div className="content">{this.renderContent()}</div>
      </div>
    );
  }
}
export default Sidebar;
