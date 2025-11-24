'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
  variant?: 'text' | 'title' | 'card' | 'avatar';
}

/**
 * Componente Skeleton para loading placeholders
 * Muestra shimmer animation mientras se carga contenido
 */
export default function Skeleton({
  className = '',
  count = 1,
  variant = 'text',
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    card: 'h-32 w-full rounded-lg',
    avatar: 'h-10 w-10 rounded-full',
  };

  const skeletonClass = `${baseClasses} ${variants[variant]} ${className}`;

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={skeletonClass} />
        ))}
      </div>
    );
  }

  return <div className={skeletonClass} />;
}
