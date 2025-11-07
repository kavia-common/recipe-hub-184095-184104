import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

// PUBLIC_INTERFACE
export default function NavBar() {
  /** Top navigation bar with primary routes and theme toggle. */
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="Recipe Hub Home">
          Recipe Hub
        </Link>
        <div className="nav-links" role="menubar" aria-label="Primary">
          <NavLink className="nav-link" role="menuitem" to="/">Home</NavLink>
          <NavLink className="nav-link" role="menuitem" to="/search">Search</NavLink>
          <NavLink className="nav-link" role="menuitem" to="/submit">Submit</NavLink>
          <NavLink className="nav-link" role="menuitem" to="/bookmarks">Bookmarks</NavLink>
          <button
            className="btn secondary"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
