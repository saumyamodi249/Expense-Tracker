import React from 'react';
import Items from '../component/items/Items';
import type { RouteOption } from '../types/type';

interface PathProps {
  currentRoute: RouteOption;
}

const Path: React.FC<PathProps> = ({ currentRoute }) => {
  switch (currentRoute) {
    case 'dashboard':
      return (
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-xl font-bold text-font mb-2 mt-0">Dashboard</h2>
          <p className="text-sm text-font-secondary m-0">Dashboard view</p>
        </div>
      );

    case 'expenses':
      return (
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-xl font-bold text-font mb-2 mt-0">Expenses</h2>
          <p className="text-sm text-font-secondary m-0">Expenses view</p>
        </div>
      );

    case 'items':
    default:
      return <Items />;
  }
};

export default Path;
