import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ExpenseFilterLayout = ({filterParams}) => {
  const[filteredExpenses,setFilteredExpenses]=useState([]);
  useEffect(()=>{
    const fetchFilteredExpenses = async()=>{
      try{
        const response= await axios.get('/',{params:filterParams});
        setFilteredExpenses(response.data);
      }
      catch(error){
      toast.error(error);
      }
    };
    fetchFilteredExpenses();
  },[filterParams]);

  return(
      <div style={styles.content}>
    <ToastContainer/>
    <h2>Filtered Expenses</h2>
    <ul>
      {filteredExpenses.map((expense)=>{
        <li key={expense.id}>{expense.amount}-{expense.description}</li>
      })}
    </ul>
    </div>
  );
};

const styles = {
  content: {
    padding: "20px",
    flex: 1,
    align: "right",
  },
};


export default ExpenseFilterLayout;
