import { Router } from "express";
import {categoryBudget,getAllBudget,getBudgetById} from "../controllers/categoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router=Router();

//Creating Expense Category
router.post("/setmonthlybudget",verifyToken, categoryBudget);

//get all Budget
router.get("/getallbudget",verifyToken,getAllBudget);

//get by Id
router.get("/:id",verifyToken,getBudgetById);

export default router;