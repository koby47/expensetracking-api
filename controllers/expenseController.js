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

export const updateExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Ensure it belongs to the user
      { amount, category, date }, 
      { new: true } // Return the updated document
    );

    if (!updatedExpense) return res.status(404).json({ error: "Expense not found" });

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Server error while updating expense" });
  }
};


export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.id });

    if (!expense) return res.status(404).json({ error: "Expense not found" });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching expense" });
  }
};


export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
};

export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  expense ? res.json({ message: "Expense deleted" }) : res.status(404).json({ error: "Expense not found" });
};
