// API Configuration
export const API_BASE_URL = 'http://localhost:3001/api';

// API Endpoints
export const API_ENDPOINTS = {
  ikan: `${API_BASE_URL}/ikan`,
  settings: `${API_BASE_URL}/settings/website`,
} as const;
