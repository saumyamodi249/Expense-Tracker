import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ProfileTab } from '../../../types/profiletypes';

export interface HeaderDetailsProps {
  activeTab?: ProfileTab;
  onTabChange?: (tab: ProfileTab) => void;
}

export const tabTitles: Record<ProfileTab, { title: string; subtitle: string }> = {
  account: {
    title: 'Account',
    subtitle: 'Manage your profile details and security settings.',
  },
  appearance: {
    title: 'Appearance',
    subtitle: 'Customize how your expense tracker looks and feels.',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Configure how and when you receive activity alerts.',
  },
};

export const HeaderDetails: React.FC<HeaderDetailsProps> = ({
  activeTab: propActiveTab,
  onTabChange,
}) => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();

  const activeTab: ProfileTab =
    propActiveTab ||
    (tab === 'appearance' || tab === 'notifications' ? tab : 'account');
  const currentInfo = tabTitles[activeTab] || tabTitles.account;

  const handleProfileClick = () => {
    if (onTabChange) {
      onTabChange('account');
    } else {
      navigate('/profile/account');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb: Profile › [activeTab] */}
      <div className="flex items-center gap-2 text-xs text-font-tertiary">
        <div onClick={handleProfileClick} className="cursor-pointer">
          Profile
        </div>
        <div className="text-font-tertiary">›</div>
        <div className="text-font font-medium capitalize">{activeTab}</div>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-font m-0 tracking-tight">
          {currentInfo.title}
        </h1>
        <div className="text-sm text-font-secondary mt-1.5">
          {currentInfo.subtitle}
        </div>
      </div>
    </div>
  );
};

export default HeaderDetails;
