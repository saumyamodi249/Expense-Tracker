// src/component/categories/hooks/useCategoryStats.ts
import type { Category } from '../../../types/categorytypes';
import {
  calcProgressPercent,
  calcRemaining,
  calcOverspent,
  isOverBudget,
  isBudgetFullyUsed,
  formatCurrency,
} from '../utils/categoryCalculations';

export function useCategoryStats(category?: Category) {
  if (!category) {
    return {
      progressPercent: 0,
      remaining: 0,
      overspent: 0,
      isOver: false,
      isFullyUsed: false,
      statusText: '',
      formattedSpent: '$0.00',
      formattedBudget: '$0.00',
      formattedRemaining: '$0.00',
      formattedOverspent: '$0.00',
    };
  }

  const spent = category.spent || 0;
  const budget = category.budget || 0;

  const progressPercent = calcProgressPercent(spent, budget);
  const remaining = calcRemaining(spent, budget);
  const overspent = calcOverspent(spent, budget);
  const isOver = isOverBudget(spent, budget);
  const isFullyUsed = isBudgetFullyUsed(spent, budget);

  const formattedSpent = formatCurrency(spent);
  const formattedBudget = formatCurrency(budget);
  const formattedRemaining = formatCurrency(remaining);
  const formattedOverspent = formatCurrency(overspent);

  let statusText = `${formattedRemaining} left`;
  if (isOver) {
    statusText = `Over budget (+${formattedOverspent})`;
  } else if (isFullyUsed) {
    statusText = 'Budget fully used';
  }

  return {
    progressPercent,
    remaining,
    overspent,
    isOver,
    isFullyUsed,
    statusText,
    formattedSpent,
    formattedBudget,
    formattedRemaining,
    formattedOverspent,
  };
}

export default useCategoryStats;
