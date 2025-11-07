import React, { useEffect, useMemo, useState } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { useBookmarks } from '../contexts/BookmarksContext';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Bookmarks() {
  /**
   * Bookmarks page:
   * - Lists bookmarked recipes.
   * - Fetches full details via API/cache for each bookmark.
   * - Allows removing bookmarks inline.
   * - Shows EmptyState with CTA to browse when none exist.
   */
  const { bookmarks, remove, getDetails } = useBookmarks();
  const [detailsMap, setDetailsMap] = useState({});
  const ids = useMemo(() => bookmarks.map((b) => b.id), [bookmarks]);

  useEffect(() => {
    let mounted = true;
    async function loadAll() {
      const entries = await Promise.all(
        ids.map(async (id) => {
          const data = await getDetails(id);
          return [id, data];
        })
      );
      if (mounted) {
        const map = Object.fromEntries(entries.filter(([_, v]) => Boolean(v)));
        setDetailsMap(map);
      }
    }
    if (ids.length > 0) loadAll();
    else setDetailsMap({});
    return () => {
      mounted = false;
    };
  }, [ids, getDetails]);

  const items = useMemo(() => {
    // Prefer detailed data; fallback to minimal bookmark
    return bookmarks.map((b) => detailsMap[b.id] || b);
  }, [bookmarks, detailsMap]);

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Bookmarks</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {bookmarks.length > 0 && (
            <Link className="btn secondary" to="/search">Browse more</Link>
          )}
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          description="Start exploring delicious recipes and save your favorites here."
          actionLabel="Browse recipes"
          to="/search"
          actionAriaLabel="Browse recipes to add bookmarks"
        />
      ) : (
        <section className="grid" aria-label="Bookmarked recipes">
          {items.map((r) => (
            <div key={r.id} className="grid-item-3">
              <article className="card" aria-labelledby={`bookmark-${r.id}-title`}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <h3 id={`bookmark-${r.id}-title`} style={{ fontSize: 16, marginBottom: 6 }}>
                    {r.title}
                  </h3>
                  <Button
                    variant="secondary"
                    aria-label={`Remove bookmark for ${r.title}`}
                    onClick={() => remove(r.id)}
                    title="Remove bookmark"
                  >
                    ✕
                  </Button>
                </div>
                <p style={{ color: 'var(--muted)', marginBottom: 12 }}>
                  {r.description || 'No description.'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Link className="btn" to={`/recipe/${r.id}`}>
                    View Recipe
                  </Link>
                  <Button variant="secondary" onClick={() => remove(r.id)}>
                    Remove
                  </Button>
                </div>
              </article>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
