/**
 * Clase para manejo de errores API
 */
export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * apiClient minimal: usa `fetch` y respeta `NEXT_PUBLIC_API_BASE_URL` si está definido.
 * - En desarrollo puede seguir devolviendo mocks si no hay `NEXT_PUBLIC_API_BASE_URL`.
 * - Evita añadir dependencia `axios` para no forzar instalaciones adicionales.
 */
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

async function handleResponse(res: Response) {
  const text = await res.text();
  let data: any = undefined;
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    throw new APIError(res.status, res.statusText || 'API Error', data);
  }

  return { data };
}

export const apiClient = {
  get: async (url: string) => {
    if (!baseURL) return Promise.resolve({ data: {} });
    const res = await fetch(`${baseURL}${url}`, { method: 'GET', credentials: 'include' });
    return handleResponse(res);
  },
  post: async (url: string, body: any) => {
    if (!baseURL) return Promise.resolve({ data: {} });
    const res = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },
  put: async (url: string, body: any) => {
    if (!baseURL) return Promise.resolve({ data: {} });
    const res = await fetch(`${baseURL}${url}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },
  delete: async (url: string) => {
    if (!baseURL) return Promise.resolve({ data: {} });
    const res = await fetch(`${baseURL}${url}`, { method: 'DELETE', credentials: 'include' });
    return handleResponse(res);
  },
};
