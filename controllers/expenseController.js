import Expense from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  console.log("User Making Request:", req.user); // Debugging

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: User not found" });
  }

  const { amount, category, date } = req.body;
  const expense = await Expense.create({ userId: req.user.id, amount, category, date });
  
  res.status(201).json(expense);
};


export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
};

export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  expense ? res.json({ message: "Expense deleted" }) : res.status(404).json({ error: "Expense not found" });
};
