import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createRecipesApi } from '../api/recipes';

/**
 * BookmarksContext stores bookmarked recipes with localStorage persistence.
 * It supports add/remove/toggle and quick lookup helpers.
 */
const BookmarksContext = createContext(undefined);

const LS_KEY = 'recipe_hub_bookmarks_v1';

// PUBLIC_INTERFACE
export function BookmarksProvider({ children }) {
  /** Provides bookmarked items and operations, persisted in localStorage, with detail fetch helper. */
  const apiRef = useRef(createRecipesApi());
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const add = useCallback((recipe) => {
    setBookmarks((prev) => {
      if (prev.find((r) => r.id === recipe.id)) return prev;
      return [...prev, { id: recipe.id, title: recipe.title, description: recipe.description }];
    });
  }, []);

  const remove = useCallback((id) => {
    setBookmarks((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const toggle = useCallback((recipe) => {
    setBookmarks((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      if (exists) return prev.filter((r) => r.id !== recipe.id);
      return [...prev, { id: recipe.id, title: recipe.title, description: recipe.description }];
    });
  }, []);

  const isBookmarked = useCallback((id) => bookmarks.some((r) => r.id === id), [bookmarks]);

  /**
   * Fetch the latest details for a bookmarked recipe id, falling back to cached minimal data.
   */
  const getDetails = useCallback(async (id) => {
    try {
      const data = await apiRef.current.getById(id);
      return data;
    } catch {
      // fallback to cached lightweight item if present
      return bookmarks.find((r) => r.id === id) || null;
    }
  }, [bookmarks]);

  const value = useMemo(
    () => ({ bookmarks, add, remove, toggle, isBookmarked, getDetails }),
    [bookmarks, add, remove, toggle, isBookmarked, getDetails]
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

// PUBLIC_INTERFACE
export function useBookmarks() {
  /** Hook to access bookmarks state and operations. */
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error('useBookmarks must be used within a BookmarksProvider');
  return ctx;
}

export default BookmarksContext;
