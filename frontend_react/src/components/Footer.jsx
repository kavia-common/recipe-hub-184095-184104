import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Minimal footer with copyright. */
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        © {year} Recipe Hub · Crafted with minimalism
      </div>
    </footer>
  );
}
