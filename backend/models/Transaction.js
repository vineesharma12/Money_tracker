import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  method: { type: String, default: "UPI" },
  date: { type: Date, required: true },
  notes: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
