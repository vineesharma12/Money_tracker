import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { fallbackBudgets, fallbackTransactions, fallbackUdhar } from "../data/fallback";

const demoId = () => crypto.randomUUID();
const isDemoId = id => /^(demo-|b\d|u\d)/.test(String(id));

export function useFinanceData(auth) {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [udhar, setUdhar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [health, transactionData, budgetData, udharData] = await Promise.all([
        api.health(), api.getTransactions(), api.getBudgets(), api.getLoans()
      ]);
      setOnline(health.database === "connected");
      setTransactions(transactionData);
      setBudgets(budgetData);
      setUdhar(udharData);
    } catch (requestError) {
      setOnline(false);
      setError(requestError.message === "Please login to continue" ? "" : "Backend or MongoDB is unavailable. Changes are running in demo mode.");
      setTransactions(fallbackTransactions);
      setBudgets(fallbackBudgets);
      setUdhar(fallbackUdhar);
    } finally {
      setLoading(false);
    }
  }, [auth?.token]);

  useEffect(() => {
    if (auth?.token) load();
  }, [auth?.token, load]);

  const totals = useMemo(() => {
    const income = transactions.filter(item => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
    const expenses = transactions.filter(item => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
    return { income, expenses, savings: income - expenses };
  }, [transactions]);

  const createTransaction = async data => {
    const created = online ? await api.addTransaction(data) : { ...data, _id: demoId() };
    setTransactions(current => [created, ...current]);
    return created;
  };
  const deleteTransaction = async id => {
    if (online && !isDemoId(id)) await api.deleteTransaction(id);
    setTransactions(current => current.filter(item => item._id !== id));
  };
  const createBudget = async data => {
    const created = online ? await api.addBudget(data) : { ...data, _id: demoId() };
    setBudgets(current => [created, ...current]);
    return created;
  };
  const deleteBudget = async id => {
    if (online && !isDemoId(id)) await api.deleteBudget(id);
    setBudgets(current => current.filter(item => item._id !== id));
  };
  const createLoan = async data => {
    const payload = { ...data, paidAmount: 0 };
    const created = online ? await api.addLoan(payload) : { ...payload, _id: demoId() };
    setUdhar(current => [created, ...current]);
    return created;
  };
  const deleteLoan = async id => {
    if (online && !isDemoId(id)) await api.deleteLoan(id);
    setUdhar(current => current.filter(item => item._id !== id));
  };
  const addLoanPayment = async (item, payment) => {
    const updated = online && !isDemoId(item._id)
      ? await api.addLoanPayment(item._id, payment)
      : { ...item, paidAmount: item.paidAmount + payment.amount, status: item.paidAmount + payment.amount >= item.amount ? "paid" : item.status };
    setUdhar(current => current.map(entry => entry._id === updated._id ? updated : entry));
    return updated;
  };

  return {
    transactions, budgets, udhar, totals, loading, online, error, reload: load,
    createTransaction, deleteTransaction, createBudget, deleteBudget,
    createLoan, deleteLoan, addLoanPayment
  };
}
