// src/features/categories/components/drawer/EditBudgetForm.tsx
import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import type { Category } from '../types/category.types';
import { validateAmount } from '../utils/categoryValidators';

interface EditBudgetFormProps {
  category: Category;
  onUpdateLimit: (categoryId: string, newLimit: number) => void;
  onClose: () => void;
}

export const EditBudgetForm: React.FC<EditBudgetFormProps> = ({
  category,
  onUpdateLimit,
  onClose,
}) => {
  const [limit, setLimit] = useState(String(category.budget || 500));

  const handleSave = () => {
    const check = validateAmount(limit);
    if (!check.valid || check.amount === undefined) {
      message.error('Please enter a valid budget amount');
      return;
    }

    onUpdateLimit(category.id, check.amount);
    message.success('Monthly limit updated');
    onClose();
  };

  return (
    <div className="p-3.5 rounded-2xl bg-modal-input border border-border flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-font">
          Edit Monthly {category.type === 'expense' ? 'Budget Limit' : 'Income Goal'}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="500.00"
          className="!rounded-xl !bg-modal-bg !border-border !text-font flex-1"
        />
        <Button
          onClick={onClose}
          className="!rounded-xl !bg-background-secondary hover:!bg-background-tertiary !text-font-secondary hover:!text-font !border !border-border font-semibold shrink-0"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSave}
          className="!rounded-xl !bg-primary hover:!bg-primary-hover !text-white !border-none font-semibold shrink-0"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditBudgetForm;
