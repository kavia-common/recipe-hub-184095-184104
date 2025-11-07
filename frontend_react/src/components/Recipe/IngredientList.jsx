import React from 'react';

/**
 * IngredientList renders a simple checklist-style list of ingredients.
 * It is resilient to missing/invalid inputs by treating non-arrays as empty lists.
 */
// PUBLIC_INTERFACE
export default function IngredientList({ items }) {
  /** Render ingredients list with Ocean theme styling. */
  const list = Array.isArray(items) ? items : [];
  if (list.length === 0) {
    return <p style={{ color: 'var(--muted)' }}>No ingredients provided.</p>;
  }

  return (
    <ul
      aria-label="Ingredients"
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gap: 8,
      }}
    >
      {list.map((ing, idx) => (
        <li
          key={idx}
          className="card"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 12,
            borderRadius: '12px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--primary)',
              flex: '0 0 auto',
              opacity: 0.9,
            }}
          />
          <span style={{ color: 'var(--text)' }}>{ing}</span>
        </li>
      ))}
    </ul>
  );
}
