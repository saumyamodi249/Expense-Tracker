// src/features/categories/components/grid/CategoryProgressBar.tsx
import React from 'react';
import { Progress } from 'antd';
import type { GetProp, ProgressProps } from 'antd';

export const progressClassNames: ProgressProps['classNames'] = {
  root: 'demo-progress-root',
  rail: 'demo-progress-rail',
  track: 'demo-progress-track',
};

export const getProgressStyles = (isOver?: boolean): ProgressProps['styles'] => (info): GetProp<ProgressProps, 'styles', 'Return'> => {
  if (isOver) {
    return {
      track: {
        backgroundColor: 'var(--theme-color-error)',
        backgroundImage: 'linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38))',
        borderRadius: 8,
        transition: 'all 0.3s ease',
      },
      rail: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
      },
    };
  }

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

export const progressStylesFn: ProgressProps['styles'] = getProgressStyles(false);

interface CategoryProgressBarProps {
  percent: number;
  isOver?: boolean;
}

export const CategoryProgressBar: React.FC<CategoryProgressBarProps> = ({
  percent,
  isOver,
}) => {
  const over = Boolean(isOver || percent > 100);
  const visualPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className="w-full">
      <Progress
        percent={visualPercent}
        showInfo={false}
        size="small"
        classNames={progressClassNames}
        styles={getProgressStyles(over)}
      />
    </div>
  );
};

export default CategoryProgressBar;
