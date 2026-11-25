// src/features/categories/components/modals/IconPickerGrid.tsx
import React from 'react';
import { Button } from 'antd';
import { SELECTABLE_ICONS } from '../constants/categoryConstants';

interface IconPickerGridProps {
  selectedIcon: string;
  onSelect: (iconKey: string) => void;
}

export const IconPickerGrid: React.FC<IconPickerGridProps> = ({
  selectedIcon,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-font">Choose Icon</label>
      <div className="grid grid-cols-8 sm:grid-cols-9 gap-2 max-h-40 overflow-y-auto p-1 hide-scrollbar">
        {SELECTABLE_ICONS.map((item) => {
          const isSelected = selectedIcon === item.key;
          return (
            <Button
              key={item.key}
              type="text"
              onClick={() => onSelect(item.key)}
              title={item.label}
              className={`!w-9 !h-9 !rounded-xl !p-0 !flex !items-center !justify-center shrink-0 cursor-pointer transition-all duration-150 !border ${
                isSelected
                  ? '!border-primary !border-2 !text-primary !bg-primary/10 shadow-xs scale-105'
                  : '!border-border bg-modal-input !text-font-secondary hover:!text-font hover:!border-font-secondary'
              }`}
            >
              {item.icon}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default IconPickerGrid;
