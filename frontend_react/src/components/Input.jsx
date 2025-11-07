import React from 'react';

// PUBLIC_INTERFACE
export default function Input({ label, id, required, ...props }) {
  /** Reusable input with optional label. */
  const input = (
    <input
      id={id}
      className="input"
      aria-required={required ? 'true' : undefined}
      required={required}
      {...props}
    />
  );
  if (!label) return input;
  return (
    <label htmlFor={id} style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{label}{required ? ' *' : ''}</span>
      {input}
    </label>
  );
}
