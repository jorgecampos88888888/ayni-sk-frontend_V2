'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  skip?: boolean;
  cacheTime?: number; // en ms
  retry?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Simple cache with TTL
const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * Hook genérico para llamadas API con caché y retry
 * Ej: const { data, isLoading, error } = useFetch('/api/endpoint')
 */
export function useFetch<T = any>(
  url: string | null,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    skip = false,
    cacheTime = 5 * 60 * 1000, // 5 minutos default
    retry = 3,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(!skip && !!url);
  const [error, setError] = useState<Error | null>(null);
  const retryCount = useRef(0);

  const fetchData = useCallback(async () => {
    if (!url || skip) return;

    // Verificar caché
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      setData(cached.data);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      cache.set(url, { data: result, timestamp: Date.now() });
      onSuccess?.(result);
      retryCount.current = 0;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (retryCount.current < retry) {
        retryCount.current++;
        setTimeout(fetchData, 1000 * Math.pow(2, retryCount.current)); // Exponential backoff
      } else {
        setError(error);
        onError?.(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, method, headers, body, skip, cacheTime, retry, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = useCallback(async () => {
    if (url) {
      cache.delete(url);
      await fetchData();
    }
  }, [url, fetchData]);

  return { data, isLoading, error, refetch };
}

/**
 * Utilidad para invalidar caché de una URL
 */
export function invalidateCache(url: string) {
  cache.delete(url);
}

/**
 * Utilidad para limpiar todo el caché
 */
export function clearCache() {
  cache.clear();
}
