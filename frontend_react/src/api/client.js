/**
 * Minimal JSON API client with base URL and error handling.
 */
import { getApiBaseUrl } from '../utils/env';

// PUBLIC_INTERFACE
export function createApiClient() {
  /**
   * Creates an API client bound to the configured base URL.
   * Exposes get and post helpers that return parsed JSON or throw with details.
   */
  const base = getApiBaseUrl();

  async function request(path, options = {}) {
    const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        ...options,
      });

      const text = await res.text();
      const data = text ? safeJsonParse(text) : null;

      if (!res.ok) {
        const err = new Error((data && data.message) || `Request failed with ${res.status}`);
        err.status = res.status;
        err.data = data;
        throw err;
      }

      return data;
    } catch (e) {
      // Re-throw with more context
      const err = new Error(`Network error: ${e.message}`);
      err.cause = e;
      throw err;
    }
  }

  function safeJsonParse(text) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  async function get(path) {
    return request(path, { method: 'GET' });
    }

  async function post(path, body) {
    return request(path, { method: 'POST', body: JSON.stringify(body || {}) });
  }

  return { get, post };
}

export default createApiClient;
