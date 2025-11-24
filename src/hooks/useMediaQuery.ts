import { useState, useEffect } from 'react';

/**
 * Hook para detectar breakpoints de Tailwind CSS
 * @param breakpoint - Breakpoint a verificar (xs, sm, md, lg, xl, 2xl)
 * @returns boolean - true si el tamaño actual coincide o supera el breakpoint
 */
export const useMediaQuery = (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const breakpoints = {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    };

    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
};

/**
 * Hook para verificar si el dispositivo es móvil
 * @returns boolean - true si es móvil
 */
export const useMobile = () => {
  return !useMediaQuery('md');
};

/**
 * Hook para verificar si el dispositivo es tablet
 * @returns boolean - true si es tablet
 */
export const useTablet = () => {
  const isMd = useMediaQuery('md');
  const isLg = !useMediaQuery('lg');
  return isMd && isLg;
};

/**
 * Hook para verificar si el dispositivo es desktop
 * @returns boolean - true si es desktop
 */
export const useDesktop = () => {
  return useMediaQuery('lg');
};
