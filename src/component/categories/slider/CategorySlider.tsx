// src/features/categories/components/drawer/CategoryDetailDrawer.tsx
import React, { useState } from 'react';
import { Drawer, Popconfirm, Button } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { FiTrash2 } from 'react-icons/fi';
import { useCategoryDrawer } from '../hooks/useCategoryDrawer';
import { getCategoryIconElement } from '../constants/categoryIcons';
import { normalizeCategoryColor } from '../constants/categoryColors';
import { DrawerSummaryBanner } from './CategoriesSliderCard';
import { QuickTransactionForm } from './AmoutNote';
import { CategoryTransactionList } from './CategoryTransactionList';
import { EditBudgetForm } from './EditBudgetLimit';

export const CategoryDetailDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    activeCategory,
    activeTransactions,
    closeDrawer,
    deleteCategory,
    updateLimit,
    logTransaction,
  } = useCategoryDrawer();

  const [isEditingBudget, setIsEditingBudget] = useState(false);

  if (!activeCategory) return null;
  const colorKey = normalizeCategoryColor(activeCategory.color);

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => {
        setIsEditingBudget(false);
        closeDrawer();
      }}
      closable={false}
      width={420}
      className="theme-drawer"
    >
      <div className="flex flex-col h-full justify-between gap-6">
        {/* Top Content Area */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-0.5">
          {/* Header matching Screenshot 4 */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs cat-badge-${colorKey}`}
              >
                {getCategoryIconElement(activeCategory.icon)}
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-font m-0 tracking-tight">
                  {activeCategory.name}
                </h3>
                <div className="text-xs text-font-secondary">
                  {activeCategory.isDefault ? 'Default Category' : 'Custom Category'}
                </div>
              </div>
            </div>

            <Button
              type="text"
              shape="circle"
              icon={<RxCross2 size={18} />}
              onClick={closeDrawer}
              className="!text-font-tertiary hover:!text-font hover:!bg-background-secondary !border-none"
              aria-label="Close drawer"
            />
          </div>

          {/* Big Figure Summary Banner */}
          <DrawerSummaryBanner category={activeCategory} />

          {/* Inline Edit Budget Form if active, otherwise Quick Transaction Form */}
          {isEditingBudget ? (
            <EditBudgetForm
              category={activeCategory}
              onUpdateLimit={updateLimit}
              onClose={() => setIsEditingBudget(false)}
            />
          ) : (
            <QuickTransactionForm
              category={activeCategory}
              onLogTransaction={logTransaction}
            />
          )}

          {/* Transaction History */}
          <CategoryTransactionList transactions={activeTransactions} />
        </div>

        {/* Footer matching Screenshot 4: Delete Category on left, Edit Budget Limit on right */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Popconfirm
            title="Delete this category?"
            description="All category metrics will be permanently removed."
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => deleteCategory(activeCategory.id)}
          >
            <Button
              type="text"
              danger
              icon={<FiTrash2 size={14} />}
              className="!flex !items-center !gap-1.5 !text-xs !font-semibold !p-0 !h-auto !border-none"
            >
              Delete Category
            </Button>
          </Popconfirm>

          <Button
            type="text"
            onClick={() => setIsEditingBudget((prev) => !prev)}
            className="!text-xs !font-semibold !text-font-secondary hover:!text-font !p-0 !h-auto !border-none"
          >
            {isEditingBudget ? 'Close Edit Limit' : 'Edit Budget Limit'}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CategoryDetailDrawer;
