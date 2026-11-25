// src/component/layout/Header.tsx
import React, { useState } from 'react';
import { Avatar, Badge, Button, Input, Popover, Space, Tooltip } from 'antd';
import { FiBell, FiCheck, FiSearch } from 'react-icons/fi';
import { useUser } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../../themeprovide/ThemeSwitcher';
import useProfileStore from '../../store/profileStore';
import type { RouteOption } from '../../types/type';
import { useCategoryStore } from '../categories/store/useCategoryStore';

export interface HeaderProps {
  onSearch?: (query: string) => void;
  onNavigate?: (route: RouteOption) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate }) => {
  const [hasUnread, setHasUnread] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const setSearchQuery = useCategoryStore((state) => state.setSearchQuery);
  const navigate = useNavigate();

  const { account } = useProfileStore();
  const { user } = useUser();

  const clerkName = user?.fullName || user?.firstName;
  const displayName =
    account.fullName && account.fullName !== 'Aria Raymond'
      ? account.fullName
      : clerkName || account.fullName || 'User';

  const initial = displayName.trim()[0]?.toUpperCase() || 'U';

  const handleSearchChange = (val: string) => {
    setSearchValue(val);
    setSearchQuery(val);
    onSearch?.(val);
  };

  const notificationContent = (
    <div className="w-64 p-1">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
        <div className="text-xs font-semibold text-font">Notifications</div>
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
    <header className="h-16 px-6 sm:px-8 border-b border-border bg-sidebar flex items-center justify-between gap-4 sticky top-0 z-10 shrink-0">
      {/* Search Bar matching Image 2 */}
      <div className="w-72 sm:w-80">
        <Input
          prefix={<FiSearch className="text-font-secondary mr-1 text-sm" />}
          placeholder="Search categories..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          allowClear
          className="chat-search-input !rounded-full !bg-background-secondary !border-border hover:!border-border focus:!border-border !text-font !text-xs !py-1.5 !px-3 shadow-none"
        />
      </div>

      {/* Right Action Icons: Theme Toggle + Notification Bell + Avatar */}
      <Space size={12} align="center">
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

        {/* Profile Avatar */}
        <Tooltip title="View Profile">
          <Avatar
            size={36}
            onClick={() => {
              onNavigate?.('profile');
              navigate('/profile');
            }}
            className="theme-avatar shrink-0 select-none cursor-pointer"
          >
            {initial}
          </Avatar>
        </Tooltip>
      </Space>
    </header>
  );
};

export default Header;
