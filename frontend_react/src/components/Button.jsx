import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ children, variant = 'primary', ...props }) {
  /** Reusable button with primary/secondary variant. */
  const className = `btn ${variant === 'secondary' ? 'secondary' : ''}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
