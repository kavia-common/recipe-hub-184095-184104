import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function EmptyState({ title, description, actionLabel, to = '/', actionAriaLabel }) {
  /** Minimal, accessible empty state with CTA aligned to Ocean theme. */
  return (
    <section
      className="card"
      role="status"
      aria-live="polite"
      style={{
        display: 'grid',
        gap: 10,
        alignItems: 'start',
      }}
    >
      <h2 style={{ fontSize: 18, margin: 0 }}>{title}</h2>
      {description ? <p style={{ color: 'var(--muted)', margin: 0 }}>{description}</p> : null}
      {actionLabel ? (
        <div>
          <Link
            className="btn"
            to={to}
            aria-label={actionAriaLabel || actionLabel}
          >
            {actionLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
