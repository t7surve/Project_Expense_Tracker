import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [budget, setBudget] = useState("");
  const [budgets, setmonthlyBudget] = useState();
  

  const [data, setData] = useState([]);
  const gettoken = localStorage.getItem("accessToken");
  const getUserId = localStorage.getItem("user");

  const fetchBudget = () => {
    try {
      axios
        .get(`http://localhost:8080/api/category/${getUserId}`, {
          headers: { Authorization: `Bearer ${gettoken}` },
        })
        .then((result) => {
          // setData(result.data);
          setmonthlyBudget(result.data);
        });
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  const fetchCategories = () => {
    try {
      axios
        .get("http://localhost:8080/api/categorytype/getallcategory")
        .then((result) => {
          // setData(result.data);
          setCategories(result.data);
        });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchBudget();
    fetchCategories();
  }, []);

  const handleSave = () => {
    if (!selectedCategory || !selectedMonth || !budget) {
      toast.error("Please fill out all the fields.");
      return;
    }
      const url = "http://localhost:8080/api/category/setmonthlybudget";
      const data = {
        category_type_id: selectedCategory,
        month: selectedMonth,
        budget: parseFloat(budget),
        user_id: getUserId,
      };

      axios
        .post(url, data, { headers: { Authorization: `Bearer ${gettoken}` } })
        .then((result) => {
          fetchBudget(result.data);
          clear();
          toast.success("Budget & Category has been set successfully");
          fetchCategories();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        }); 
  };

  const clear = () => {
    setCategories([]);
    setSelectedCategory("");
    setMonths("");
    setSelectedMonth("");
    setBudget("");
  };

  return (
    <Fragment>
      <ToastContainer />
      <div>
        <h1 style={{ textAlign: "center" }}>
          Set Monthly Budget For Different Expense Categories
        </h1>
      </div>
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <label>
              Select Category:
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </Col>
          <Col>
            <label>
              Select Month:
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </label>
          </Col>
          <Col>
            <label>
              Budget:
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </label>
          </Col>

          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Add
            </button>
          </Col>
        </Row>
      </Container>
      <br></br>

      <Table striped bordered hover style={{ margin: "0px 50px" }}>
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Category Id</th> */}
            <th>Category Name</th>
            <th>Month</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {budgets && budgets.length > 0
            ? budgets.map((item, index) => {
                return (
                  <tr key={item}>
                    <td>{index + 1}</td>
                    {/* <td>{item.id}</td> */}
                    <td>{item.category_type.name}</td>
                    <td>{item.month}</td>
                    <td>{item.budget}</td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
    </Fragment>
  );
};


export default CRUD;
