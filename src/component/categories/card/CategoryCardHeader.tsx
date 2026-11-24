// src/features/categories/components/grid/CategoryCardHeader.tsx
import React from 'react';
import { getCategoryIconElement } from '../constants/categoryIcons';
import { normalizeCategoryColor } from '../constants/categoryColors';

interface CategoryCardHeaderProps {
  name: string;
  color: string;
  icon: string;
}

export const CategoryCardHeader: React.FC<CategoryCardHeaderProps> = ({
  name,
  color,
  icon,
}) => {
  const colorKey = normalizeCategoryColor(color);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs cat-badge-${colorKey}`}
      >
        {getCategoryIconElement(icon)}
      </div>

      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full shrink-0 cat-dot-${colorKey}`} />
        <h3 className="text-sm font-bold text-font m-0 tracking-tight line-clamp-1">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCardHeader;
