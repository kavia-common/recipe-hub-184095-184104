/**
 * Mock API implementation for recipes with simulated latency.
 */
import SAMPLE from './recipes.sample.json';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// PUBLIC_INTERFACE
export function createMockRecipesApi({ latency = 250 } = {}) {
  /**
   * Returns a mock recipes API with list/search/get/create methods.
   * Simulates network latency and stores created items in-memory.
   */
  // Clone sample to avoid accidental mutation
  let items = [...SAMPLE];
  let nextId = Math.max(...items.map((i) => i.id)) + 1;

  async function list(params = {}) {
    await delay(latency);
    const q = (params.q || '').toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (r) =>
        (r.title && r.title.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q))
    );
  }

  async function getById(id) {
    await delay(latency);
    const numId = Number(id);
    const found = items.find((r) => r.id === numId);
    if (!found) {
      const err = new Error('Recipe not found');
      err.status = 404;
      throw err;
    }
    return found;
  }

  async function create(payload) {
    await delay(latency);
    if (!payload || !payload.title) {
      const err = new Error('Validation error: title is required');
      err.status = 400;
      throw err;
    }
    const recipe = {
      id: nextId++,
      title: payload.title,
      description: payload.description || '',
      ...payload,
    };
    items = [recipe, ...items];
    return recipe;
  }

  return { list, getById, create };
}

export default createMockRecipesApi;
