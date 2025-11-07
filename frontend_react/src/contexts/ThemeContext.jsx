import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * ThemeContext provides a simple light/dark theme toggle and persists to localStorage.
 */
const ThemeContext = createContext(undefined);

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides theme state (light/dark) and toggle method to the app. */
  const [theme, setTheme] = useState(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    return stored || 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // Ignore persistence errors
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to access theme and toggleTheme. */
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}

export default ThemeContext;
