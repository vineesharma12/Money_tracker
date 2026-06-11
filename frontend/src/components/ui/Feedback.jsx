export function LoadingState() {
  return <div className="empty-state-card"><span>...</span><h3>Loading your finances</h3><p>Fetching the latest data from the backend.</p></div>;
}

export function EmptyState({ title = "Nothing here yet", text = "Add your first record to get started." }) {
  return <div className="empty-state-card"><span>+</span><h3>{title}</h3><p>{text}</p></div>;
}

export function ErrorBanner({ message, onRetry }) {
  if (!message) return null;
  return <div className="error-banner"><span>{message}</span><button onClick={onRetry}>Retry connection</button></div>;
}
