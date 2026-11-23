import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { arrayMove } from '@dnd-kit/sortable';
import type { Item, CreateItemInput, UpdateItemInput } from '../types/type';

interface ItemStore {
  items: Item[];
  addItem: (input: CreateItemInput) => void;
  updateItem: (input: UpdateItemInput) => void;
  deleteItem: (id: string) => void;
  reorderItems: (activeIndex: number, overIndex: number) => void;
  clearItems: () => void;
}

export const useItemStore = create<ItemStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (input: CreateItemInput) => {
        const newItem: Item = {
          id: String(Date.now()),
          name: input.name,
          price: input.price,
          unit: input.unit || 'unit',
          category: input.category,
          createdAt: 'Just now',
        };
        set({ items: [newItem, ...get().items] });
      },
      updateItem: (input: UpdateItemInput) => {
        set({
          items: get().items.map((item) =>
            item.id === input.id
              ? {
                  ...item,
                  ...(input.name !== undefined && { name: input.name }),
                  ...(input.price !== undefined && { price: input.price }),
                  ...(input.unit !== undefined && { unit: input.unit }),
                  ...(input.category !== undefined && { category: input.category }),
                }
              : item
          ),
        });
      },
      deleteItem: (id: string) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },
      reorderItems: (activeIndex: number, overIndex: number) => {
        set({
          items: arrayMove(get().items, activeIndex, overIndex),
        });
      },
      clearItems: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'expense_tracker_items',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Alias useBoundStore as requested
export const useBoundStore = useItemStore;
export default useItemStore;
