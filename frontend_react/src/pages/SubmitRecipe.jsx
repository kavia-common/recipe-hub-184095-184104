import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

// PUBLIC_INTERFACE
export default function SubmitRecipe() {
  /** Minimal submit form placeholder. */
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder action; integration with backend to be added later.
    alert(`Submitted: ${title}`);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Submit a Recipe</h1>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
        <Input id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label htmlFor="desc" style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Description</span>
          <textarea
            id="desc"
            className="input"
            rows={5}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Briefly describe your recipe..."
            required
          />
        </label>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
