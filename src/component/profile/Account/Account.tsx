import { Button, Input, InputNumber, DatePicker, Select, message, Divider } from 'antd';
import { FiUser, FiMail } from 'react-icons/fi';
import dayjs from 'dayjs';
import useProfileStore from '../../../store/profileStore';

const Account = () => {
  const { account, updateAccount } = useProfileStore();

  const handleSave = () => {
    message.success('Account settings saved');
  };

  return (
      <div className="rounded-[10px] border border-border bg-modal-bg p-6 shadow-xs max-w-[600px]">
      <div className="mb-5">
        <h3 className="text-2xl font-semibold text-font m-0">Account information</h3>
        <p className="text-xs text-font-secondary mt-1 mb-0">
          Update your account details and billing preferences
        </p> 
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-font-secondary">First name</label>
          <Input
            value={account.firstName}
            onChange={(e) => updateAccount({ firstName: e.target.value })}
            prefix={<FiUser className="text-font-tertiary mr-1.5" />}
            placeholder="e.g. Saumya"
            className="!rounded-xl !bg-modal-input !border-border !text-font !py-2"
          />
        </div>

        {/* Last name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-font-secondary">Last name</label>
          <Input
            value={account.lastName}
            onChange={(e) => updateAccount({ lastName: e.target.value })}
            prefix={<FiUser className="text-font-tertiary mr-1.5" />}
            placeholder="e.g. Modi"
            className="!rounded-xl !bg-modal-input !border-border !text-font !py-2"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-medium text-font-secondary">Email</label>
          <Input
            type="email"
            value={account.email}
            onChange={(e) => updateAccount({ email: e.target.value })}
            prefix={<FiMail className="text-font-tertiary mr-1.5" />}
            placeholder="e.g. saumyamodi2007@gmail.com"
            className="!rounded-xl !bg-modal-input !border-border !text-font !py-2"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-font-secondary">Age</label>
          <InputNumber
            controls={false}
            min={1}
            max={120}
            value={account.age ?? undefined}
            onChange={(val) => updateAccount({ age: val })}
            placeholder="e.g. 21"
            className="!w-full !rounded-xl !bg-modal-input !border-border !text-font [&_.ant-input-number-input]:!min-h-[40px] [&_.ant-input-number-input]:!text-font [&_.ant-input-number-handler-wrap]:!hidden"
          />
        </div>

        {/* Date of birth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-font-secondary">Date of birth</label>
          <DatePicker
            value={account.dateOfBirth ? dayjs(account.dateOfBirth) : null}
            onChange={(_, dateString) => {
              const dobStr = Array.isArray(dateString) ? dateString[0] : dateString;
              updateAccount({ dateOfBirth: dobStr || null });
            }}
            placeholder="Select date of birth"
            className="!w-full !rounded-xl !bg-modal-input !border-border !text-font !min-h-[42px] [&_.ant-picker-input>input]:!text-font"
            format="YYYY-MM-DD"
          />
        </div>

        {/* Currency */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-font-secondary">Currency</label>
          <Select
            value={account.currency}
            onChange={(val) => updateAccount({ currency: val })}
            className="w-full !rounded-xl [&>.ant-select-selector]:!min-h-[42px] [&>.ant-select-selector]:!bg-modal-input [&>.ant-select-selector]:!border-border [&>.ant-select-selector]:!rounded-xl [&_.ant-select-selection-item]:!text-font [&_.ant-select-selection-item]:!leading-[40px]"
            options={[
              { value: 'USD ($)', label: 'USD ($)' },
              { value: 'INR (₹)', label: 'INR (₹)' },
              { value: 'EUR (€)', label: 'EUR (€)' },
              { value: 'GBP (£)', label: 'GBP (£)' },
            ]}
          />
        </div>

        {/* Timezone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-font-secondary">Timezone</label>
          <Select
            value={account.timezone}
            onChange={(val) => updateAccount({ timezone: val })}
            className="w-full !rounded-xl [&>.ant-select-selector]:!min-h-[42px] [&>.ant-select-selector]:!bg-modal-input [&>.ant-select-selector]:!border-border [&>.ant-select-selector]:!rounded-xl [&_.ant-select-selection-item]:!text-font [&_.ant-select-selection-item]:!leading-[40px]"
            options={[
              { value: 'GMT+05:30', label: 'GMT+05:30 (India Standard Time)' },
              { value: 'GMT+00:00', label: 'GMT+00:00 (UTC)' },
              { value: 'GMT+01:00', label: 'GMT+01:00 (Central European Time)' },
              { value: 'GMT-05:00', label: 'GMT-05:00 (Eastern Time)' },
            ]}
          />
        </div>
      </div>

      <Divider className="!my-5 !border-border" />

      <div className="flex justify-end">
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

export default Account;
