// src/component/layout/Sidebar.tsx
import React from 'react';
import { Layout, Button } from 'antd';
import { BiCategoryAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { RxDashboard } from 'react-icons/rx';
import { LuArrowLeftRight } from 'react-icons/lu';
import Logout from '../../auth/Logout';
import type { RouteOption } from '../../types/type';

const { Sider } = Layout;

export interface SidebarProps {
  currentRoute: RouteOption;
  onNavigate: (route: RouteOption) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  className = '',
}) => {
  return (
    <Sider
      width={230}
      className={`!bg-sidebar border-r border-border !h-screen shrink-0 sticky top-0 left-0 ${className}`}
    >
      <div className="h-full flex flex-col justify-between p-5">
        <div className="flex flex-col gap-6">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <img
              src="/money-management.png"
              alt="Expense Tracker"
              className="w-16 h-16 object-contain shrink-0"
            />
            <div className="flex flex-col justify-center">
              <div className="text-2xl font-extrabold text-font tracking-tight leading-tight">
                Expense
              </div>
              <div className="text-lg font-extrabold text-font tracking-tight leading-tight">
                Tracker
              </div>
            </div>
          </div>

          {/* Navigation pill buttons */}
          <nav className="flex flex-col gap-1.5">
            <Button
              type="text"
              icon={<RxDashboard size={17} className="shrink-0" />}
              onClick={() => onNavigate('dashboard')}
              className={`!w-full !flex !items-center !justify-start !gap-3 !px-4 !py-2.5 !h-auto !rounded-full !text-sm cursor-pointer transition-all ${
                currentRoute === 'dashboard'
                  ? '!bg-primary !text-on-brand !border-none !font-semibold shadow-xs'
                  : '!text-font-secondary !border-none hover:!bg-background-secondary hover:!text-font !font-medium'
              }`}
            >
              Dashboard
            </Button>

            <Button
              type="text"
              icon={<LuArrowLeftRight size={17} className="shrink-0" />}
              onClick={() => onNavigate('expenses')}
              className={`!w-full !flex !items-center !justify-start !gap-3 !px-4 !py-2.5 !h-auto !rounded-full !text-sm cursor-pointer transition-all ${
                currentRoute === 'expenses'
                  ? '!bg-primary !text-on-brand !border-none !font-semibold shadow-xs'
                  : '!text-font-secondary !border-none hover:!bg-background-secondary hover:!text-font !font-medium'
              }`}
            >
              Transactions
            </Button>

            <Button
              type="text"
              icon={<BiCategoryAlt size={17} className="shrink-0" />}
              onClick={() => onNavigate('categories')}
              className={`!w-full !flex !items-center !justify-start !gap-3 !px-4 !py-2.5 !h-auto !rounded-full !text-sm cursor-pointer transition-all ${
                currentRoute === 'categories'
                  ? '!bg-primary !text-on-brand !border-none !font-semibold shadow-xs'
                  : '!text-font-secondary !border-none hover:!bg-background-secondary hover:!text-font !font-medium'
              }`}
            >
              Categories
            </Button>

            <Button
              type="text"
              icon={<CgProfile size={17} className="shrink-0" />}
              onClick={() => onNavigate('profile')}
              className={`!w-full !flex !items-center !justify-start !gap-3 !px-4 !py-2.5 !h-auto !rounded-xl !text-sm cursor-pointer transition-all ${
                currentRoute === 'profile'
                  ? '!bg-primary !text-on-brand !border-none !font-semibold shadow-xs'
                  : '!text-font-secondary !border-none hover:!bg-background-secondary hover:!text-font !font-medium'
              }`}
            >
              Profile
            </Button>
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <div className="pt-2 border-t border-border">
            <Logout />
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
