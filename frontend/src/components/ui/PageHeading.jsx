export function PageHeading({ eyebrow, title, text, onAction, actionText }) {
  return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>{onAction && <button className="primary-button" onClick={onAction}>+ {actionText}</button>}</div>;
}
