'use client';

import { useCallback, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

/**
 * Hook para manejar autenticación
 * Expone: user, isAuthenticated, login, logout, register
 */
export function useAuth() {
  const { user, isAuthenticated, setUser, clearUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      // Importar dinámicamente para evitar circular dependency
      const { mockLogin } = await import('@/lib/mockAuth');
      const userData = await mockLogin(credentials.email, credentials.password);
      setUser(userData as any);
      return userData;
    } catch (err: any) {
      const message = err?.message || 'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(() => {
    clearUser();
    setError(null);
  }, [clearUser]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { mockRegister } = await import('@/lib/mockAuth');
      const userData = await mockRegister(credentials.name, credentials.email, credentials.password);
      setUser(userData as any);
      return userData;
    } catch (err: any) {
      const message = err?.message || 'Error al registrarse';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
  };
}
