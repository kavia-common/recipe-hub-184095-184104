import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import RecipeDetail from './pages/RecipeDetail';
import SubmitRecipe from './pages/SubmitRecipe';
import Bookmarks from './pages/Bookmarks';
import { ThemeProvider } from './contexts/ThemeContext';
import { BookmarksProvider } from './contexts/BookmarksContext';
import { RecipesProvider } from './contexts/RecipesContext';

// PUBLIC_INTERFACE
function App() {
  /** Root application with routing and global providers. */
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BookmarksProvider>
          <RecipesProvider>
            <div className="app-shell">
              <NavBar />
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
          </RecipesProvider>
        </BookmarksProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
