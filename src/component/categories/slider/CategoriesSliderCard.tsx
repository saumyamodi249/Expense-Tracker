// src/features/categories/components/drawer/DrawerSummaryBanner.tsx
import React from 'react';
import type { Category } from '../types/category.types';
import { useCategoryStats } from '../hooks/useCategoryStats';
import { normalizeCategoryColor } from '../constants/categoryColors';
import { CategoryProgressBar } from '../card/CategoryProgressBar';

interface DrawerSummaryBannerProps {
  category: Category;
}

export const DrawerSummaryBanner: React.FC<DrawerSummaryBannerProps> = ({ category }) => {
  const {
    progressPercent,
    formattedSpent,
    formattedBudget,
    formattedRemaining,
    isOver,
  } = useCategoryStats(category);

  const colorKey = normalizeCategoryColor(category.color);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-modal-bg border border-border">
      {/* Big Figure Display */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-[11px] font-medium text-font-secondary">
            Total Spent
          </div>
          <div className="text-xl sm:text-2xl font-bold text-font tracking-tight">
            {formattedSpent}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-[11px] font-medium text-font-secondary">
            Budget Limit
          </div>
          <div className="text-xl sm:text-2xl font-bold text-font tracking-tight">
            {formattedBudget}
          </div>
        </div>
      </div>

      {/* Subline metrics */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <div className="text-font-secondary">{progressPercent}% used</div>
        <div className={isOver ? 'text-error' : `cat-text-${colorKey}`}>
          {isOver ? 'Over budget' : `${formattedRemaining} left`}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <CategoryProgressBar
          percent={progressPercent}
          color={category.color}
          isOver={isOver}
        />
      </div>
    </div>
  );
};

export default DrawerSummaryBanner;
