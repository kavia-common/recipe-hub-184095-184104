import React, { useEffect, useMemo, useState } from 'react';
import Input from '../Input';
import Button from '../Button';

/**
 * FilterPanel renders search and future filter controls.
 * - Collapsible on mobile, expanded on desktop.
 * - Calls onChange with { q } when inputs change (debounced handled by page).
 */
// PUBLIC_INTERFACE
export default function FilterPanel({ initial = {}, onChange, collapsible = true, title = 'Filters' }) {
  /** Filter panel with search input; supports mobile collapse. */
  const [open, setOpen] = useState(!collapsible); // default open on desktop if collapsible=false
  const [q, setQ] = useState(initial.q || '');

  // Expand by default on larger screens
  useEffect(() => {
    if (!collapsible) return;
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setOpen(true);
      }
    };
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [collapsible]);

  useEffect(() => {
    if (typeof initial.q === 'string') setQ(initial.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial.q]);

  const submitDisabled = useMemo(() => false, []);

  const handleApply = (e) => {
    e?.preventDefault?.();
    onChange?.({ q });
  };

  const handleClear = () => {
    setQ('');
    onChange?.({ q: '' });
  };

  return (
    <aside className="card" aria-label="Filter panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h2 style={{ fontSize: 16, margin: 0 }}>{title}</h2>
        {collapsible && (
          <button
            className="btn secondary"
            aria-expanded={open}
            aria-controls="filters-content"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      <div id="filters-content" style={{ display: open ? 'grid' : 'none', gap: 12 }}>
        <form onSubmit={handleApply} style={{ display: 'grid', gap: 12 }}>
          <Input
            id="filter-q"
            label="Search"
            type="search"
            placeholder="Search recipes..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="submit" disabled={submitDisabled}>Apply</Button>
            <Button type="button" variant="secondary" onClick={handleClear}>Clear</Button>
          </div>
        </form>
      </div>
    </aside>
  );
}
