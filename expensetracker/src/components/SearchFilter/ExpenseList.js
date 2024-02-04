import React, { useEffect, useState } from "react";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseFilterLayout from "./ExpenseFilterLayout";

const ExpenseList = () => {
  const [filterParams,setFilterParams]=useState({});
  const handleFilterSubmit=(params)=>{
    setFilterParams(params);
  };
  return(
    <div>
      <ExpenseFilter onFilterChange={handleFilterSubmit}/>
      <ExpenseFilterLayout filterParams={filterParams}/>
    </div>
  )
}

export default ExpenseList;
