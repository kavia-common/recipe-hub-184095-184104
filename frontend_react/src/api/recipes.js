/**
 * Recipes API module that switches between real client and mock based on env.
 */
import { getEnv } from '../utils/env';
import { createApiClient } from './client';
import { createMockRecipesApi } from '../mocks/mockApi';

// PUBLIC_INTERFACE
export function createRecipesApi() {
  /**
   * Returns an object implementing list/search/get/create recipe operations.
   * - In production or when API env vars are set, uses real HTTP client.
   * - Otherwise uses mock implementation with simulated latency.
   */
  const { useMock } = getEnv();
  if (useMock) {
    return createMockRecipesApi();
  }

  const client = createApiClient();

  return {
    /**
     * List/search recipes.
     * @param {object} params - Optional params { q }
     */
    async list(params = {}) {
      const q = params.q ? `?q=${encodeURIComponent(params.q)}` : '';
      return client.get(`/recipes${q}`);
    },

    /**
     * Get a single recipe by id.
     * @param {string|number} id
     */
    async getById(id) {
      if (id === undefined || id === null) throw new Error('id is required');
      return client.get(`/recipes/${id}`);
    },

    /**
     * Create a new recipe.
     * @param {object} payload - { title, description, ... }
     */
    async create(payload) {
      if (!payload || !payload.title) throw new Error('title is required');
      return client.post('/recipes', payload);
    },
  };
}

export default createRecipesApi;
