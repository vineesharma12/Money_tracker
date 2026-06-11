import { BudgetRow } from "../components/budgets/BudgetRow";
import { TransactionTable } from "../components/transactions/TransactionTable";
import { money } from "../utils/format";

function StatCard({ kind, icon, label, value, detail }) {
  return <article className={`stat-card ${kind}-card`}><div className="stat-top"><span className="stat-icon">{icon}</span><span className={`trend ${kind === "expense" ? "negative" : "positive"}`}>{detail}</span></div><p>{label}</p><h3>{money(value)}</h3><div className="micro-bars">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div></article>;
}

export function DashboardPage({ totals, transactions, budgets, udhar, onNavigate }) {
  const outstanding = udhar.reduce((sum, item) => sum + item.amount - item.paidAmount, 0);
  return <><div className="period-row"><div><span className="eyebrow">Net balance</span><div className="balance-line"><h2>{money(totals.savings)}</h2><span className="positive-pill">Healthy</span></div></div><div className="period-control"><button>&lt;</button><strong>June 2026</strong><button>&gt;</button></div></div>
    <div className="stats-grid"><StatCard kind="income" icon="IN" label="Total income" value={totals.income} detail="+8.2%" /><StatCard kind="expense" icon="OUT" label="Total expenses" value={totals.expenses} detail="+4.1%" /><StatCard kind="savings" icon="SAVE" label="Total savings" value={totals.savings} detail="Current" /><StatCard kind="income" icon="L" label="Outstanding loans" value={outstanding} detail={`${udhar.length} active`} /></div>
    <div className="dashboard-grid"><article className="panel cashflow-panel"><div className="panel-header"><div><h3>Cash flow</h3><p>Income and expenses over six months</p></div><button className="text-button" onClick={() => onNavigate("Analytics")}>Full report</button></div><div className="chart-legend"><span className="income-dot" /> Income <span className="expense-dot" /> Expenses</div><div className="bar-chart">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => <div className="bar-group" key={month}><i className="bar-income" style={{ height: `${[68,74,63,82,71,88][index]}%` }} /><i className="bar-expense" style={{ height: `${[46,58,51,62,55,49][index]}%` }} /><span>{month}</span></div>)}</div></article>
      <article className="panel budget-panel"><div className="panel-header"><div><h3>Budget overview</h3><p>Monthly category limits</p></div><button className="text-button" onClick={() => onNavigate("Budgets")}>Manage</button></div>{budgets.slice(0, 4).map(item => <BudgetRow item={item} key={item._id} />)}</article>
      <article className="panel transactions-panel"><div className="panel-header"><div><h3>Recent transactions</h3><p>Your latest account activity</p></div><button className="text-button" onClick={() => onNavigate("Transactions")}>View all</button></div><TransactionTable compact items={transactions.slice(0, 5)} /></article>
      <article className="panel spending-panel"><div className="panel-header"><div><h3>Spending mix</h3><p>Where your money went</p></div></div><div className="donut-wrap"><div className="donut"><div><strong>{money(totals.expenses)}</strong><span>Total spent</span></div></div><div className="donut-legend"><p><i className="rent" /><span>Rent</span><b>42%</b></p><p><i className="food" /><span>Food</span><b>22%</b></p><p><i className="travel" /><span>Travel</span><b>16%</b></p><p><i className="other" /><span>Others</span><b>20%</b></p></div></div></article>
    </div></>;
}
