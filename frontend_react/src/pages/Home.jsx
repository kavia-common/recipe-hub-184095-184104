import React, { useEffect, useMemo, useRef, useState } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { useRecipes } from '../contexts/RecipesContext';
import FilterPanel from '../components/Filters/FilterPanel';
import { useSearchParams } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page with filters and debounced search bound to RecipesContext. */
  const { recipes, loading, error, filters, search } = useRecipes();
  const [params, setParams] = useSearchParams();
  const initialQ = useMemo(() => params.get('q') || '', [params]);
  const [q, setQ] = useState(initialQ);
  const debounceRef = useRef();

  // Sync query from URL to local state on first load
  useEffect(() => {
    setQ(initialQ);
    // trigger search immediately if URL had q
    if (initialQ) search(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Debounce searching on q changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // update URL
      const next = new URLSearchParams(params);
      if (q) next.set('q', q);
      else next.delete('q');
      setParams(next, { replace: true });
      // trigger search
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
        <h1 className="page-title">Featured Recipes</h1>
      </div>

      <div className="grid" style={{ alignItems: 'start' }}>
        <div className="grid-item-3" style={{ gridColumn: 'span 12' }}>
          {/* On mobile, place filters above. We'll constrain width via styles within. */}
          <FilterPanel initial={{ q }} onChange={handleFiltersChange} collapsible title="Search & Filters" />
        </div>
        <div className="grid-item-3" style={{ gridColumn: 'span 12' }}>
          {loading && <p className="text-muted" role="status">Loading...</p>}
          {error && <p className="text-error" role="alert">{error}</p>}
          {!loading && !error && <RecipeGrid items={recipes} />}
        </div>
      </div>
    </div>
  );
}
