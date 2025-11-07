import React from 'react';
import RecipeGrid from '../components/RecipeGrid';

const saved = [
  { id: 201, title: 'Coconut Curry', description: 'Comforting and aromatic.' },
  { id: 202, title: 'Berry Smoothie', description: 'Fresh and energizing.' },
];

// PUBLIC_INTERFACE
export default function Bookmarks() {
  /** Bookmarks page with placeholder saved recipes. */
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Bookmarks</h1>
      </div>
      <RecipeGrid items={saved} />
    </div>
  );
}
