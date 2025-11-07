import React from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../contexts/BookmarksContext';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /** Recipe preview card with bookmark toggle. */
  const { id, title, description } = recipe;
  const { toggle, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(id);

  return (
    <article className="card" aria-labelledby={`recipe-${id}-title`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <h3 id={`recipe-${id}-title`} style={{ fontSize: 16, marginBottom: 6 }}>{title}</h3>
        <button
          className="btn secondary"
          aria-pressed={bookmarked}
          aria-label={bookmarked ? `Remove bookmark for ${title}` : `Add bookmark for ${title}`}
          onClick={() => toggle(recipe)}
          title={bookmarked ? 'Bookmarked' : 'Bookmark'}
        >
          {bookmarked ? '★' : '☆'}
        </button>
      </div>
      <p style={{ color: 'var(--muted)', marginBottom: 12 }}>{description}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link className="btn" to={`/recipe/${id}`} aria-label={`View recipe details for ${title}`}>View Recipe</Link>
        <button
          className="btn secondary"
          onClick={() => toggle(recipe)}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? `Remove bookmark for ${title}` : `Add bookmark for ${title}`}
        >
          {bookmarked ? 'Unbookmark' : 'Bookmark'}
        </button>
      </div>
    </article>
  );
}
