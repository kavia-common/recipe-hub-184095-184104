import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/Forms/RecipeForm';
import { createRecipesApi } from '../api/recipes';
import { getApiBaseUrl } from '../utils/env';
import { validateRecipe } from '../utils/validation';
import Button from '../components/Button';

// PUBLIC_INTERFACE
export default function SubmitRecipe() {
  /**
   * Submit a Recipe page
   * - Uses RecipeForm with validation
   * - If API base is configured, POST to backend then navigate to detail
   * - Otherwise, use mock API via Recipes API and show success message
   */
  const apiRef = useRef(createRecipesApi());
  const navigate = useNavigate();
  const apiBase = getApiBaseUrl();
  const usingRealApi = useMemo(() => Boolean(apiBase), [apiBase]);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (payload) => {
    setMessage(null);
    setSubmitError(null);

    // Final guard validation before submitting
    const { valid, errors } = validateRecipe(payload);
    if (!valid) {
      setSubmitError('Please fix the highlighted errors and try again.');
      return;
    }

    setSubmitting(true);
    try {
      const created = await apiRef.current.create(payload);

      // If we get an ID back, navigate to detail, else show message
      if (created && (created.id !== undefined && created.id !== null)) {
        setMessage('Recipe submitted successfully.');
        // Give a small delay for UX before navigating
        setTimeout(() => navigate(`/recipe/${created.id}`), 250);
      } else {
        setMessage('Recipe submitted successfully.');
      }
    } catch (e) {
      const msg = e?.message || 'Failed to submit recipe';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Submit a Recipe</h1>
        <div />
      </div>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ color: 'var(--muted)', fontSize: 14 }}>
          {usingRealApi
            ? 'Your recipe will be posted to the backend API.'
            : 'No API configured. Using local mock store; your recipe will persist until refresh.'}
        </div>

        {message && (
          <div role="status" style={{ color: 'var(--success)' }}>
            {message}
          </div>
        )}
        {submitError && (
          <div role="alert" style={{ color: 'var(--error)' }}>
            {submitError}
          </div>
        )}

        <RecipeForm onSubmit={handleSubmit} submitting={submitting} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>
    </div>
  );
}
