import { EmptyState } from "../ui/Feedback";
import { dateText, money } from "../../utils/format";
import { CategoryIcon } from "../../config/categories";

export function TransactionTable({ items, onDelete, compact = false }) {
  if (!items.length) return <EmptyState title="No transactions found" text="Add a transaction or change your filters." />;
  if (compact) return <div className="transaction-list">{items.map(item => <div className={`transaction-row ${item.type}`} key={item._id}>
    <CategoryIcon name={item.category} />
    <div className="transaction-main"><strong>{item.description}</strong><small>{item.category} - {item.method}</small></div>
    <div className="transaction-amount"><strong>{item.type === "income" ? "+" : "-"}{money(item.amount)}</strong><small>{dateText(item.date)}</small></div>
  </div>)}</div>;
  return <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Transaction</th><th>Category</th><th>Date</th><th>Method</th><th>Amount</th><th /></tr></thead><tbody>{items.map(item =>
    <tr key={item._id}><td><div className="table-name"><CategoryIcon name={item.category} /><strong>{item.description}</strong></div></td><td><span className="category-chip">{item.category}</span></td><td>{dateText(item.date)}</td><td>{item.method}</td><td className={item.type === "income" ? "amount-positive" : "amount-negative"}>{item.type === "income" ? "+" : "-"}{money(item.amount)}</td><td><button className="danger-button" onClick={() => onDelete(item._id)}>Delete</button></td></tr>
  )}</tbody></table></div>;
}
