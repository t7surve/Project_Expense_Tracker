import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Bar, } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ExpenseSummary = () => {
  const [totalsummary, setTotalSummary] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //const [buttonClicked, setButtonClicked] = useState(false);
  const gettoken = localStorage.getItem("accessToken");
  const getUserId = localStorage.getItem("user");

  // useEffect(() => {
  //   if (buttonClicked) {
  //     fetchExpense();
  //   }
  // }, [startDate, endDate, gettoken, getUserId]);

  const handleButtonClick = () => {
    // setButtonClicked(true);
    fetchExpense();
  };

  const fetchExpense = () => {
    const url = `http://localhost:8080/api/expense/calculate/${getUserId}`;
    axios
      .get(url, {
        params: {
          startDate,
          endDate,
        },
        headers: { Authorization: `Bearer ${gettoken}` },
      })
      .then((result) => setTotalSummary(result.data.totalsummary || []))
      .catch((error) => console.error("Error fetching expenses:", error));
  };
   
  const totalExpense =
    totalsummary.length > 0 ? totalsummary[0].totalExpense : null;


    const totalSummaryData = {
      labels: ['Total Expense'],
      datasets: [
        {
          label: 'Total Summary',
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.6)',
          hoverBorderColor: 'rgba(75,192,192,1)',
          data: [totalExpense],
        },
      ],
    };

    

    const options = {
      scales: {
        y: { title: { display: true, text: 'Total Summary' } },
      },
    };
  

  return (
    <div>
      <h2>Expense Summary</h2>
      <Container>
        <Row>
          <Col>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="date"
              className="form-control"
              placeholder="Enter End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>
          <Col>
            <button className="btn btn-danger" onClick={handleButtonClick}>
              Add
            </button>
          </Col>
        </Row>
      </Container>
      <br />
      <div>
        <h3>Total Summary</h3>
        <Bar data={totalSummaryData} options={options} />
      </div>
      {/* <p>Total Expense Summary Amount: ${totalExpense}</p> */}
    </div>
  );
};

export default ExpenseSummary;
