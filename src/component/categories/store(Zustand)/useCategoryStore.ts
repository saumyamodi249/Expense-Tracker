// src/features/categories/store/useCategoryStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Category,
  TransactionItem,
  CreateCategoryDTO,
  LogTransactionDTO,
} from '../../../types/categorytypes';

interface CategoryState {
  categories: Category[];
  transactions: TransactionItem[];
  searchQuery: string;
  activeCategoryId: string | null;
  isAddModalOpen: boolean;
  isDrawerOpen: boolean;

  // Actions
  addCategory: (dto: CreateCategoryDTO) => void;
  deleteCategory: (categoryId: string) => void;
  updateLimit: (categoryId: string, newLimit: number) => void;
  logTransaction: (dto: LogTransactionDTO) => void;
  deleteTransaction: (transactionId: string) => void;
  setSearchQuery: (query: string) => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  openDrawer: (categoryId: string) => void;
  closeDrawer: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      transactions: [],
      searchQuery: '',
      activeCategoryId: null,
      isAddModalOpen: false,
      isDrawerOpen: false,

      // 1. Add Category
      addCategory: (dto) =>
        set((state) => ({
          categories: [
            ...state.categories,
            {
              id: `${dto.isDefault ? 'default' : 'custom'}-${Date.now()}`,
              name: dto.name.trim(),
              budget: Number(dto.budget) || 0,
              spent: Number(dto.initialSpent) || 0,
              color: dto.color,
              icon: dto.icon,
              isDefault: Boolean(dto.isDefault),
            },
          ],
        })),

      // 2. Delete Category
      deleteCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== categoryId),
          activeCategoryId: state.activeCategoryId === categoryId ? null : state.activeCategoryId,
          isDrawerOpen: state.activeCategoryId === categoryId ? false : state.isDrawerOpen,
        })),

      // 3. Update Budget Limit
      updateLimit: (categoryId, newLimit) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === categoryId ? { ...c, budget: Math.max(0, newLimit) } : c
          ),
        })),

      // 4. Log Transaction
      logTransaction: (dto) => {
        const amount = Math.max(0, Number(dto.amount) || 0);
        const now = new Date();
        const newTx: TransactionItem = {
          id: `tx-${now.getTime()}`,
          categoryId: dto.categoryId,
          amount,
          note: dto.note?.trim() || '',
          date: now.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
          }),
          time: now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
        };

        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === dto.categoryId ? { ...c, spent: (c.spent || 0) + amount } : c
          ),
          transactions: [newTx, ...state.transactions],
        }));
      },

      // 5. Delete Transaction
      deleteTransaction: (transactionId) =>
        set((state) => {
          const target = state.transactions.find((t) => t.id === transactionId);
          return {
            categories: target
              ? state.categories.map((c) =>
                  c.id === target.categoryId
                    ? { ...c, spent: Math.max(0, (c.spent || 0) - target.amount) }
                    : c
                )
              : state.categories,
            transactions: state.transactions.filter((t) => t.id !== transactionId),
          };
        }),

      // UI Helpers
      setSearchQuery: (query) => set({ searchQuery: query }),
      openAddModal: () => set({ isAddModalOpen: true }),
      closeAddModal: () => set({ isAddModalOpen: false }),
      openDrawer: (categoryId) => set({ activeCategoryId: categoryId, isDrawerOpen: true }),
      closeDrawer: () => set({ activeCategoryId: null, isDrawerOpen: false }),
    }),
    {
      name: 'expense_tracker_categories_store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        categories: state.categories,
        transactions: state.transactions,
      }),
    }
  )
);

export default useCategoryStore;
