import { Card, Button, message } from 'antd';
import ThemePreferences from './ApperanceThemePreferences';
import ApperanceColor from './ApperanceColor';
import ApperanceDashboard from './ApperanceDashboard';
import ApperanceHistory from './ApperanceHistory';

export const Appearance = () => {
  const handleSave = () => {
    message.success('Appearance settings saved');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <ThemePreferences />
      <ApperanceColor />
      <Card
        className="!rounded-2xl !border !border-border !bg-modal-bg shadow-xs"
      >
        <h3 className="text-2xl font-bold text-font m-0 mb-4 tracking-tight">Dashboard preview</h3>
        <ApperanceDashboard />
        <ApperanceHistory />
      </Card>

      <div className="flex justify-end pt-2">
        <Button
          type="primary"
          onClick={handleSave}
          className="!rounded-xl !bg-primary hover:!bg-primary-hover !text-white font-medium cursor-pointer"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default Appearance;
