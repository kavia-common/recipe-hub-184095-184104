//
// Utility for reading environment variables and determining runtime mode.
//
// PUBLIC_INTERFACE
export function getEnv() {
  /**
   * Returns environment configuration derived from process.env.
   * - apiBase: primary API base path (e.g., /api or full URL)
   * - backendUrl: full backend URL if provided
   * - nodeEnv: runtime environment (development, production, test)
   * - logLevel: log level for runtime logging
   * - useMock: true when no API base/back-end URL is configured AND not production
   */
  const apiBase = process.env.REACT_APP_API_BASE || '';
  const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
  const nodeEnv = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development';
  const logLevel = process.env.REACT_APP_LOG_LEVEL || 'info';

  const useMock = (!apiBase && !backendUrl) && nodeEnv !== 'production';

  return {
    apiBase,
    backendUrl,
    nodeEnv,
    logLevel,
    useMock,
  };
}

// PUBLIC_INTERFACE
export function isProduction() {
  /** Returns true when app is running in production mode. */
  const { nodeEnv } = getEnv();
  return nodeEnv === 'production';
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /**
   * Resolves API base URL using REACT_APP_BACKEND_URL or REACT_APP_API_BASE.
   * If both present, REACT_APP_BACKEND_URL takes precedence.
   * Returns empty string when not configured.
   */
  const { backendUrl, apiBase } = getEnv();
  if (backendUrl) return backendUrl.replace(/\/+$/, '');
  if (apiBase) return apiBase.replace(/\/+$/, '');
  return '';
}
