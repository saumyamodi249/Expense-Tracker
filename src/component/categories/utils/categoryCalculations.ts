// src/features/categories/utils/categoryCalculations.ts
import type { Category } from '../types/category.types';

export function formatCurrency(val: number): string {
  return `$${val.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function calcProgressPercent(spent: number, budget?: number): number {
  if (!budget || budget <= 0) return 0;
  return Math.min(100, Math.round((Math.max(0, spent) / budget) * 100));
}

export function calcRemaining(spent: number, budget?: number): number {
  if (!budget) return 0;
  return Math.max(0, budget - spent);
}

export function isOverBudget(spent: number, budget?: number): boolean {
  if (!budget) return false;
  return spent > budget;
}

export function formatCategorySubtitle(category: Category): string {
  const budget = category.budget || 0;
  return `${formatCurrency(category.spent)} of ${formatCurrency(budget)}`;
}
