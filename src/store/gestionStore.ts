import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AyniItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt?: string;
}

interface GestionStore {
  items: AyniItem[];
  selectedItem: AyniItem | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setItems: (items: AyniItem[]) => void;
  addItem: (item: AyniItem) => void;
  updateItem: (id: string, updates: Partial<AyniItem>) => void;
  deleteItem: (id: string) => void;
  setSelectedItem: (item: AyniItem | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
};

export const useGestionStore = create<GestionStore>()(
  persist(
    (set) => ({
      ...initialState,

      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
          ),
          selectedItem: state.selectedItem?.id === id 
            ? { ...state.selectedItem, ...updates } 
            : state.selectedItem,
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          selectedItem: state.selectedItem?.id === id ? null : state.selectedItem,
        })),
      setSelectedItem: (item) => set({ selectedItem: item }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    {
      name: 'gestion-store',
    }
  )
);
