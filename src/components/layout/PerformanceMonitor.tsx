'use client';

import { useEffect } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Esperar a que la página cargue completamente
    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics: PerformanceMetric[] = [];

        // Navigation Timing
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          metrics.push({
            name: 'DNS Lookup',
            value: perfData.domainLookupEnd - perfData.domainLookupStart,
            unit: 'ms',
          });
          metrics.push({
            name: 'TCP Connection',
            value: perfData.connectEnd - perfData.connectStart,
            unit: 'ms',
          });
          metrics.push({
            name: 'Time to First Byte',
            value: perfData.responseStart - perfData.requestStart,
            unit: 'ms',
          });
          metrics.push({
            name: 'DOM Content Loaded',
            value: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            unit: 'ms',
          });
          metrics.push({
            name: 'Load Complete',
            value: perfData.loadEventEnd - perfData.loadEventStart,
            unit: 'ms',
          });
        }

        // Core Web Vitals (si está disponible)
        if ('web-vital' in window) {
          console.log('📊 Core Web Vitals:', metrics);
        }

        // Log en development
        if (process.env.NODE_ENV === 'development') {
          console.group('⚡ Performance Metrics');
          metrics.forEach((m) => console.log(`${m.name}: ${m.value.toFixed(2)}${m.unit}`));
          console.groupEnd();
        }

        // Analytics (si está habilitado)
        if (typeof window.gtag !== 'undefined') {
          metrics.forEach((m) => {
            window.gtag?.('event', 'page_timing', {
              event_category: 'performance',
              event_label: m.name,
              value: Math.round(m.value),
            });
          });
        }
      }, 0);
    });
  }, []);

  return null;
}
