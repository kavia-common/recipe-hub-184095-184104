import React, { useEffect, useMemo, useRef, useState } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { useRecipes } from '../contexts/RecipesContext';
import FilterPanel from '../components/Filters/FilterPanel';
import { useSearchParams } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Search() {
  /** Search page with debounced search, URL sync, and mobile-collapsible filters. */
  const { recipes, loading, error, search } = useRecipes();
  const [params, setParams] = useSearchParams();
  const initialQ = useMemo(() => params.get('q') || '', [params]);
  const [q, setQ] = useState(initialQ);
  const debounceRef = useRef();

  useEffect(() => {
    setQ(initialQ);
    if (initialQ) search(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (q) next.set('q', q);
      else next.delete('q');
      setParams(next, { replace: true });
      search(q);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [q, params, search, setParams]);

  const handleFiltersChange = (changed) => {
    if (typeof changed.q === 'string') setQ(changed.q);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Search Recipes</h1>
      </div>
      <div className="grid" style={{ alignItems: 'start' }}>
        <div className="grid-item-3" style={{ gridColumn: 'span 12' }}>
          <FilterPanel initial={{ q }} onChange={handleFiltersChange} collapsible title="Search & Filters" />
        </div>
        <div className="grid-item-3" style={{ gridColumn: 'span 12' }}>
          {loading && <p style={{ color: 'var(--muted)' }}>Searching...</p>}
          {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
          {!loading && !error && <RecipeGrid items={recipes} />}
        </div>
      </div>
    </div>
  );
}
