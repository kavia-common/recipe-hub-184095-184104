import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useBookmarks } from '../contexts/BookmarksContext';
import { createRecipesApi } from '../api/recipes';
import IngredientList from '../components/Recipe/IngredientList';
import InstructionList from '../components/Recipe/InstructionList';

/**
 * RecipeDetail page:
 * - Loads a recipe by id using the Recipes API (mock or real depending on env).
 * - Shows loading and error states.
 * - Displays title, image (placeholder if absent), basic meta, ingredients, and instructions.
 * - Provides a bookmark toggle integrated with BookmarksContext.
 */
// PUBLIC_INTERFACE
export default function RecipeDetail() {
  /** Recipe detail page with data loading and Ocean theme styling. */
  const { id } = useParams();
  const apiRef = useRef(createRecipesApi());
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch by id
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRef.current.getById(id);
        if (mounted) setRecipe(data);
      } catch (e) {
        if (mounted) setError(e?.message || 'Failed to load recipe');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  // Derive safe fields with fallbacks
  const {
    title,
    description,
    imageUrl,
    ingredients = [],
    instructions = [],
    author = 'Anonymous',
    time = {},
    servings,
  } = recipe || {};

  const displayTitle = title || `Recipe #${id}`;
  const displayDesc =
    description || 'No description provided for this recipe.';
  const prep = time?.prep || null;
  const cook = time?.cook || null;
  const total = time?.total || null;

  const { toggle, isBookmarked } = useBookmarks();
  const recipeForBookmark = useMemo(
    () => ({
      id: recipe?.id ?? Number(id),
      title: displayTitle,
      description: displayDesc,
    }),
    [recipe?.id, id, displayTitle, displayDesc]
  );
  const bookmarked = isBookmarked(recipeForBookmark.id);

  if (loading) {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Loading...</h1>
        </div>
        <p style={{ color: 'var(--muted)' }}>Fetching recipe details.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Recipe</h1>
          <div />
        </div>
        <p style={{ color: 'var(--error)' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header with title and actions */}
      <div className="page-header">
        <h1 className="page-title">{displayTitle}</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button onClick={() => toggle(recipeForBookmark)}>
            {bookmarked ? 'Remove Bookmark' : 'Bookmark'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              // Simple share fallback
              const url = window.location.href;
              if (navigator.share) {
                navigator.share({ title: displayTitle, text: displayDesc, url }).catch(() => {});
              } else {
                navigator.clipboard?.writeText(url);
                alert('Link copied to clipboard.');
              }
            }}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Responsive layout: image/meta top, then ingredients/instructions */}
      <section
        className="card"
        style={{
          display: 'grid',
          gap: 16,
        }}
      >
        {/* Hero image */}
        <div
          style={{
            width: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
          }}
        >
          <div
            role="img"
            aria-label={imageUrl ? `${displayTitle} image` : 'Recipe placeholder image'}
            style={{
              width: '100%',
              paddingTop: '45%', // responsive ratio
              background:
                imageUrl
                  ? `center / cover no-repeat url(${imageUrl})`
                  : `linear-gradient(135deg, var(--surface), #e5e7eb)`,
            }}
          />
        </div>

        {/* Meta section */}
        <div
          style={{
            display: 'grid',
            gap: 8,
          }}
        >
          <p style={{ color: 'var(--muted)' }}>{displayDesc}</p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              color: 'var(--muted)',
              fontSize: 14,
            }}
          >
            <span>By {author}</span>
            {servings ? <span>• Servings: {servings}</span> : null}
            {prep ? <span>• Prep: {prep}</span> : null}
            {cook ? <span>• Cook: {cook}</span> : null}
            {total ? <span>• Total: {total}</span> : null}
          </div>
        </div>
      </section>

      {/* Two column on large screens */}
      <div
        className="grid"
        style={{
          alignItems: 'start',
          marginTop: 16,
        }}
      >
        <div className="grid-item-3" style={{ gridColumn: 'span 12' }}>
          <section className="card" aria-labelledby="ingredients-heading">
            <h2 id="ingredients-heading" style={{ fontSize: 18, marginBottom: 12 }}>
              Ingredients
            </h2>
            <IngredientList items={ingredients} />
          </section>
        </div>

        <div className="grid-item-3" style={{ gridColumn: 'span 12' }}>
          <section className="card" aria-labelledby="instructions-heading">
            <h2 id="instructions-heading" style={{ fontSize: 18, marginBottom: 12 }}>
              Instructions
            </h2>
            <InstructionList steps={instructions} />
          </section>
        </div>
      </div>
    </div>
  );
}
