import { useState, useCallback } from 'react';

interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setValue: (value: boolean) => void;
  open: () => void;
  close: () => void;
}

/**
 * Hook para manejar estado booleano de forma simple
 * Útil para modales, drawers, etc.
 */
export const useToggle = (initialValue = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const open = useCallback(() => {
    setValue(true);
  }, []);

  const close = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setValue, open, close };
};
