// src/component/categories/card/CategoryCard.tsx
import React from 'react';
import { Card } from 'antd';
import type { Category } from '../../../types/categorytypes';
import { CategoryCardHeader } from './CategoryCardHeader';
import { CategoryCardOver } from './CategoryCardOver';
import { CategoryProgressBar } from './CategoryProgressBar';
import { useCategoryStats } from '../hooks/useCategoryCalculationAndValidator';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const { progressPercent, isOver } = useCategoryStats(category);

  return (
    <Card
      onClick={onClick}
      className="!rounded-3xl !border !border-border !bg-modal-bg hover:!border-primary/50 hover:!shadow-md cursor-pointer select-none active:scale-[0.985] transition-all duration-200"
      classNames={{
        body: '!p-5 sm:!p-5.5 !flex !flex-col !justify-between !gap-4 !h-full',
      }}
    >
      <CategoryCardHeader
        name={category.name}
        color={category.color}
        icon={category.icon}
      />

      <div className="flex flex-col gap-2">
        <CategoryCardOver category={category} />

        <CategoryProgressBar percent={progressPercent} isOver={isOver} />
      </div>
    </Card>
  );
};

export default CategoryCard;
