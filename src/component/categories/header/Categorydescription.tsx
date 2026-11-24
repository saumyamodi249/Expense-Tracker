// src/features/categories/components/header/CategoryPageHeader.tsx
import React from 'react';
import { Button } from 'antd';
import { RxPlus } from 'react-icons/rx';
import CategoryBreadcrumb from './CategoryNav';

interface CategoryPageHeaderProps {
  onAddClick: () => void;
}

export const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <CategoryBreadcrumb />

      <div className="flex items-start sm:items-center justify-between gap-4 pt-1 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-font m-0 tracking-tight">
            Categories
          </h1>
          <p className="text-xs sm:text-sm text-font-secondary mt-1 mb-0">
            Group your spending and keep budgets in check.
          </p>
        </div>

        <Button
          type="primary"
          icon={<RxPlus size={16} />}
          onClick={onAddClick}
          className="!bg-primary hover:!bg-primary-hover !text-white !text-xs sm:text-sm !font-semibold !px-5 !py-2.5 !h-auto !rounded-full !flex !items-center !gap-1.5 cursor-pointer shadow-xs !border-none"
        >
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryPageHeader;
