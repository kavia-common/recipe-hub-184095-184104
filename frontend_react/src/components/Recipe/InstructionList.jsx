import React from 'react';

/**
 * InstructionList renders a numbered list of instructions/steps.
 * Gracefully handles non-array inputs by showing an empty message.
 */
// PUBLIC_INTERFACE
export default function InstructionList({ steps }) {
  /** Render instructions list with Ocean theme styling. */
  const list = Array.isArray(steps) ? steps : [];
  if (list.length === 0) {
    return <p style={{ color: 'var(--muted)' }}>No instructions available.</p>;
  }

  return (
    <ol
      aria-label="Instructions"
      style={{
        padding: 0,
        margin: 0,
        display: 'grid',
        gap: 10,
        listStyle: 'none',
        counterReset: 'step-counter',
      }}
    >
      {list.map((step, idx) => (
        <li
          key={idx}
          className="card"
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            alignItems: 'start',
            gap: 12,
            padding: 12,
            borderRadius: '12px',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--primary)',
              fontWeight: 700,
            }}
          >
            {idx + 1}
          </div>
          <div style={{ color: 'var(--text)' }}>{step}</div>
        </li>
      ))}
    </ol>
  );
}
