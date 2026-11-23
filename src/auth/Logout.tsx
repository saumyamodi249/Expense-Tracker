import { Button, Popconfirm } from 'antd';
import { FiLogOut } from 'react-icons/fi';
import { useClerk } from '@clerk/react';
import type { LogoutProps } from '../types/auth';

export default function Logout({ className = '', onLogoutSuccess }: LogoutProps) {
  const { signOut } = useClerk();

  return (
    <Popconfirm
      title="Log out of Expense-Tracker?"
      description="Are you sure you want to end your current session?"
      okText="Log Out"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      onConfirm={async () => {onLogoutSuccess?.();await signOut();}}
      placement="topRight"
    >
      <Button
        type="text"
        danger
        icon={<FiLogOut size={16} />}
        className={`!w-full !flex !items-center !justify-start !gap-3 !px-3.5 !py-2.5 !h-auto !rounded-xl !text-sm !font-medium hover:!bg-red-50 dark:hover:!bg-red-950/30 ${className}`}
      >
        Log Out
      </Button>
    </Popconfirm>
  );
}

