export function Header({ page, online, user, onMenu, onAdd, onLogout }) {
  return <header className="topbar">
    <button className="icon-button menu-toggle" onClick={onMenu}>=</button>
    <div className="welcome"><h1>{page}</h1><p>{online ? `Logged in as ${user?.name || user?.email}` : "Demo mode - connect MongoDB to persist changes"}</p></div>
    <div className="top-actions">
      <span className={`connection-pill ${online ? "online" : "offline"}`}>{online ? "Database live" : "Demo mode"}</span>
      <button className="icon-button" onClick={() => document.body.classList.toggle("dark")}>O</button>
      <button className="secondary-button" onClick={onLogout}>Logout</button>
      <button className="primary-button" onClick={onAdd}><span>+</span> Add transaction</button>
    </div>
  </header>;
}
