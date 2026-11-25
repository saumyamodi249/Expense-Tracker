// src/component/categories/store/categorySelectors.ts
import type { Category, TransactionItem } from '../../../types/categorytypes';

export const selectDefaultCategories = (categories: Category[], q = ''): Category[] =>
  categories.filter(
    (c) => Boolean(c.isDefault) && (!q || c.name.toLowerCase().includes(q.toLowerCase().trim()))
  );

export const selectCustomCategories = (categories: Category[], q = ''): Category[] =>
  categories.filter(
    (c) => !c.isDefault && (!q || c.name.toLowerCase().includes(q.toLowerCase().trim()))
  );

export const selectCategoryById = (
  categories: Category[],
  id: string | null
): Category | undefined => (id ? categories.find((c) => c.id === id) : undefined);

export const selectTransactionsByCategoryId = (
  transactions: TransactionItem[],
  categoryId: string | null
): TransactionItem[] => (categoryId ? transactions.filter((t) => t.categoryId === categoryId) : []);

