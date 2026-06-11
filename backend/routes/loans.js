import { Router } from "express";
import Loan from "../models/Loan.js";

const router = Router();
router.get("/", async (req, res, next) => { try { res.json(await Loan.find({ userId: req.userId }).sort({ dueDate: 1 })); } catch (error) { next(error); } });
router.post("/", async (req, res, next) => { try { res.status(201).json(await Loan.create({ ...req.body, userId: req.userId })); } catch (error) { next(error); } });
router.post("/:id/payments", async (req, res, next) => {
  try {
    const item = await Loan.findOne({ _id: req.params.id, userId: req.userId });
    item.payments.push(req.body);
    item.paidAmount += Number(req.body.amount);
    if (item.paidAmount >= item.amount) item.status = "paid";
    res.json(await item.save());
  } catch (error) { next(error); }
});
router.put("/:id", async (req, res, next) => { try { res.json(await Loan.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true, runValidators: true })); } catch (error) { next(error); } });
router.delete("/:id", async (req, res, next) => { try { await Loan.findOneAndDelete({ _id: req.params.id, userId: req.userId }); res.status(204).end(); } catch (error) { next(error); } });
export default router;
