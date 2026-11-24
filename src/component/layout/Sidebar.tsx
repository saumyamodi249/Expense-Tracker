// src/component/layout/Sidebar.tsx
import React from 'react';
import { Layout, Button, Progress } from 'antd';
import { BiCategoryAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { RxDashboard } from 'react-icons/rx';
import { LuArrowLeftRight } from 'react-icons/lu';
import Logout from '../../auth/Logout';
import type { RouteOption } from '../../types/type';
import { useCategoryStore, selectBudgetPercentage } from '../categories';

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
  const categories = useCategoryStore((state) => state.categories);
  const budgetPercentage = selectBudgetPercentage(categories);

  return (
    <Sider
      width={230}
      className={`!bg-background border-r border-border !h-screen shrink-0 sticky top-0 left-0 ${className}`}
    >
      <div className="h-full flex flex-col justify-between p-5">
        <div className="flex flex-col gap-7">
          {/* Logo matching Lumen in screenshot */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-on-brand flex items-center justify-center shrink-0 shadow-xs">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-16 0V6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-font tracking-tight m-0 leading-tight">
                Lumen
              </h2>
              <p className="text-[11px] text-font-secondary m-0 leading-tight mt-0.5">
                Finance Tracker
              </p>
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
              className={`!w-full !flex !items-center !justify-start !gap-3 !px-4 !py-2.5 !h-auto !rounded-full !text-sm cursor-pointer transition-all ${
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
          {/* Monthly Budget card matching screenshot */}
          <div className="p-3.5 rounded-2xl bg-background-secondary border border-border flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-font">June budget</span>
            <p className="text-[11px] text-font-secondary m-0 leading-relaxed">
              You've used {budgetPercentage}% of your monthly limit.
            </p>
            <div className="w-full mt-1">
              <Progress
                percent={Math.min(100, Math.max(0, budgetPercentage))}
                showInfo={false}
                size="small"
                className="budget-progress"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <Logout />
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
