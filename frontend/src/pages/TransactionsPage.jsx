import { useMemo, useState } from "react";
import { PageHeading } from "../components/ui/PageHeading";
import { TransactionTable } from "../components/transactions/TransactionTable";

export function TransactionsPage({ title, type, transactions, onAdd, onDelete }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...new Set(transactions.filter(item => !type || item.type === type).map(item => item.category))], [transactions, type]);
  const visible = transactions.filter(item => (!type || item.type === type) && (category === "All" || item.category === category) && `${item.description} ${item.category} ${item.method}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeading eyebrow="Money activity" title={title} text={`Review and manage all your ${title.toLowerCase()}.`} onAction={onAdd} actionText={`Add ${type || "transaction"}`} />
    <div className="toolbar"><input className="search-input" placeholder="Search transactions..." value={query} onChange={event => setQuery(event.target.value)} /><select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select><span className="results-count">{visible.length} records</span></div>
    <TransactionTable items={visible} onDelete={onDelete} /></>;
}
