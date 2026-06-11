import { PageHeading } from "../components/ui/PageHeading";
import { dateText, initials, money } from "../utils/format";

export function LoansPage({ items, onAdd, onDelete, onPayment }) {
  const receive = items.filter(item => item.direction === "to_receive").reduce((sum, item) => sum + item.amount - item.paidAmount, 0);
  const pay = items.filter(item => item.direction === "to_pay").reduce((sum, item) => sum + item.amount - item.paidAmount, 0);
  return <><PageHeading eyebrow="Lending and borrowing" title="Loan manager" text="Track money you have lent or borrowed." onAction={onAdd} actionText="Add loan record" />
    <div className="mini-stats"><div><span>To receive</span><strong className="amount-positive">{money(receive)}</strong></div><div><span>To pay</span><strong className="amount-negative">{money(pay)}</strong></div><div><span>Active records</span><strong>{items.filter(item => item.status !== "paid").length}</strong></div></div>
    <div className="cards-grid">{items.map(item => { const remaining = item.amount - item.paidAmount; return <article className="manage-card udhar-manage-card" key={item._id}><div className="person-line"><div className="avatar large-avatar">{initials(item.person)}</div><div><h3>{item.person}</h3><p>{item.contact || "No contact added"}</p></div><span className={`status-pill ${item.status}`}>{item.status}</span></div><div className="udhar-amount"><span>{item.direction === "to_receive" ? "Amount to receive" : "Amount to repay"}</span><strong>{money(remaining)}</strong></div><div className="udhar-meta"><span>Due {dateText(item.dueDate)}</span><span>Paid {money(item.paidAmount)}</span></div><div className="card-actions">{remaining > 0 && <button className="soft-button" onClick={() => onPayment(item)}>Record payment</button>}<button className="danger-button" onClick={() => onDelete(item._id)}>Delete</button></div></article>; })}</div></>;
}
