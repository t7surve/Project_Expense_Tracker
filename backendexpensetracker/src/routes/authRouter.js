import { Router } from "express";
import { generateToken } from "../middleware/authMiddleware.js";
import authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", authController.login,verifyToken);
router.post("/register", authController.registerUser);

export default router;
