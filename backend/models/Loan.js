import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  note: String
}, { _id: false });

const udharSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  person: { type: String, required: true, trim: true },
  contact: String,
  direction: { type: String, enum: ["to_receive", "to_pay"], required: true },
  amount: { type: Number, required: true, min: 0 },
  paidAmount: { type: Number, default: 0, min: 0 },
  dueDate: Date,
  status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" },
  payments: [paymentSchema],
  notes: String
}, { timestamps: true });

export default mongoose.model("Loan", udharSchema);
