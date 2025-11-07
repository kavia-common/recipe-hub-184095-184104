import React from 'react';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid({ items }) {
  /** Responsive grid to render a list of recipes. */
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
