// src/features/categories/components/grid/CategoryProgressBar.tsx
import React from 'react';
import { Progress } from 'antd';
import type { GetProp, ProgressProps } from 'antd';

export const progressClassNames: ProgressProps['classNames'] = {
  root: 'demo-progress-root',
  rail: 'demo-progress-rail',
  track: 'demo-progress-track',
};

export const progressStylesFn: ProgressProps['styles'] = (info): GetProp<ProgressProps, 'styles', 'Return'> => {
  const percent = info?.props?.percent ?? 0;
  const hue = 200 - (200 * percent) / 100;
  return {
    track: {
      backgroundImage: `
        linear-gradient(
          to right,
          hsla(${hue}, 85%, 65%, 1),
          hsla(${hue + 30}, 90%, 55%, 0.95)
        )`,
      borderRadius: 8,
      transition: 'all 0.3s ease',
    },
    rail: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 8,
    },
  };
};

interface CategoryProgressBarProps {
  percent: number;
  color?: string;
  isOver?: boolean;
}

export const CategoryProgressBar: React.FC<CategoryProgressBarProps> = ({
  percent,
}) => {
  const cappedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className="w-full">
      <Progress
        percent={cappedPercent}
        showInfo={false}
        size="small"
        classNames={progressClassNames}
        styles={progressStylesFn}
      />
    </div>
  );
};

export default CategoryProgressBar;
