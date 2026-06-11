import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true, trim: true },
  limit: { type: Number, required: true, min: 0 },
  spent: { type: Number, default: 0, min: 0 },
  month: { type: String, required: true },
  color: { type: String, default: "#0d8b61" }
}, { timestamps: true });

export default mongoose.model("Budget", budgetSchema);
