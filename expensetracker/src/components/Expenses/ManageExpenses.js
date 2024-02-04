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

const ManageExpenses = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [budgets, setmonthlyBudget] = useState([]);

  const [editdate, setEditDate] = useState("");
  const [editamount, setEditAmount] = useState("");
  const [editdescription, setEditDescription] = useState("");
  const [editcategoryId, setEditCategoryId] = useState("");
  const [editID, setEditId] = useState("");

  // const [data, setData] = useState([]);
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

  useEffect(() => {
    fetchBudget();
  },[] );

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    try {
      axios
        .get(`http://localhost:8080/api/expense/${getUserId}`, {
          headers: { Authorization: `Bearer ${gettoken}` },
        })
        .then((result) => {
          setExpenses(result.data);
        });
    } catch (error) {
      toast.error("Error fetching Expense:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the expense") === true) {
      axios
        .delete(`http://localhost:8080/api/expense/${id}`, {
          headers: { Authorization: `Bearer ${gettoken}` },
        })
        .then((result) => {
          if (result.status === 200) {
            toast.success("Expense has been deleted");
            setTimeout(() => {
              getExpenses();
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = (id) => {
    const url = `http://localhost:8080/api/expense/${id}`;
    const data = {
      id: editID,
      date: editdate,
      amount: editamount,
      description: editdescription,
      category_id: editcategoryId,
    };

    axios
      .put(url, data, {
        headers: { Authorization: `Bearer ${gettoken}` },
      })
      .then((result) => {
        setExpenses((prevExpenses) => [...prevExpenses, result.data])
          setTimeout(() => {
            getExpenses();
          }, 2000);
        setShow(false);
        toast.success(result.data.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`http://localhost:8080/api/expense/getexpensebyid/${id}`, {
        headers: { Authorization: `Bearer ${gettoken}` },
      })
      .then((result) => {
        {
          setEditDate(result.data.date);
          setEditAmount(result.data.amount);
          setEditDescription(result.data.description);
          setEditCategoryId(result.data.category_id);
          setEditId(result.data.id);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    const selectedDate = new Date(date);
    setSelectedMonth(selectedDate.getMonth() + 1);
  }, [date]);

  const handleSave = () => {
    if (!date || !amount || !description || !categoryId) {
      toast.error("Please fill out all the fields.");
      return;
    }

    const url = "http://localhost:8080/api/expense/addexpense";
    const data = {
      date,
      amount,
      description,
      category_id: categoryId,
      uid: getUserId,
    };

    axios
      .post(url, data, { headers: { Authorization: `Bearer ${gettoken}` } })
      .then((result) => {
        setExpenses((prevExpenses) => [...prevExpenses, result.data])
          setTimeout(() => {
            getExpenses();
            toast.success(result.data.message);
          }, 1000);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
  };

  // const clear = () => {
  //   setDate("");
  //   setAmount("");
  //   setDescription("");
  //   setCategoryId("");
  // };

  return (
    <Fragment>
      <ToastContainer />
      <div>
        <h1 style={{ textAlign: "center" }}>Expense Tracker</h1>
      </div>
      <br />
      <Container>
        <Row>
          <Col>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          {/* <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Category Id"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </Col> */}
          <Col>
            <label>
              Select Category:
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select</option>
                {budgets.map((budgt) => (
                  <option key={budgt.id} value={budgt.id} className="form-control">
                    {/* {budgt.category_type_id} */}
                    {budgt.category_type.name}
                    {
                      budgt.month
                    }

                  </option>
                ))}
              </select>
            </label>
          </Col>
          <Col>
            <button className="btn btn-danger" onClick={handleSave}>
              Add
            </button>
          </Col>
        </Row>
      </Container>
      <br></br>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Book Id</th> */}
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.length > 0
            ? expenses.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {/* <td>{item.id}</td> */}
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{item.description}</td>
                    <td>{item.category?.category_type?.name}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Update
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify/Update Expenses </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Row> */}
          <Col>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Expense Date"
              value={editdate}
              onChange={(e) => setEditDate(e.target.value)}
            />
          </Col>
          <br />
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Expense Amount"
              value={editamount}
              onChange={(e) => setEditAmount(e.target.value)}
            />
          </Col>
          <br />
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Expense Description"
              value={editdescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </Col>
          <br />
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Category Id"
              value={editcategoryId}
              onChange={(e) => setEditCategoryId(e.target.value)}
            />
          </Col>
          <br />
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Expense Id"
              value={editID}
              onChange={(e) => setEditId(e.target.value)}
              readOnly
            />
          </Col>
          <br />
          {/* <Col>
            <button className="btn btn-primary">Edit</button>
          </Col> */}
          {/* </Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate(editID)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ManageExpenses;
