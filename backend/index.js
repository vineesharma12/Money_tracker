import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactions.js";
import budgetRoutes from "./routes/budgets.js";
import loanRoutes from "./routes/loans.js";
import authRoutes from "./routes/auth.js";
import { connectDatabase, databaseStatus } from "./config/database.js";
import { currentUser } from "./middleware/currentUser.js";
import { verifyToken } from "./services/auth.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(currentDirectory, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use((req, _res, next) => {
  req.verifyAuthToken = verifyToken;
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api", currentUser);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: databaseStatus() });
});
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/loans", loanRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Internal server error" });
});

async function start() {
  try {
    await connectDatabase();
  } catch (error) {
    console.warn(`MongoDB unavailable: ${error.message}`);
  }
  app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
}

start();
