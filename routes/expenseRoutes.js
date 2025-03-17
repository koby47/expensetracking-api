import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addExpense, getExpenses, deleteExpense, getExpenseById, updateExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.route("/")
  .post(protect, addExpense)
  .get(protect, getExpenses);

router.route("/:id")
  .get(protect, getExpenseById) // Get expense by ID
  .put(protect, updateExpense)  // Update expense by ID
  .delete(protect, deleteExpense);

export default router;
