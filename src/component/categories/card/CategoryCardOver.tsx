// src/component/categories/card/CategoryCardOver.tsx
import React from 'react';
import type { Category } from '../../../types/categorytypes';
import { useCategoryStats } from '../hooks/useCategoryStats';

interface CategoryCardOverProps {
  category: Category;
}

export const CategoryCardOver: React.FC<CategoryCardOverProps> = ({ category }) => {
  const {
    formattedSpent,
    formattedBudget,
    isOver,
    isFullyUsed,
    progressPercent,
  } = useCategoryStats(category);

  return (
    <div className="flex items-center justify-between text-xs font-medium">
      <div className={isOver ? 'text-error font-semibold' : 'text-font-secondary'}>
        {formattedSpent} of {formattedBudget}
      </div>
      <div
        className={
          isOver
            ? 'text-[11px] text-error font-bold'
            : isFullyUsed
              ? 'text-[11px] text-font-secondary font-semibold'
              : 'text-[11px] text-font-secondary'
        }
      >
        {isOver ? (
          <div>{progressPercent}% Over Used</div>
        ) : isFullyUsed ? (
          <div>Budget fully used</div>
        ) : (
          <div>{progressPercent}% Used</div>
        )}
      </div>
    </div>
  );
};

export default CategoryCardOver;
