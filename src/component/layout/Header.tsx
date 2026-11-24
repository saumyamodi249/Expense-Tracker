// src/component/layout/Header.tsx
import React, { useState } from 'react';
import { Badge, Button, Popover, Space, Tooltip } from 'antd';
import { FiBell, FiCheck } from 'react-icons/fi';
import SearchBar from '../common/SearchBar';
import ThemeSwitcher from '../../themeprovide/ThemeSwitcher';
import AppAvatar from '../common/Avatar';
import type { RouteOption } from '../../types/type';
import { useCategoryStore } from '../categories';

export interface HeaderProps {
  onSearch?: (query: string) => void;
  onNavigate?: (route: RouteOption) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate }) => {
  const [hasUnread, setHasUnread] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const setSearchQuery = useCategoryStore((state) => state.setSearchQuery);

  const handleSearchChange = (val: string) => {
    setSearchValue(val);
    setSearchQuery(val);
    onSearch?.(val);
  };

  const notificationContent = (
    <div className="w-64 p-1">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
        <span className="text-xs font-semibold text-font">Notifications</span>
        {hasUnread && (
          <Button
            type="link"
            size="small"
            onClick={() => setHasUnread(false)}
            icon={<FiCheck />}
            className="!p-0 !h-auto !text-[11px] !text-primary hover:underline cursor-pointer flex items-center gap-1"
          >
            Mark read
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-2 rounded-xl bg-background-secondary text-xs">
          <p className="font-medium text-font m-0">Welcome to Expense Tracker!</p>
          <p className="text-font-secondary text-[11px] mt-0.5 m-0">
            Start organizing your categories, expenses, and monthly budget.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <header className="w-full px-6 py-3.5 border-b border-border bg-background flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
      {/* Search Bar matching Screenshot */}
      <div className="flex-1 max-w-md">
        <SearchBar
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search anything..."
        />
      </div>

      {/* Right controls aligned with Ant Design Space */}
      <Space size={14} align="center" className="shrink-0">
        {/* Theme Switcher (Moon/Sun toggle) */}
        <ThemeSwitcher />

        {/* Notifications Bell with badge */}
        <Popover content={notificationContent} trigger="click" placement="bottomRight">
          <Button
            type="text"
            shape="circle"
            aria-label="Notifications"
            className="!w-9 !h-9 !p-0 !flex !items-center !justify-center text-font-secondary hover:text-font hover:bg-background-tertiary transition-colors cursor-pointer relative border !border-border"
          >
            <Badge dot={hasUnread} className="notification-badge" offset={[-2, 2]}>
              <FiBell size={18} className="text-font-secondary hover:text-font" />
            </Badge>
          </Button>
        </Popover>

        {/* Reusable Theme Avatar */}
        <Tooltip title="View Profile">
          <AppAvatar
            size={36}
            gap={2}
            onClick={() => onNavigate?.('profile')}
          />
        </Tooltip>
      </Space>
    </header>
  );
};

export default Header;
