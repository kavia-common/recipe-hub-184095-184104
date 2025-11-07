import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';

// PUBLIC_INTERFACE
export default function RecipeDetail() {
  /** Recipe detail placeholder using route param. */
  const { id } = useParams();
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Recipe #{id}</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button>Bookmark</Button>
          <Button variant="secondary">Share</Button>
        </div>
      </div>
      <div className="card">
        <p style={{ color: 'var(--muted)' }}>
          Detailed view coming soon. This page will include ingredients, steps, and nutrition info.
        </p>
      </div>
    </div>
  );
}
