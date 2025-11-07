import React, { useEffect, useMemo, useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { parseListInput, validateRecipe } from '../../utils/validation';

// PUBLIC_INTERFACE
export default function RecipeForm({ initialValues, onSubmit, submitting = false }) {
  /** 
   * RecipeForm renders all fields required to submit a recipe and performs client-side validation.
   * - Accessible labels and descriptions
   * - Ocean theme styling via existing utility classes
   * - Emits cleaned payload on submit when valid
   */
  const [values, setValues] = useState(() => ({
    title: '',
    description: '',
    imageUrl: '',
    ingredients: [],
    instructions: [],
    prepTime: '',
    cookTime: '',
    servings: '',
    tags: [],
    difficulty: 'easy',
    ...sanitizeInitial(initialValues),
  }));
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues((prev) => ({ ...prev, ...sanitizeInitial(initialValues) }));
    }
  }, [initialValues]);

  const difficultyOptions = useMemo(() => ([
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ]), []);

  const handleChange = (field) => (e) => {
    const v = e?.target?.value ?? e;
    setValues((prev) => ({ ...prev, [field]: v }));
  };

  const handleListChange = (field) => (e) => {
    const arr = parseListInput(e.target.value);
    setValues((prev) => ({ ...prev, [field]: arr }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const listValue = (list) => (Array.isArray(list) ? list.join('\n') : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // build payload with normalized types
    const payload = buildPayload(values);
    const { valid, errors: errs } = validateRecipe(payload);
    setErrors(errs);
    // mark all as touched to reveal errors if any
    if (!valid) {
      const allTouched = Object.keys(payload).reduce((acc, k) => ({ ...acc, [k]: true }), {});
      setTouched((prev) => ({ ...allTouched, ...prev }));
      return;
    }
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
      <section className="card" aria-labelledby="recipe-meta-heading" style={{ display: 'grid', gap: 12 }}>
        <h2 id="recipe-meta-heading" style={{ fontSize: 18 }}>Recipe details</h2>
        <Input
          id="title"
          label="Title"
          type="text"
          value={values.title}
          onChange={handleChange('title')}
          onBlur={handleBlur('title')}
          aria-invalid={Boolean(touched.title && errors.title)}
          aria-describedby={touched.title && errors.title ? 'title-error' : undefined}
          placeholder="e.g., Creamy Tomato Pasta"
          required
        />
        {touched.title && errors.title && (
          <FieldError id="title-error">{errors.title}</FieldError>
        )}

        <label htmlFor="description" style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Description</span>
          <textarea
            id="description"
            className="input"
            rows={5}
            value={values.description}
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
            aria-invalid={Boolean(touched.description && errors.description)}
            aria-describedby={touched.description && errors.description ? 'description-error' : undefined}
            placeholder="Briefly describe your recipe..."
            required
          />
        </label>
        {touched.description && errors.description && (
          <FieldError id="description-error">{errors.description}</FieldError>
        )}

        <Input
          id="imageUrl"
          label="Image URL"
          type="url"
          value={values.imageUrl}
          onChange={handleChange('imageUrl')}
          onBlur={handleBlur('imageUrl')}
          aria-invalid={Boolean(touched.imageUrl && errors.imageUrl)}
          aria-describedby={touched.imageUrl && errors.imageUrl ? 'imageUrl-error' : 'imageUrl-help'}
          placeholder="https://example.com/your-image.jpg"
        />
        <small id="imageUrl-help" style={{ color: 'var(--muted)' }}>
          Optional. Starts with http(s):// or /path.
        </small>
        {touched.imageUrl && errors.imageUrl && (
          <FieldError id="imageUrl-error">{errors.imageUrl}</FieldError>
        )}
      </section>

      <section className="card" aria-labelledby="recipe-lists-heading" style={{ display: 'grid', gap: 12 }}>
        <h2 id="recipe-lists-heading" style={{ fontSize: 18 }}>Ingredients & Instructions</h2>

        <label htmlFor="ingredients" style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Ingredients</span>
          <textarea
            id="ingredients"
            className="input"
            rows={6}
            value={listValue(values.ingredients)}
            onChange={handleListChange('ingredients')}
            onBlur={handleBlur('ingredients')}
            aria-invalid={Boolean(touched.ingredients && errors.ingredients)}
            aria-describedby={touched.ingredients && errors.ingredients ? 'ingredients-error' : 'ingredients-help'}
            placeholder={'One per line, e.g.\n- 200g pasta\n- 1 cup tomato sauce\n- Fresh basil'}
            required
          />
        </label>
        <small id="ingredients-help" style={{ color: 'var(--muted)' }}>
          Enter one ingredient per line. Commas are also supported.
        </small>
        {touched.ingredients && errors.ingredients && (
          <FieldError id="ingredients-error">{errors.ingredients}</FieldError>
        )}

        <label htmlFor="instructions" style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Instructions</span>
          <textarea
            id="instructions"
            className="input"
            rows={8}
            value={listValue(values.instructions)}
            onChange={handleListChange('instructions')}
            onBlur={handleBlur('instructions')}
            aria-invalid={Boolean(touched.instructions && errors.instructions)}
            aria-describedby={touched.instructions && errors.instructions ? 'instructions-error' : 'instructions-help'}
            placeholder={'One step per line, e.g.\n- Boil pasta until al dente\n- Simmer sauce for 10 minutes\n- Toss together and serve'}
            required
          />
        </label>
        <small id="instructions-help" style={{ color: 'var(--muted)' }}>
          Enter one instruction per line. Commas are also supported.
        </small>
        {touched.instructions && errors.instructions && (
          <FieldError id="instructions-error">{errors.instructions}</FieldError>
        )}
      </section>

      <section className="card" aria-labelledby="recipe-meta2-heading" style={{ display: 'grid', gap: 12 }}>
        <h2 id="recipe-meta2-heading" style={{ fontSize: 18 }}>Timings, Servings, Tags</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <Input
            id="prepTime"
            label="Prep time (min)"
            type="number"
            inputMode="numeric"
            value={values.prepTime}
            onChange={handleChange('prepTime')}
            onBlur={handleBlur('prepTime')}
            aria-invalid={Boolean(touched.prepTime && errors.prepTime)}
            aria-describedby={touched.prepTime && errors.prepTime ? 'prepTime-error' : undefined}
            min="0"
          />
          {touched.prepTime && errors.prepTime && (
            <FieldError id="prepTime-error">{errors.prepTime}</FieldError>
          )}
          <Input
            id="cookTime"
            label="Cook time (min)"
            type="number"
            inputMode="numeric"
            value={values.cookTime}
            onChange={handleChange('cookTime')}
            onBlur={handleBlur('cookTime')}
            aria-invalid={Boolean(touched.cookTime && errors.cookTime)}
            aria-describedby={touched.cookTime && errors.cookTime ? 'cookTime-error' : undefined}
            min="0"
          />
          {touched.cookTime && errors.cookTime && (
            <FieldError id="cookTime-error">{errors.cookTime}</FieldError>
          )}
          <Input
            id="servings"
            label="Servings"
            type="number"
            inputMode="numeric"
            value={values.servings}
            onChange={handleChange('servings')}
            onBlur={handleBlur('servings')}
            aria-invalid={Boolean(touched.servings && errors.servings)}
            aria-describedby={touched.servings && errors.servings ? 'servings-error' : undefined}
            min="1"
            required
          />
          {touched.servings && errors.servings && (
            <FieldError id="servings-error">{errors.servings}</FieldError>
          )}
        </div>

        <label htmlFor="tags" style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Tags</span>
          <input
            id="tags"
            className="input"
            type="text"
            value={Array.isArray(values.tags) ? values.tags.join(', ') : ''}
            onChange={(e) => setValues((prev) => ({ ...prev, tags: parseListInput(e.target.value).map((s) => s.replace(/^#/, '')) }))}
            placeholder="comma or line separated, e.g., vegetarian, quick"
          />
        </label>

        <label htmlFor="difficulty" style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Difficulty</span>
          <select
            id="difficulty"
            className="input"
            value={values.difficulty}
            onChange={handleChange('difficulty')}
          >
            {difficultyOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      </section>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Recipe'}
        </Button>
        <Button type="reset" variant="secondary" onClick={() => resetForm(setValues, initialValues)}>
          Reset
        </Button>
      </div>
    </form>
  );
}

function resetForm(setValues, initialValues) {
  setValues({
    title: '',
    description: '',
    imageUrl: '',
    ingredients: [],
    instructions: [],
    prepTime: '',
    cookTime: '',
    servings: '',
    tags: [],
    difficulty: 'easy',
    ...sanitizeInitial(initialValues),
  });
}

function sanitizeInitial(initial) {
  if (!initial) return {};
  return {
    ...initial,
    ingredients: Array.isArray(initial.ingredients) ? initial.ingredients : parseListInput(initial.ingredients || ''),
    instructions: Array.isArray(initial.instructions) ? initial.instructions : parseListInput(initial.instructions || ''),
    tags: Array.isArray(initial.tags) ? initial.tags : parseListInput(initial.tags || ''),
    difficulty: initial.difficulty || 'easy',
  };
}

function buildPayload(values) {
  const prep = Number(values.prepTime || 0);
  const cook = Number(values.cookTime || 0);
  const servings = Number(values.servings || 0);

  return {
    title: (values.title || '').trim(),
    description: (values.description || '').trim(),
    imageUrl: (values.imageUrl || '').trim(),
    ingredients: Array.isArray(values.ingredients) ? values.ingredients.map((s) => s.trim()).filter(Boolean) : [],
    instructions: Array.isArray(values.instructions) ? values.instructions.map((s) => s.trim()).filter(Boolean) : [],
    time: {
      prep: Number.isFinite(prep) && prep > 0 ? `${prep} min` : undefined,
      cook: Number.isFinite(cook) && cook > 0 ? `${cook} min` : undefined,
      total: Number.isFinite(prep + cook) && (prep + cook) > 0 ? `${prep + cook} min` : undefined,
    },
    prepTime: Number.isFinite(prep) && prep >= 0 ? prep : 0,
    cookTime: Number.isFinite(cook) && cook >= 0 ? cook : 0,
    servings: Number.isFinite(servings) && servings > 0 ? servings : 1,
    tags: Array.isArray(values.tags) ? values.tags.map((t) => t.trim()).filter(Boolean) : [],
    difficulty: values.difficulty || 'easy',
  };
}

function FieldError({ id, children }) {
  return (
    <div id={id} role="alert" style={{ color: 'var(--error)', fontSize: 12, marginTop: -6 }}>
      {children}
    </div>
  );
}
