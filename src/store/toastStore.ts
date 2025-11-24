import { create } from 'zustand';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => {
  return {
    toasts: [],

    addToast: (toast) => {
      const id = Math.random().toString(36).substr(2, 9);
      const duration = toast.duration ?? 3000;

      set((state) => ({
        toasts: [...state.toasts, { ...toast, id }],
      }));

      // Auto-remove después de duration
      if (duration > 0) {
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }));
        }, duration);
      }

      return id;
    },

    removeToast: (id) =>
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      })),

    clearToasts: () => set({ toasts: [] }),
  };
});
