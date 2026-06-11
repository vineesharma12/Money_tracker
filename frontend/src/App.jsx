import { useEffect, useState } from "react";
import { clearStoredAuth, getStoredAuth } from "./api";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { FinanceModal } from "./components/forms/FinanceModal";
import { EmptyState, ErrorBanner, LoadingState } from "./components/ui/Feedback";
import { PageHeading } from "./components/ui/PageHeading";
import { useFinanceData } from "./hooks/useFinanceData";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { BudgetsPage } from "./pages/BudgetsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { LoansPage } from "./pages/LoansPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  const [auth, setAuth] = useState(getStoredAuth);
  const finance = useFinanceData(auth);
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const requireAuth = () => setAuth(null);
    window.addEventListener("money-tracker-auth-required", requireAuth);
    return () => window.removeEventListener("money-tracker-auth-required", requireAuth);
  }, []);

  const notify = message => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };
  const run = async (action, successMessage) => {
    try {
      await action();
      notify(successMessage);
      return true;
    } catch (error) {
      notify(error.message);
      return false;
    }
  };
  const saveModal = async data => {
    const actions = {
      transaction: () => finance.createTransaction(data),
      budget: () => finance.createBudget(data),
      loan: () => finance.createLoan(data),
      payment: () => finance.addLoanPayment(modal.item, data)
    };
    const saved = await run(actions[modal.kind], "Saved successfully");
    if (saved) setModal(null);
  };
  const logout = () => {
    clearStoredAuth();
    setAuth(null);
    setModal(null);
    setActive("Dashboard");
  };

  if (!auth?.token) return <LoginPage onLogin={setAuth} />;

  const pages = {
    Dashboard: <DashboardPage {...finance} onNavigate={setActive} />,
    Transactions: <TransactionsPage title="All transactions" transactions={finance.transactions} onAdd={() => setModal({ kind: "transaction" })} onDelete={id => run(() => finance.deleteTransaction(id), "Transaction deleted")} />,
    Income: <TransactionsPage title="Income" type="income" transactions={finance.transactions} onAdd={() => setModal({ kind: "transaction" })} onDelete={id => run(() => finance.deleteTransaction(id), "Income deleted")} />,
    Expenses: <TransactionsPage title="Expenses" type="expense" transactions={finance.transactions} onAdd={() => setModal({ kind: "transaction" })} onDelete={id => run(() => finance.deleteTransaction(id), "Expense deleted")} />,
    Budgets: <BudgetsPage budgets={finance.budgets} onAdd={() => setModal({ kind: "budget" })} onDelete={id => run(() => finance.deleteBudget(id), "Budget deleted")} />,
    Loans: <LoansPage items={finance.udhar} onAdd={() => setModal({ kind: "loan" })} onDelete={id => run(() => finance.deleteLoan(id), "Loan record deleted")} onPayment={item => setModal({ kind: "payment", item })} />,
    Analytics: <AnalyticsPage totals={finance.totals} transactions={finance.transactions} />,
    Recurring: <><PageHeading eyebrow="Automation" title="Recurring transactions" text="Subscriptions, rent, EMIs, and recurring income in one place." /><EmptyState title="No recurring transactions yet" text="Recurring transaction API support can be added as the next module." /></>
  };

  return <div className="app-shell">
    <Sidebar active={active} onNavigate={setActive} open={menuOpen} onClose={() => setMenuOpen(false)} />
    <main>
      <Header page={active} online={finance.online} user={auth.user} onMenu={() => setMenuOpen(true)} onAdd={() => setModal({ kind: "transaction" })} onLogout={logout} />
      <section className="content">
        <ErrorBanner message={finance.error} onRetry={finance.reload} />
        {finance.loading ? <LoadingState /> : pages[active]}
      </section>
    </main>
    <FinanceModal modal={modal} onClose={() => setModal(null)} onSave={saveModal} />
    <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
  </div>;
}
