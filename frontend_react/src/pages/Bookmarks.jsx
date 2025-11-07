import React from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { useBookmarks } from '../contexts/BookmarksContext';

// PUBLIC_INTERFACE
export default function Bookmarks() {
  /** Bookmarks page showing saved recipes via context. */
  const { bookmarks } = useBookmarks();
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Bookmarks</h1>
      </div>
      {bookmarks.length > 0 ? (
        <RecipeGrid items={bookmarks} />
      ) : (
        <p style={{ color: 'var(--muted)' }}>No bookmarks yet.</p>
      )}
    </div>
  );
}
