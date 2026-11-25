import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import Account from '../Account/Account';
import Appearance from '../Appearance/Appearance';
import Notifications from '../Notifications/Notifications';
import type { ProfileTab } from '../../../types/profiletypes';

const tabs: { label: string; value: ProfileTab }[] = [
  { label: 'Account', value: 'account' },
  { label: 'Appearance', value: 'appearance' },
  { label: 'Notifications', value: 'notifications' },
];

export const ProfileTabs = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();

  const activeTab: ProfileTab =
    tab === 'appearance' || tab === 'notifications' ? tab : 'account';

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2.5 mb-6">
        {tabs.map((t) => {
          const isActive = activeTab === t.value;
          return (
            <Button
              key={t.value}
              type="text"
              shape="round"
              onClick={() => navigate(`/profile/${t.value}`)}
              className={`!px-5 !py-1.5 !h-auto !text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? '!bg-primary !text-on-brand shadow-xs !border-transparent'
                  : 'bg-background-secondary !text-font-secondary border !border-border hover:!text-font hover:bg-background-tertiary'
              }`}
            >
              {t.label}
            </Button>
          );
        })}
      </div>

      <div className="w-full">
        {activeTab === 'account' && <Account />}
        {activeTab === 'appearance' && <Appearance />}
        {activeTab === 'notifications' && <Notifications />}
      </div>
    </div>
  );
};

export default ProfileTabs;
