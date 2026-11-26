import React from 'react';

export const CategoryNav: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-font-tertiary">
      <div>Home</div>
      <div>›</div>
      <div className="text-font font-medium">Categories</div>
    </div>
  );
};

export default CategoryNav;
