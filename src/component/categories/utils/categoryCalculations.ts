// src/component/categories/utils/categoryCalculations.ts
import useProfileStore from '../../../store/profileStore';

export function getCurrencySymbol(): string {
  try {
    const currency = useProfileStore.getState().account?.currency;
    if (currency?.includes('INR') || currency?.includes('₹')) return '₹';
    if (currency?.includes('EUR') || currency?.includes('€')) return '€';
    if (currency?.includes('GBP') || currency?.includes('£')) return '£';
    return '$';
  } catch {
    return '$';
  }
}

export function formatCurrency(val: number, symbol?: string): string {
  const sym = symbol ?? getCurrencySymbol();
  return `${sym}${Math.abs(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function calcProgressPercent(spent: number, budget?: number): number {
  if (!budget || budget <= 0) return 0;
  if (!spent || spent <= 0) return 0;
  return Math.round((spent / budget) * 100);
}

export function calcRemaining(spent: number, budget?: number): number {
  if (!budget || budget <= 0) return 0;
  return Math.max(0, budget - spent);
}

export function calcOverspent(spent: number, budget?: number): number {
  if (!budget || budget <= 0) return 0;
  return Math.max(0, spent - budget);
}

export function isOverBudget(spent: number, budget?: number): boolean {
  if (!budget || budget <= 0) return false;
  return spent > budget;
}

export function isBudgetFullyUsed(spent: number, budget?: number): boolean {
  if (!budget || budget <= 0) return false;
  return spent === budget;
}
