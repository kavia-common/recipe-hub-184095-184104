import React from 'react';

// PUBLIC_INTERFACE
export default function Input({ label, id, ...props }) {
  /** Reusable input with optional label. */
  const input = <input id={id} className="input" {...props} />;
  if (!label) return input;
  return (
    <label htmlFor={id} style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</span>
      {input}
    </label>
  );
}
