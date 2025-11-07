import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useBookmarks } from '../contexts/BookmarksContext';

// PUBLIC_INTERFACE
export default function RecipeDetail() {
  /** Recipe detail placeholder using route param, with bookmark toggle. */
  const { id } = useParams();
  const recipe = useMemo(
    () => ({
      id: Number(id),
      title: `Recipe #${id}`,
      description: 'Detailed view coming soon. This page will include ingredients, steps, and nutrition info.',
    }),
    [id]
  );

  const { toggle, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(recipe.id);

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">{recipe.title}</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => toggle(recipe)}>{bookmarked ? 'Remove Bookmark' : 'Bookmark'}</Button>
          <Button variant="secondary">Share</Button>
        </div>
      </div>
      <div className="card">
        <p style={{ color: 'var(--muted)' }}>
          {recipe.description}
        </p>
      </div>
    </div>
  );
}
