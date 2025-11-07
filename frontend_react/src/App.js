import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './index.css';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import RecipeDetail from './pages/RecipeDetail';
import SubmitRecipe from './pages/SubmitRecipe';
import Bookmarks from './pages/Bookmarks';

// PUBLIC_INTERFACE
function App() {
  /** Root application with routing and theme management. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle the current theme between light and dark. */
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <NavBar onToggleTheme={toggleTheme} theme={theme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/submit" element={<SubmitRecipe />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
