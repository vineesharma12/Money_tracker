import { money } from "../../utils/format";

export function BudgetRow({ item }) {
  const used = Math.round(item.spent / item.limit * 100);
  return <div className={`budget-row ${used > 80 ? "warning" : ""}`}><div className="budget-info"><span><i className="category-icon" style={{ background: item.color }}>{item.name[0]}</i>{item.name}</span><b>{money(item.spent)} <small>of {money(item.limit)}</small></b></div><div className="progress"><span style={{ width: `${Math.min(used, 100)}%` }} /></div></div>;
}
