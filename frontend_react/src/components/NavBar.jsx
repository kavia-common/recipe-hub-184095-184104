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
        <div className="nav-links">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/search">Search</NavLink>
          <NavLink className="nav-link" to="/submit">Submit</NavLink>
          <NavLink className="nav-link" to="/bookmarks">Bookmarks</NavLink>
          <button className="btn secondary" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
