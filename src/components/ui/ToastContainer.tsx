'use client';

import React from 'react';
import { useToastStore } from '@/store/toastStore';
import Alert from './Alert';

/**
 * Componente ToastContainer para mostrar notificaciones
 * Se debe agregar en el root layout
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto animate-in slide-in-from-right">
          <Alert
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
