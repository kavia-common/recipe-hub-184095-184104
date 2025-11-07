import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import RecipeGrid from '../components/RecipeGrid';

// PUBLIC_INTERFACE
export default function Search() {
  /** Search page with input and placeholder grid results. */
  const [q, setQ] = useState('');
  const results = q
    ? [
        { id: 101, title: `Result for "${q}" 1`, description: 'Tasty and simple.' },
        { id: 102, title: `Result for "${q}" 2`, description: 'Healthy option.' },
      ]
    : [];

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Search Recipes</h1>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
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

      {q && <RecipeGrid items={results} />}
      {!q && <p style={{ color: 'var(--muted)' }}>Type a query to see results.</p>}
    </div>
  );
}
