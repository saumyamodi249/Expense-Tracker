// src/features/categories/hooks/useCategoryFilters.ts
import { useCategoryStore } from '../store(Zustand)/useCategoryStore';

export function useCategoryFilters() {
  const categories = useCategoryStore((state) => state.categories);
  const searchQuery = useCategoryStore((state) => state.searchQuery);
  const setSearchQuery = useCategoryStore((state) => state.setSearchQuery);

  const q = searchQuery.toLowerCase().trim();
  const defaultCategories = categories.filter(
    (c) => Boolean(c.isDefault) && (!q || c.name.toLowerCase().includes(q))
  );
  const customCategories = categories.filter(
    (c) => !c.isDefault && (!q || c.name.toLowerCase().includes(q))
  );

  return {
    defaultCategories,
    customCategories,
    searchQuery,
    setSearchQuery,
  };
}

export default useCategoryFilters;
