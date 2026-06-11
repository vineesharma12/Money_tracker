const API_URL = import.meta.env.VITE_API_URL || "/api";
const AUTH_KEY = "money-tracker-auth";

export const getStoredAuth = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const setStoredAuth = auth => localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
export const clearStoredAuth = () => localStorage.removeItem(AUTH_KEY);

const request = async (path, options = {}) => {
  const auth = getStoredAuth();
  const { headers, ...rest } = options;
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
      ...headers
    },
    signal: AbortSignal.timeout(10000),
    ...rest
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    if (response.status === 401) {
      clearStoredAuth();
      window.dispatchEvent(new Event("money-tracker-auth-required"));
    }
    throw new Error(data.message || "API request failed");
  }
  return response.status === 204 ? null : response.json();
};

export const api = {
  login: credentials => request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  register: user => request("/auth/register", { method: "POST", body: JSON.stringify(user) }),
  getTransactions: search => request(`/transactions${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  addTransaction: transaction => request("/transactions", { method: "POST", body: JSON.stringify(transaction) }),
  updateTransaction: (id, transaction) => request(`/transactions/${id}`, { method: "PUT", body: JSON.stringify(transaction) }),
  deleteTransaction: id => request(`/transactions/${id}`, { method: "DELETE" }),
  getBudgets: () => request("/budgets"),
  addBudget: budget => request("/budgets", { method: "POST", body: JSON.stringify(budget) }),
  updateBudget: (id, budget) => request(`/budgets/${id}`, { method: "PUT", body: JSON.stringify(budget) }),
  deleteBudget: id => request(`/budgets/${id}`, { method: "DELETE" }),
  getLoans: () => request("/loans"),
  addLoan: item => request("/loans", { method: "POST", body: JSON.stringify(item) }),
  updateLoan: (id, item) => request(`/loans/${id}`, { method: "PUT", body: JSON.stringify(item) }),
  deleteLoan: id => request(`/loans/${id}`, { method: "DELETE" }),
  addLoanPayment: (id, payment) => request(`/loans/${id}/payments`, { method: "POST", body: JSON.stringify(payment) }),
  health: () => request("/health")
};
