import { Router } from "express";
import { createExpense,deleteExpense,updateExpense,calculateExpenseSummaryForUser,getAllExpense,getExpenseById,} from "../controllers/expenseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router=Router();

//Creating Expense Category
router.post("/addexpense",verifyToken, createExpense);

//Update Expense Category
router.put("/:id",verifyToken,updateExpense);

//Delete Expense Category
router.delete("/:id", verifyToken, deleteExpense);

//get All Expenses(Based on User Id)
router.get("/:id",verifyToken,getAllExpense);

//get Expense By Id
router.get("/getexpensebyid/:eid",verifyToken,getExpenseById)

//calculate total summary of expense of specified user
router.get("/calculate/:id",verifyToken,calculateExpenseSummaryForUser);


export default router;