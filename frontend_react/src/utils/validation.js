//
// Client-side validation utilities for recipe form
//

// PUBLIC_INTERFACE
export function validateRecipe(values) {
  /**
   * Validate a recipe payload with constraints for each field.
   * Returns { valid: boolean, errors: { field: message } }
   */
  const errors = {};

  // Title
  if (!values.title || typeof values.title !== 'string' || values.title.trim().length === 0) {
    errors.title = 'Title is required.';
  } else if (values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  } else if (values.title.trim().length > 120) {
    errors.title = 'Title must be under 120 characters.';
  }

  // Description
  if (!values.description || values.description.trim().length === 0) {
    errors.description = 'Description is required.';
  } else if (values.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters.';
  }

  // Image URL (optional, but if present, should look like a URL)
  if (values.imageUrl && typeof values.imageUrl === 'string' && values.imageUrl.trim().length > 0) {
    const urlLike = /^(https?:\/\/|\/)/i.test(values.imageUrl.trim());
    if (!urlLike) {
      errors.imageUrl = 'Provide a valid URL (http(s):// or /path).';
    }
  }

  // Ingredients
  const ingredients = Array.isArray(values.ingredients)
    ? values.ingredients.map((s) => (typeof s === 'string' ? s.trim() : '')).filter(Boolean)
    : [];
  if (ingredients.length === 0) {
    errors.ingredients = 'At least one ingredient is required.';
  }
  // Instructions
  const instructions = Array.isArray(values.instructions)
    ? values.instructions.map((s) => (typeof s === 'string' ? s.trim() : '')).filter(Boolean)
    : [];
  if (instructions.length === 0) {
    errors.instructions = 'At least one instruction step is required.';
  }

  // Times
  const prep = Number(values.prepTime || 0);
  const cook = Number(values.cookTime || 0);
  if (Number.isNaN(prep) || prep < 0) errors.prepTime = 'Prep time must be a non-negative number.';
  if (Number.isNaN(cook) || cook < 0) errors.cookTime = 'Cook time must be a non-negative number.';

  // Servings
  const servings = Number(values.servings || 0);
  if (Number.isNaN(servings) || servings <= 0) {
    errors.servings = 'Servings must be a positive number.';
  }

  // Tags (optional)
  if (values.tags && !Array.isArray(values.tags)) {
    errors.tags = 'Tags must be a list of words.';
  }

  // Difficulty (optional but if provided must be one of allowed)
  const allowedDifficulties = ['easy', 'medium', 'hard'];
  if (values.difficulty && !allowedDifficulties.includes(values.difficulty)) {
    errors.difficulty = 'Difficulty must be one of: easy, medium, hard.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// PUBLIC_INTERFACE
export function parseListInput(value) {
  /**
   * Convert a textarea or comma/line separated input into a string array.
   * - Splits by newline first; if no newline, also splits by comma.
   */
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  const raw = value
    .split('\n')
    .map((line) => line.split(','))
    .flat()
    .map((s) => s.trim())
    .filter(Boolean);
  return raw;
}
