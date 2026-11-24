// src/features/categories/components/modals/ColorSwatchPicker.tsx
import React from 'react';
import { Button } from 'antd';
import {
  CATEGORY_COLORS,
  normalizeCategoryColor,
  type CategoryColorKey,
} from '../constants/categoryColors';

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
      <div className="flex items-center gap-2.5 flex-wrap">
        {CATEGORY_COLORS.map((c) => {
          const isSelected = selectedKey === c;
          return (
            <Button
              key={c}
              type="text"
              shape="circle"
              onClick={() => onSelect(c)}
              className={`!w-7 !h-7 !p-0 !border-0 transition-transform cursor-pointer relative !flex !items-center !justify-center cat-swatch-${c} ${
                isSelected ? `scale-115 cat-swatch-selected-${c}` : 'scale-100'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorSwatchPicker;
