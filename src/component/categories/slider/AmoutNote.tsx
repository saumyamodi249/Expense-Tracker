import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import type { Category } from '../../../types/categorytypes';
import { validateAmount } from '../utils/categoryValidators';

interface AmoutNoteProps {
  category: Category;
  onLogTransaction: (dto: {
    categoryId: string;
    amount: number;
    note: string;
  }) => void;
}

export const AmoutNote: React.FC<AmoutNoteProps> = ({
  category,
  onLogTransaction,
}) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const check = validateAmount(amount);
    if (!check.valid || !check.amount || check.amount <= 0) {
      message.error('Please enter a valid amount greater than 0');
      return;
    }

    onLogTransaction({
      categoryId: category.id,
      amount: check.amount,
      note: note.trim() || 'Expense entry',
    });

    message.success('Expense logged & progress updated');
    setAmount('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="text-[11px] font-bold text-font-tertiary uppercase tracking-wider">
        Log Expense
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-semibold text-font">Amount ($)</label>
        <Input
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="!rounded-xl !bg-modal-input !border-border !text-font !py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-semibold text-font">Note</label>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Starbuck's Coffee, Grocery run..."
          className="!rounded-xl !bg-modal-input !border-border !text-font !py-2"
        />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="!w-full !rounded-xl !bg-primary hover:!bg-primary-hover !text-on-brand !border-none font-semibold !py-2.5 !h-auto shadow-xs mt-1"
      >
        Save Expense & Update Progress
      </Button>
    </form>
  );
};

export default AmoutNote;
