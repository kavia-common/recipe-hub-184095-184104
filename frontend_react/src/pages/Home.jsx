import React from 'react';
import RecipeGrid from '../components/RecipeGrid';

const sample = [
  { id: 1, title: 'Ocean Grilled Salmon', description: 'Citrus glaze with herbs.' },
  { id: 2, title: 'Avocado Toast Deluxe', description: 'Seeded bread with microgreens.' },
  { id: 3, title: 'Hearty Quinoa Bowl', description: 'Roasted veg and tahini.' },
  { id: 4, title: 'Classic Margherita', description: 'Crisp crust, fresh basil.' },
];

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page with featured recipe grid. */
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Featured Recipes</h1>
      </div>
      <RecipeGrid items={sample} />
    </div>
  );
}
