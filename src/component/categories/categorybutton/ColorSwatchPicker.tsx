// src/features/categories/components/modals/ColorSwatchPicker.tsx
import React from 'react';
import { Button } from 'antd';
import {
  CATEGORY_COLORS,
  normalizeCategoryColor,
  type CategoryColorKey,
} from '../constants/categoryConstants';

interface ColorSwatchPickerProps {
  selectedColor: string;
  onSelect: (color: CategoryColorKey) => void;
}

export const ColorSwatchPicker: React.FC<ColorSwatchPickerProps> = ({
  selectedColor,
  onSelect,
}) => {
  const selectedKey = normalizeCategoryColor(selectedColor);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-font">Accent Color</label>
      <div className="flex items-center justify-between w-full py-2.5 px-1 flex-nowrap">
        {CATEGORY_COLORS.map((c) => {
          const isSelected = selectedKey === c;
          return (
            <Button
              key={c}
              type="text"
              shape="circle"
              onClick={() => onSelect(c)}
              className={`!w-7 !h-7 !p-0 !border-0 transition-all cursor-pointer relative !flex !items-center !justify-center shrink-0 cat-swatch-${c} ${
                isSelected
                  ? `cat-swatch-selected-${c}`
                  : 'hover:scale-105 opacity-85 hover:opacity-100'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorSwatchPicker;
