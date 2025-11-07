import React from 'react';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid({ items, emptyContent }) {
  /** Responsive grid to render a list of recipes with optional custom empty content. */
  if (!items || items.length === 0) {
    return emptyContent || <p style={{ color: 'var(--muted)' }}>No recipes found.</p>;
  }
  return (
    <section className="grid" aria-label="Recipes">
      {items.map((r) => (
        <div key={r.id} className="grid-item-3">
          <RecipeCard recipe={r} />
        </div>
      ))}
    </section>
  );
}
