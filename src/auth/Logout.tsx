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
        icon={<FiLogOut size={17} className="shrink-0 text-red-500 dark:text-red-400" />}
        onClick={() => setOpen(true)}
        className={`!w-full !flex !items-center !justify-start !gap-3 !px-4 !py-2.5 !h-auto !rounded-full !text-sm !font-medium !border-none !text-red-500 hover:!text-red-600 hover:!bg-red-500/10 dark:!text-red-400 dark:hover:!text-red-300 dark:hover:!bg-red-500/15 cursor-pointer transition-all ${className}`}
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
