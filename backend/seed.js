import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";
import mongoose from "mongoose";
import Transaction from "./models/Transaction.js";
import Budget from "./models/Budget.js";
import Loan from "./models/Loan.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(currentDirectory, "../.env") });

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/khataflow";
const userId = "demo-user";

await mongoose.connect(uri);
await Promise.all([Transaction.deleteMany({ userId }), Budget.deleteMany({ userId }), Loan.deleteMany({ userId })]);

await Transaction.insertMany([
  { userId, description: "Monthly salary", category: "Salary", method: "Bank account", date: "2026-06-08", amount: 75000, type: "income" },
  { userId, description: "Fresh Basket", category: "Food", method: "UPI", date: "2026-06-08", amount: 1280, type: "expense" },
  { userId, description: "Urban Company", category: "Bills", method: "Credit card", date: "2026-06-07", amount: 849, type: "expense" },
  { userId, description: "Freelance project", category: "Freelance", method: "Bank account", date: "2026-06-05", amount: 10000, type: "income" }
]);
await Budget.insertMany([
  { userId, name: "Food & dining", spent: 9420, limit: 12000, month: "2026-06", color: "#ef8d53" },
  { userId, name: "Travel", spent: 6800, limit: 8000, month: "2026-06", color: "#e5b557" },
  { userId, name: "Shopping", spent: 4850, limit: 10000, month: "2026-06", color: "#806fe3" },
  { userId, name: "Bills & utilities", spent: 3550, limit: 6500, month: "2026-06", color: "#5795d7" }
]);
await Loan.insertMany([
  { userId, person: "Rohan Mehta", dueDate: "2026-06-10", amount: 3500, direction: "to_receive", status: "pending" },
  { userId, person: "Priya Singh", dueDate: "2026-06-06", amount: 2100, direction: "to_receive", status: "overdue" },
  { userId, person: "Amit Kumar", dueDate: "2026-06-18", amount: 4100, direction: "to_pay", status: "pending" }
]);

console.log("KhataFlow database seeded");
await mongoose.disconnect();
