import { Card, Button } from 'antd';
import { FiCheck } from 'react-icons/fi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import useProfileStore from '../../../store/profileStore';
import { ACCENT_PALETTE, applyAccentColor } from '../../../themeprovide/theme';

export const ApperanceColor = () => {
  const { appearance, updateAppearance } = useProfileStore();

  const handleAccentChange = (accentId: string) => {
    updateAppearance({ accent: accentId });
    applyAccentColor(accentId);
  };

  const currentAccent = appearance.accent || 'charcoal';

  return (
    <Card className="!rounded-2xl !border !border-border !bg-modal-bg shadow-xs">
      <div className="flex items-center gap-2 mb-1">
        <IoColorPaletteOutline className="text-font text-2xl" />
        <h3 className="text-2xl font-bold text-font m-0 tracking-tight">Accent color</h3>
      </div>
      <div className="text-xs text-font-secondary mt-0 mb-5">
        Choose your application's primary color.
      </div>

      <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
        {ACCENT_PALETTE.map(({ id, name }) => {
          const isSelected = currentAccent === id;
          return (
            <div key={id} className="flex flex-col items-center gap-2">
              <Button
                type="text"
                shape="circle"
                onClick={() => handleAccentChange(id)}
                className={`!w-10 !h-10 !p-0 !flex !items-center !justify-center transition-transform cursor-pointer !border-0 swatch-${id} ${
                  isSelected ? 'scale-110 shadow-md' : 'hover:scale-105'
                }`}
              >
                {isSelected && <FiCheck className="text-on-brand text-xl" />}
              </Button>
              <div className="text-xs text-font-secondary">{name}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ApperanceColor;
