export const fallbackTransactions = [
  { _id: "demo-1", description: "Monthly salary", category: "Salary", method: "Bank account", date: "2026-06-08", amount: 75000, type: "income" },
  { _id: "demo-2", description: "Fresh Basket", category: "Food", method: "UPI", date: "2026-06-08", amount: 1280, type: "expense" },
  { _id: "demo-3", description: "Urban Company", category: "Bills", method: "Credit card", date: "2026-06-07", amount: 849, type: "expense" },
  { _id: "demo-4", description: "Freelance project", category: "Freelance", method: "Bank account", date: "2026-06-05", amount: 10000, type: "income" }
];

export const fallbackBudgets = [
  { _id: "b1", name: "Food & dining", spent: 9420, limit: 12000, month: "2026-06", color: "#ef8d53" },
  { _id: "b2", name: "Travel", spent: 6800, limit: 8000, month: "2026-06", color: "#e5b557" },
  { _id: "b3", name: "Shopping", spent: 4850, limit: 10000, month: "2026-06", color: "#806fe3" },
  { _id: "b4", name: "Bills & utilities", spent: 3550, limit: 6500, month: "2026-06", color: "#5795d7" }
];

export const fallbackUdhar = [
  { _id: "u1", person: "Rohan Mehta", contact: "98765 43210", dueDate: "2026-06-10", amount: 3500, paidAmount: 0, direction: "to_receive", status: "pending" },
  { _id: "u2", person: "Priya Singh", contact: "99887 76655", dueDate: "2026-06-06", amount: 2100, paidAmount: 0, direction: "to_receive", status: "overdue" },
  { _id: "u3", person: "Amit Kumar", contact: "91234 56789", dueDate: "2026-06-18", amount: 4100, paidAmount: 0, direction: "to_pay", status: "pending" }
];
