import { Router } from "express";
import Transaction from "../models/Transaction.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const filter = { userId: req.userId };
    if (req.query.type) filter.type = req.query.type;
    if (req.query.search) filter.$or = ["description", "category", "method"].map(field => ({ [field]: { $regex: req.query.search, $options: "i" } }));
    res.json(await Transaction.find(filter).sort({ date: -1, createdAt: -1 }));
  } catch (error) { next(error); }
});

router.get("/summary", async (req, res, next) => {
  try {
    const totals = await Transaction.aggregate([{ $match: { userId: req.userId } }, { $group: { _id: "$type", total: { $sum: "$amount" } } }]);
    const income = totals.find(item => item._id === "income")?.total || 0;
    const expenses = totals.find(item => item._id === "expense")?.total || 0;
    res.json({ income, expenses, savings: income - expenses, balance: income - expenses });
  } catch (error) { next(error); }
});

router.post("/", async (req, res, next) => {
  try { res.status(201).json(await Transaction.create({ ...req.body, userId: req.userId })); } catch (error) { next(error); }
});
router.put("/:id", async (req, res, next) => {
  try { res.json(await Transaction.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true, runValidators: true })); } catch (error) { next(error); }
});
router.delete("/:id", async (req, res, next) => {
  try { await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.userId }); res.status(204).end(); } catch (error) { next(error); }
});

export default router;
