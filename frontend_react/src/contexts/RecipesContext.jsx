import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * RecipesContext manages recipes list, filters, loading and error states.
 * This is a lightweight client-side store; integrate real API later.
 */
const RecipesContext = createContext(undefined);

// Demo initial data mirrors placeholders in pages
const INITIAL_RECIPES = [
  { id: 1, title: 'Ocean Grilled Salmon', description: 'Citrus glaze with herbs.' },
  { id: 2, title: 'Avocado Toast Deluxe', description: 'Seeded bread with microgreens.' },
  { id: 3, title: 'Hearty Quinoa Bowl', description: 'Roasted veg and tahini.' },
  { id: 4, title: 'Classic Margherita', description: 'Crisp crust, fresh basil.' },
];

// PUBLIC_INTERFACE
export function RecipesProvider({ children }) {
  /** Provides recipes data, filters, and request states. */
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [filters, setFilters] = useState({ q: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulated search; replace with backend API call later.
  const fetchRecipes = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 200)); // simulate latency
      if (!query) {
        setRecipes(INITIAL_RECIPES);
      } else {
        const ql = query.toLowerCase();
        const results = INITIAL_RECIPES.filter(
          (r) =>
            r.title.toLowerCase().includes(ql) ||
            r.description.toLowerCase().includes(ql)
        ).map((r, i) => ({ ...r, id: r.id * 100 + i })); // stable-ish ids for demo
        setRecipes(results);
      }
    } catch (e) {
      setError('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // initial load
    fetchRecipes('');
  }, [fetchRecipes]);

  const setQuery = useCallback(
    (q) => {
      setFilters((prev) => ({ ...prev, q }));
    },
    [setFilters]
  );

  const search = useCallback(
    (q) => {
      setQuery(q);
      return fetchRecipes(q);
    },
    [fetchRecipes, setQuery]
  );

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
