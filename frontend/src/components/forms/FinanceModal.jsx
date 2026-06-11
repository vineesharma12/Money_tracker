import { useState } from "react";
import { CategoryIcon, expenseCategories, incomeCategories } from "../../config/categories";

export function FinanceModal({ modal, onClose, onSave }) {
  const [type, setType] = useState("expense");
  if (!modal) return null;
  const { kind, item } = modal;
  const submit = event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    ["amount", "limit", "spent"].forEach(key => { if (data[key] !== undefined) data[key] = Number(data[key]); });
    onSave(kind === "transaction" ? { ...data, type } : data);
  };
  return <div className="modal-backdrop open" onMouseDown={event => event.target === event.currentTarget && onClose()}><form className="modal" onSubmit={submit}>
    <div className="modal-header"><div><h2>{kind === "payment" ? "Record payment" : `Add ${kind}`}</h2><p>{kind === "payment" ? `Payment for ${item.person}` : "Enter the details below"}</p></div><button type="button" className="close-modal" onClick={onClose}>x</button></div>
    {kind === "transaction" && <><div className="type-switch"><button type="button" className={type === "expense" ? "active" : ""} onClick={() => setType("expense")}>Expense</button><button type="button" className={type === "income" ? "active" : ""} onClick={() => setType("income")}>Income</button></div><label>Amount<span className="amount-input"><b>Rs</b><input name="amount" type="number" min="1" required /></span></label><label>Category<div className="category-picker">{(type === "expense" ? expenseCategories : incomeCategories).map((category, index) => <label className="category-option" key={category.name}><input type="radio" name="category" value={category.name} defaultChecked={index === 0} /><span><CategoryIcon name={category.name} /><small>{category.name}</small></span></label>)}</div></label><div className="form-grid"><label>Description<input name="description" required /></label><label>Date<input name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required /></label><label>Payment method<select name="method"><option>UPI</option><option>Credit card</option><option>Bank account</option><option>Cash</option></select></label></div><label>Notes<textarea name="notes" rows="3" /></label></>}
    {kind === "budget" && <><label>Budget name<input name="name" required /></label><div className="form-grid"><label>Monthly limit<input name="limit" type="number" min="1" required /></label><label>Already spent<input name="spent" type="number" min="0" defaultValue="0" /></label><label>Month<input name="month" type="month" defaultValue="2026-06" required /></label><label>Color<input name="color" type="color" defaultValue="#0d8b61" /></label></div></>}
    {kind === "loan" && <div className="form-grid"><label>Person name<input name="person" required /></label><label>Contact<input name="contact" /></label><label>Total amount<input name="amount" type="number" min="1" required /></label><label>Due date<input name="dueDate" type="date" required /></label><label>Type<select name="direction"><option value="to_receive">Money lent</option><option value="to_pay">Money borrowed</option></select></label><label>Status<select name="status"><option>pending</option><option>overdue</option><option>paid</option></select></label></div>}
    {kind === "payment" && <><label>Payment amount<input name="amount" type="number" min="1" max={item.amount - item.paidAmount} required /></label><label>Date<input name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required /></label><label>Note<input name="note" /></label></>}
    <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button">Save</button></div>
  </form></div>;
}
