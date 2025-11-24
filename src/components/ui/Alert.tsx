'use client';

import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

/**
 * Componente Alert para mostrar mensajes de estado
 */
export default function Alert({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
}: AlertProps) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600',
      Icon: CheckCircle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
      Icon: AlertCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
      Icon: AlertTriangle,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600',
      Icon: Info,
    },
  };

  const style = styles[type];
  const Icon = style.Icon;

  return (
    <div
      className={`
        flex gap-3 rounded-lg border p-4
        ${style.bg} ${style.border} ${style.text}
        ${className}
      `}
      role="alert"
    >
      <Icon size={20} className={`flex-shrink-0 ${style.icon}`} />
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <p className={title ? 'text-sm' : ''}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 font-bold opacity-50 hover:opacity-100"
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
}
