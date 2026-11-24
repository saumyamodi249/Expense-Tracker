import { useState } from 'react';
import { Button } from 'antd';
import { FiLogOut } from 'react-icons/fi';
import type { LogoutProps } from '../types/auth';
import LogoutModal from './LogoutModal';

export default function Logout({ className = '', onLogoutSuccess }: LogoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="text"
        danger
        icon={<FiLogOut size={16} />}
        onClick={() => setOpen(true)}
        className={`!w-full !flex !items-center !justify-start !gap-3 !px-3.5 !py-2.5 !h-auto !rounded-xl !text-sm !font-medium hover:!bg-red-50 dark:hover:!bg-red-950/30 ${className}`}
      >
        Log Out
      </Button>

      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onLogoutSuccess={onLogoutSuccess}
      />
    </>
  );
}
