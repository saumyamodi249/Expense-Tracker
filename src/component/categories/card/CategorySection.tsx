// src/features/categories/components/grid/CategorySection.tsx
import React from 'react';

interface CategorySectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  count,
  children,
}) => {
  return (
    <section className="flex flex-col gap-3.5 w-full">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold text-font m-0">{title}</h2>
        <div className="px-2 py-0.5 rounded-full text-xs font-semibold bg-background-tertiary text-font-secondary">
          {count}
        </div>
      </div>

      {count === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-border bg-modal-input/30 text-center flex flex-col items-center justify-center">
          <div className="text-xs text-font-secondary font-medium">
            No {title.toLowerCase()} added yet. Click &quot;Add Category&quot; to create one.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
          {children}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
