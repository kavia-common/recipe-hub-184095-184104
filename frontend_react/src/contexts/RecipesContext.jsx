import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createRecipesApi } from '../api/recipes';

/**
 * RecipesContext manages recipes list, filters, loading and error states.
 * Backed by env-driven API (real or mock).
 */
const RecipesContext = createContext(undefined);

// PUBLIC_INTERFACE
export function RecipesProvider({ children }) {
  /** Provides recipes data, filters, and request states using the recipes API. */
  const apiRef = useRef(createRecipesApi());
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ q: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRef.current.list({ q: query });
      setRecipes(Array.isArray(data) ? data : []);
    } catch (e) {
      const message = e?.message || 'Failed to load recipes';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // initial load
    fetchRecipes('');
  }, [fetchRecipes]);

  const setQuery = useCallback((q) => {
    setFilters((prev) => ({ ...prev, q }));
  }, []);

  const search = useCallback((q) => {
    setQuery(q);
    return fetchRecipes(q);
  }, [fetchRecipes, setQuery]);

  const value = useMemo(
    () => ({ recipes, filters, setQuery, search, loading, error }),
    [recipes, filters, setQuery, search, loading, error]
  );

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useRecipes() {
  /** Hook to access recipes list, filters, and actions. */
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes must be used within a RecipesProvider');
  return ctx;
}

export default RecipesContext;
