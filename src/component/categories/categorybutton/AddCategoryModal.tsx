// src/features/categories/components/modals/AddCategoryModal.tsx
import React, { useState } from 'react';
import { Modal, Button, Input, Tabs, message } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { useCategoryStore } from '../store(Zustand)/useCategoryStore';
import { IconPickerGrid } from './IconPickerGrid';
import { ColorSwatchPicker } from './ColorSwatchPicker';
import { DEFAULT_CATEGORY_COLOR } from '../constants/categoryConstants';
import { validateCategoryName, validateAmount } from '../utils/categoryValidators';

export const AddCategoryModal: React.FC = () => {
  const isAddModalOpen = useCategoryStore((state) => state.isAddModalOpen);
  const closeAddModal = useCategoryStore((state) => state.closeAddModal);
  const addCategory = useCategoryStore((state) => state.addCategory);

  const [activeTab, setActiveTab] = useState<'default' | 'custom'>('default');
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [initialSpent, setInitialSpent] = useState('');
  const [icon, setIcon] = useState('sparkles');
  const [color, setColor] = useState(DEFAULT_CATEGORY_COLOR);

  const resetForm = () => {
    setName('');
    setBudget('');
    setInitialSpent('');
    setIcon('sparkles');
    setColor(DEFAULT_CATEGORY_COLOR);
    setActiveTab('default');
  };

  const handleClose = () => {
    resetForm();
    closeAddModal();
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key as 'default' | 'custom');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameCheck = validateCategoryName(name);
    if (!nameCheck.valid) {
      message.error(nameCheck.error);
      return;
    }

    const budgetCheck = validateAmount(budget);
    if (!budgetCheck.valid) {
      message.error('Please enter a valid monthly limit');
      return;
    }

    const initialCheck = validateAmount(initialSpent);
    const initialSpentVal = initialCheck.valid ? initialCheck.amount : 0;

    addCategory({
      name: name.trim(),
      type: 'expense',
      budget: budgetCheck.amount,
      initialSpent: initialSpentVal,
      color,
      icon,
      isDefault: activeTab === 'default',
    });

    message.success(
      activeTab === 'default'
        ? 'Default category created successfully'
        : 'Custom category created successfully'
    );
    handleClose();
  };

  return (
    <Modal
      open={isAddModalOpen}
      onCancel={handleClose}
      footer={null}
      centered
      closable={false}
      width={500}
      className="theme-modal"
    >
      <div className="flex flex-col gap-4 py-1">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <h2 className="text-base font-bold text-font m-0">Add New Category</h2>
          <Button
            type="text"
            shape="circle"
            icon={<RxCross2 size={18} />}
            onClick={handleClose}
            className="!text-font-tertiary hover:!text-font hover:!bg-background-secondary !border-none"
          />
        </div>

        {/* Ant Design Tabs centered */}
        <Tabs
          centered
          activeKey={activeTab}
          onChange={handleTabChange}
          className="category-modal-tabs"
          items={[
            {
              key: 'default',
              label: 'Default categories',
            },
            {
              key: 'custom',
              label: 'Custom categories',
            },
          ]}
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-font">Category Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={activeTab === 'default' ? 'e.g. Food & Drink, Transport...' : 'e.g. Subscriptions, Gaming...'}
              className="!rounded-xl !bg-modal-input !border-border !text-font !py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-start">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-font">Monthly Limit ($)</label>
              <Input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="500.00"
                className="!rounded-xl !bg-modal-input !border-border !text-font !py-2"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-font">Initial Spent Amount ($)</label>
              <Input
                value={initialSpent}
                onChange={(e) => setInitialSpent(e.target.value)}
                placeholder="0.00"
                className="!rounded-xl !bg-modal-input !border-border !text-font !py-2"
              />
            </div>
          </div>

          <IconPickerGrid
            selectedIcon={icon}
            onSelect={setIcon}
          />

          <ColorSwatchPicker
            selectedColor={color}
            onSelect={setColor}
          />


          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-1">
            <Button
              type="text"
              onClick={handleClose}
              className="!rounded-full !text-font-secondary hover:!text-font font-medium"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="!rounded-full !bg-primary hover:!bg-primary-hover !text-on-brand !border-none font-semibold !px-6 !py-2.5 !h-auto shadow-xs"
            >
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
