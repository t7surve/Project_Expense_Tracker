import { Router } from "express";
import { createCategory,getAllCategory } from "../controllers/categorytypeController.js";

const router=Router();

//Creating Expense Category
router.post("/addcategory", createCategory);

//get All Expense Category
router.get("/getallcategory",getAllCategory);

export default router;