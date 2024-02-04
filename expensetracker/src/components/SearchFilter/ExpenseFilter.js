import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const ExpenseFilter = ({ onFilterChange }) => {
const[date,setDate]=useState('');
const[category,setCategory]=useState('');

  const handleFilterChange = (e) => {
    e.preventDefault();
    onFilterChange({date,category});
  };

  // const handleApplyFilter = () => {
  //   if (onFilterChange === "function") {
  //     onFilterChange(filter);
  //   }
  // };

  return (
    <form onSubmit={onFilterChange}>
    <div style={styles.container}>
      <Sidebar />
      <br/>
      <ToastContainer />
    <Container>
      <Row>
      <Col>
      <label>
        Date:
       <input type="text" value={date} onChange={(e)=>setDate(e.target.value)}/>
       </label>
      </Col>
      <Col>
      <label>
        Category:
       <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)}/>
       </label>
      </Col>
      </Row>
    </Container>
    <br/>
    <button type="submit">Filter</button>
    </div>
   </form>
  );
};

const styles = {
  container: {
    display: "flex",
    align: "left",
    height: "100%",
  },
};

export default ExpenseFilter;
