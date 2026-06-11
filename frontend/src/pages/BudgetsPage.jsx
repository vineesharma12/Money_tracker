import { BudgetRow } from "../components/budgets/BudgetRow";
import { PageHeading } from "../components/ui/PageHeading";
import { money } from "../utils/format";

export function BudgetsPage({ budgets, onAdd, onDelete }) {
  const total = budgets.reduce((sum, item) => sum + item.limit, 0);
  const spent = budgets.reduce((sum, item) => sum + item.spent, 0);
  return <><PageHeading eyebrow="Planning" title="Monthly budgets" text="Set limits and stay ahead of your spending." onAction={onAdd} actionText="Create budget" />
    <div className="summary-banner"><div><span>Total monthly budget</span><strong>{money(total)}</strong></div><div><span>Spent so far</span><strong>{money(spent)}</strong></div><div><span>Still available</span><strong>{money(total - spent)}</strong></div><div className="summary-progress"><div className="progress"><span style={{ width: `${Math.min(spent / total * 100, 100)}%` }} /></div><small>{Math.round(spent / total * 100) || 0}% utilized</small></div></div>
    <div className="cards-grid">{budgets.map(item => <article className="manage-card" key={item._id}><div className="manage-card-top"><span className="category-icon large" style={{ background: item.color }}>{item.name[0]}</span><button className="danger-button" onClick={() => onDelete(item._id)}>Delete</button></div><h3>{item.name}</h3><p>{money(item.spent)} spent of {money(item.limit)}</p><BudgetRow item={item} /><div className="card-footer"><span>{money(Math.max(item.limit - item.spent, 0))} remaining</span><b>{Math.round(item.spent / item.limit * 100)}%</b></div></article>)}</div></>;
}
