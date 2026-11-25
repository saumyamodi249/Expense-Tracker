import React from 'react';
import { Avatar, Card } from 'antd';
import { useUser } from '@clerk/react';
import useProfileStore from '../../../store/profileStore';

export interface ProfileCardProps {
  className?: string;
}

export function getInitials(name?: string): string {
  const parts = name?.trim().split(/\s+/).filter(Boolean) || [];
  if (!parts.length) return 'U';
  return (parts.length === 1 ? parts[0][0] : parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className = '' }) => {
  const { account } = useProfileStore();
  const { user } = useUser();

  const displayName = account.fullName || user?.fullName || 'User';
  const displayEmail = account.email || user?.primaryEmailAddress?.emailAddress || '';
  const initials = getInitials(displayName);

  return (
    <Card
      className={`!rounded-2xl !border !border-border !bg-modal-bg shadow-xs ${className}`}
      classNames={{
        body: '!p-6 !flex !flex-col !items-center !text-center',
      }}
    >
      <Avatar
        size={80}
        className="mb-3 theme-avatar shrink-0 select-none text-2xl font-bold"
      >
        {initials}
      </Avatar>

      <h3 className="text-xl font-semibold text-font mt-1">{displayName}</h3>
      <div className="text-xs text-font-secondary mt-1 break-all">{displayEmail}</div>
    </Card>
  );
};

export default ProfileCard;
