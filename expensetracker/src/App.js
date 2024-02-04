//import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import RegisterForm from "./components/User-Register-Login/Register";
import LoginForm from "./components/User-Register-Login/Login";
import HomePage from "./components/Navbar/HomePage";
import BudgetLayout from "./components/Budget/BudgetLayout";
import ExpenseLayout from "./components/Expenses/ExpenseLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import ExpenseSummaryLayout from "./components/ExpenseSummary/ExpenseSummaryLayout";
// import ExpenseList from "./components/SearchFilter/ExpenseList";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/registerform" element={<RegisterForm />}></Route>
        <Route path="/loginform" element={<LoginForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/budgetlayout" element={<BudgetLayout />}></Route>
        <Route path="/ExpenseLayout" element={<ExpenseLayout />}></Route>
        <Route
          path="/ExpenseSummary"
          element={<ExpenseSummaryLayout />}
        ></Route>
        {/* <Route path="/ExpenseFilter" element={<ExpenseList />}></Route> */}
      </Routes>
    </Router>
  );
};

export default App;
