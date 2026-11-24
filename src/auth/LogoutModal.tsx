import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { FiLogOut } from 'react-icons/fi';
import { useClerk, useAuth } from '@clerk/react';

export interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onLogoutSuccess?: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  open,
  onClose,
  onLogoutSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const { signOut } = useClerk();
  const { sessionId } = useAuth();

  const handleConfirm = async () => {
    try {
      setLoading(true);
      message.success('Logged out successfully');
      onClose();
      onLogoutSuccess?.();
      // Pass the specific sessionId so Clerk only signs out THIS account
      // and does not sign out all other active accounts/sessions
      if (sessionId) {
        await signOut?.({ sessionId });
      } else {
        await signOut?.();
      }
    } catch {
      message.error('Failed to log out');
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      width={400}
      className="theme-modal"
    >
      <div className="flex flex-col items-center text-center py-2">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-3">
          <FiLogOut size={22} />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-font m-0">
          Log out of Expense-Tracker?
        </h3>
        <p className="text-xs text-font-secondary mt-1.5 mb-5">
          Are you sure you want to end your current session?
        </p>

        {/* Buttons matching screenshot: Red left, Gray right using Ant Design Button */}
        <div className="flex items-center justify-center gap-3 w-full">
          <Button
            type="primary"
            danger
            loading={loading}
            onClick={handleConfirm}
            className="flex-1 !h-auto !py-2.5 !px-4 !rounded-xl text-xs sm:text-sm font-semibold !text-on-brand !bg-error hover:!bg-error/90 active:scale-98 transition-all !border-none shadow-sm"
          >
            Yes, I want to log out
          </Button>

          <Button
            type="default"
            disabled={loading}
            onClick={onClose}
            className="flex-1 !h-auto !py-2.5 !px-4 !rounded-xl text-xs sm:text-sm font-semibold !text-font !bg-background-tertiary hover:!bg-border active:scale-98 transition-all border !border-border shadow-sm"
          >
            No, I'm staying
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
