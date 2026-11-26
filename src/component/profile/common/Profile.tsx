import React from 'react';
import { Avatar, Card } from 'antd';
import { useUser } from '@clerk/react';
import useProfileStore from '../../../store/profileStore';

export interface ProfileCardProps {
  className?: string;
}

export function getInitials(firstName?: string | null, lastName?: string | null): string {
  const f = firstName?.trim();
  const l = lastName?.trim();

  if (f && l) {
    return (f[0] + l[0]).toUpperCase();
  }
  if (f) {
    if (lastName === undefined) {
      const parts = f.split(/\s+/).filter(Boolean);
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
    }
    return f[0].toUpperCase();
  }
  if (l) {
    return l[0].toUpperCase();
  }
  return 'U';
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className = '' }) => {
  const { account } = useProfileStore();
  const { user } = useUser();

  const userFirst = account.firstName || user?.firstName || (user?.fullName ? user.fullName.split(' ')[0] : '');
  const userLast = account.lastName || user?.lastName || (user?.fullName ? user.fullName.split(' ').slice(1).join(' ') : '');
  const displayName = `${userFirst || ''} ${userLast || ''}`.trim() || 'User';
  const displayEmail = account.email || user?.primaryEmailAddress?.emailAddress || '';
  const initials = getInitials(userFirst, userLast);

  return (
    <Card
      className={`!rounded-2xl !border !border-border !bg-modal-bg shadow-xs ${className}`}
    >
      <div className="flex flex-col items-center text-center">
        <Avatar
          size={80}
          className="mb-3 theme-avatar shrink-0 select-none text-2xl font-bold"
        >
          {initials}
        </Avatar>

        <h3 className="text-xl font-semibold text-font mt-1">{displayName}</h3>
        <div className="text-xs text-font-secondary mt-1 break-all">{displayEmail}</div>
      </div>
    </Card>
  );
};

export default ProfileCard;
