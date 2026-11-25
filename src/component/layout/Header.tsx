// src/component/layout/Header.tsx
import React, { useState } from 'react';
import { Avatar, Badge, Button, Input, Space, Tooltip } from 'antd';
import { FiBell, FiSearch } from 'react-icons/fi';
import { useUser } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../../themeprovide/ThemeSwitcher';
import useProfileStore from '../../store/profileStore';
import type { RouteOption } from '../../types/auth';
import { useCategoryStore } from '../categories/store(Zustand)/useCategoryStore';
import { getInitials } from '../profile/common/Profile';

export interface HeaderProps {
  onSearch?: (query: string) => void;
  onNavigate?: (route: RouteOption) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate }) => {
  const [searchValue, setSearchValue] = useState('');
  const setSearchQuery = useCategoryStore((state) => state.setSearchQuery);
  const navigate = useNavigate();

  const { account } = useProfileStore();
  const { user } = useUser();

  const displayName = account.fullName || user?.fullName || 'User';
  const initial = getInitials(displayName);

  const handleSearchChange = (val: string) => {
    setSearchValue(val);
    setSearchQuery(val);
    onSearch?.(val);
  };

  return (
    <header className="h-16 px-6 sm:px-8 border-b border-border bg-sidebar flex items-center justify-between gap-4 sticky top-0 z-10 shrink-0">
      {/* Search Bar */}
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

        {/* Notifications Bell */}
        <Tooltip title="Notifications">
          <Button
            type="text"
            shape="circle"
            aria-label="Notifications"
            onClick={() => {
              onNavigate?.('profile');
              navigate('/profile/notifications');
            }}
            className="!w-9 !h-9 !p-0 !flex !items-center !justify-center text-font-secondary hover:text-font hover:bg-background-tertiary transition-colors cursor-pointer relative border !border-border"
          >
            <Badge dot className="notification-badge" offset={[-2, 2]}>
              <FiBell size={18} className="text-font-secondary hover:text-font" />
            </Badge>
          </Button>
        </Tooltip>

        {/* Profile Avatar */}
        <Tooltip title="View Profile">
          <Avatar
            size={36}
            onClick={() => {
              onNavigate?.('profile');
              navigate('/profile/account');
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
