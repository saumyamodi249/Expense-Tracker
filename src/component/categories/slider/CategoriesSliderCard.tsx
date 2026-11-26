import React from 'react';
import type { Category } from '../../../types/categorytypes';
import { useCategoryStats } from '../hooks/useCategoryCalculationAndValidator';
import { normalizeCategoryColor } from '../constants/categoryConstants';
import { CategoryProgressBar } from '../card/CategoryProgressBar';

interface CategoriesSliderCardProps {
  category: Category;
}

export const CategoriesSliderCard: React.FC<CategoriesSliderCardProps> = ({ category }) => {
  const {
    progressPercent,
    formattedSpent,
    formattedBudget,
    isOver,
    isFullyUsed,
    statusText,
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
        <div className={isOver ? 'text-error font-bold' : 'text-font-secondary'}>
          {progressPercent}% used
        </div>
        <div
          className={
            isOver
              ? 'text-error font-bold'
              : isFullyUsed
                ? 'text-font-secondary'
                : `cat-text-${colorKey}`
          }
        >
          {statusText}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <CategoryProgressBar percent={progressPercent} isOver={isOver} />
      </div>
    </div>
  );
};

export default CategoriesSliderCard;
