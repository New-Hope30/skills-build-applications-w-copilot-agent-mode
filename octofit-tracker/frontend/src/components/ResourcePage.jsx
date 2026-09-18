export function ResourcePage({ eyebrow, title, description, children }) {
  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div>{children}</section>
}

export function ErrorState({ message }) {
  return <div className="state-box error-state">{message} Check that the API is running on port 8000.</div>
}

export function EmptyState({ label }) {
  return <div className="state-box">{label}</div>
}

