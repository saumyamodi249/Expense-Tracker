import { useCategoryStore } from '../store(Zustand)/useCategoryStore';

export function useCategorySlider() {
  const activeCategoryId = useCategoryStore((state) => state.activeCategoryId);
  const isDrawerOpen = useCategoryStore((state) => state.isDrawerOpen);
  const categories = useCategoryStore((state) => state.categories);
  const transactions = useCategoryStore((state) => state.transactions);
  const closeDrawer = useCategoryStore((state) => state.closeDrawer);
  const openDrawer = useCategoryStore((state) => state.openDrawer);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const updateLimit = useCategoryStore((state) => state.updateLimit);
  const logTransaction = useCategoryStore((state) => state.logTransaction);
  const deleteTransaction = useCategoryStore((state) => state.deleteTransaction);

  const activeCategory = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)
    : undefined;
  const activeTransactions = activeCategoryId
    ? transactions.filter((t) => t.categoryId === activeCategoryId)
    : [];

  return {
    isDrawerOpen,
    activeCategory,
    activeTransactions,
    openDrawer,
    closeDrawer,
    deleteCategory,
    updateLimit,
    logTransaction,
    deleteTransaction,
  };
}

export default useCategorySlider;
