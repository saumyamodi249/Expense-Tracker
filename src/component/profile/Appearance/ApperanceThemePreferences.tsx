import { Card, Button } from 'antd';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import useProfileStore from '../../../store/profileStore';
import { setThemePreference } from '../../../themeprovide/theme';

const THEME_OPTIONS = [
  { id: 'light', label: 'Light', icon: FiSun },
  { id: 'dark', label: 'Dark', icon: FiMoon },
  { id: 'system', label: 'System', icon: FiMonitor },
] as const;

export const ApperanceThemePreferences = () => {
  const { appearance, updateAppearance } = useProfileStore();

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    updateAppearance({ theme });
    setThemePreference(theme);
  };

  const ActiveIcon = appearance.theme === 'dark' ? FiMoon : appearance.theme === 'system' ? FiMonitor : FiSun;

  return (
    <Card
      className="!rounded-2xl !border !border-border !bg-modal-bg shadow-xs"
    >
      <div className="flex items-center gap-2 mb-1">
        <ActiveIcon className="text-font text-2xl" />
        <h3 className="text-2xl font-bold text-font m-0 tracking-tight">Theme preferences</h3>
      </div>
      <div className="text-xs text-font-secondary mt-0 mb-4">
        Choose your preferred appearance.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {THEME_OPTIONS.map(({ id, label, icon: Icon }) => {
          const isSelected = appearance.theme === id;
          return (
            <Button
              key={id}
              type="text"
              onClick={() => handleThemeChange(id)}
              className={`!p-3 !rounded-xl !h-auto border text-left !flex !flex-col !justify-between min-h-[82px] cursor-pointer transition-all !w-full ${
                isSelected
                  ? '!border-font bg-modal-input shadow-xs ring-1 ring-font/20'
                  : '!border-border bg-transparent hover:!border-font-secondary/50'
              }`}
            >
              <div className="w-full flex items-center justify-center py-1">
                <Icon size={32} className="text-font" />
              </div>
              <div className="w-full flex items-center justify-between mt-auto pt-1">
                <div className="text-sm sm:text-base font-semibold text-font block">{label}</div>
                {isSelected && (
                  <div className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    Selected
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default ApperanceThemePreferences;
