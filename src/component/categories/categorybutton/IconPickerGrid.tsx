// src/features/categories/components/modals/IconPickerGrid.tsx
import React from 'react';
import { Button } from 'antd';
import { SELECTABLE_ICONS } from '../constants/categoryIcons';

interface IconPickerGridProps {
  selectedIcon: string;
  onSelect: (iconKey: string) => void;
  accentColor?: string;
}

export const IconPickerGrid: React.FC<IconPickerGridProps> = ({
  selectedIcon,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-font">Choose Icon</label>
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
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
                  ? '!border-primary !border-2 !text-primary !bg-primary/10 shadow-xs'
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
