import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /** Minimal placeholder card for recipe preview. */
  const { id, title, description } = recipe;
  return (
    <article className="card" aria-labelledby={`recipe-${id}-title`}>
      <h3 id={`recipe-${id}-title`} style={{ fontSize: 16, marginBottom: 6 }}>{title}</h3>
      <p style={{ color: 'var(--muted)', marginBottom: 12 }}>{description}</p>
      <Link className="btn" to={`/recipe/${id}`}>View Recipe</Link>
    </article>
  );
}
