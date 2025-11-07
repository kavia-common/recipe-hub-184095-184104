import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import RecipeGrid from '../components/RecipeGrid';
import { useRecipes } from '../contexts/RecipesContext';

// PUBLIC_INTERFACE
export default function Search() {
  /** Search page with input bound to RecipesContext. */
  const { recipes, search, loading, error } = useRecipes();
  const [q, setQ] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await search(q);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Search Recipes</h1>
      </div>
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', gap: 12, marginBottom: 16 }}
        role="search"
        aria-label="Recipe search"
      >
        <Input
          id="search"
          type="search"
          placeholder="Search by ingredient, cuisine, or title..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search recipes"
        />
        <Button type="submit">Search</Button>
      </form>

      {loading && <p style={{ color: 'var(--muted)' }}>Searching...</p>}
      {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
      {!loading && !error && q && <RecipeGrid items={recipes} />}
      {!q && !loading && <p style={{ color: 'var(--muted)' }}>Type a query to see results.</p>}
    </div>
  );
}
