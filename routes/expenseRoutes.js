import express from "express";
import { addExpense, getExpenses, deleteExpense } from "../controllers/expenseController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addExpense) 
  .get(protect, getExpenses);

router.delete("/:id", protect, deleteExpense);

export default router;
