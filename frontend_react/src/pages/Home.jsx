import React from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { useRecipes } from '../contexts/RecipesContext';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page with featured recipe grid from recipes store. */
  const { recipes, loading, error } = useRecipes();
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Featured Recipes</h1>
      </div>
      {loading && <p style={{ color: 'var(--muted)' }}>Loading...</p>}
      {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
      {!loading && !error && <RecipeGrid items={recipes} />}
    </div>
  );
}
