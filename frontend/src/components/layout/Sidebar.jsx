const groups = [
  ["Overview", ["Dashboard", "Transactions"]],
  ["Money", ["Income", "Expenses", "Budgets", "Loans"]],
  ["Insights", ["Analytics", "Recurring"]]
];

export function Sidebar({ active, onNavigate, open, onClose }) {
  return <aside className={`sidebar ${open ? "open" : ""}`}>
    <button className="brand brand-button" onClick={() => onNavigate("Dashboard")}><span className="brand-mark">K</span><span>Khata<span>Flow</span></span></button>
    <nav className="main-nav">{groups.map(([label, items]) => <div key={label}>
      <p className="nav-label">{label}</p>
      {items.map(item => <button key={item} className={`nav-item ${active === item ? "active" : ""}`} onClick={() => { onNavigate(item); onClose(); }}>
        <span className="nav-icon">{item[0]}</span>{item}{item === "Budgets" && <span className="nav-badge">4</span>}
      </button>)}
    </div>)}</nav>
    <div className="sidebar-bottom">
      <div className="upgrade-card"><span className="sparkle">+</span><strong>Financial health: Good</strong><p>Keep tracking your money to unlock better insights.</p><button onClick={() => onNavigate("Analytics")}>View insights</button></div>
      <button className="nav-item"><span className="nav-icon">S</span> Settings</button>
      <div className="profile-mini"><div className="avatar">AS</div><div><strong>Arjun Sharma</strong><small>Personal account</small></div></div>
    </div>
  </aside>;
}
