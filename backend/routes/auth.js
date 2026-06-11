import { Router } from "express";
import User from "../models/User.js";
import { createToken, hashPassword, verifyPassword } from "../services/auth.js";

const router = Router();

const authResponse = user => ({
  token: createToken(user),
  user: { id: user._id, name: user.name, email: user.email }
});

router.post("/register", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!name || !email || password.length < 6) {
      return res.status(400).json({ message: "Name, valid email, and 6+ character password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const { passwordHash, passwordSalt } = hashPassword(password);
    const user = await User.create({ name, email, passwordHash, passwordSalt });
    res.status(201).json(authResponse(user));
  } catch (error) { next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json(authResponse(user));
  } catch (error) { next(error); }
});

export default router;
