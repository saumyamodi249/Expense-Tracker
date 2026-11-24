// src/component/categories/card/CategoryCardOver.tsx
import React from 'react';
import type { Category } from '../types/category.types';
import { useCategoryStats } from '../hooks/useCategoryStats';

interface CategoryCardOverProps {
  category: Category;
}

export const CategoryCardOver: React.FC<CategoryCardOverProps> = ({ category }) => {
  const { formattedSpent, formattedBudget, isOver } = useCategoryStats(category);

  return (
    <div className="flex items-center justify-between text-xs text-font-secondary font-medium">
      <div className={isOver ? 'text-error font-semibold' : ''}>
        {formattedSpent} of {formattedBudget}
      </div>
      {isOver && <div className="text-[10px] text-error font-bold uppercase">Over</div>}
    </div>
  );
};

export default CategoryCardOver;
