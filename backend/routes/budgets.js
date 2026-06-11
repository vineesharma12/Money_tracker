import { Router } from "express";
import Budget from "../models/Budget.js";

const router = Router();
router.get("/", async (req, res, next) => { try { res.json(await Budget.find({ userId: req.userId }).sort({ createdAt: -1 })); } catch (error) { next(error); } });
router.post("/", async (req, res, next) => { try { res.status(201).json(await Budget.create({ ...req.body, userId: req.userId })); } catch (error) { next(error); } });
router.put("/:id", async (req, res, next) => { try { res.json(await Budget.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true, runValidators: true })); } catch (error) { next(error); } });
router.delete("/:id", async (req, res, next) => { try { await Budget.findOneAndDelete({ _id: req.params.id, userId: req.userId }); res.status(204).end(); } catch (error) { next(error); } });
export default router;
