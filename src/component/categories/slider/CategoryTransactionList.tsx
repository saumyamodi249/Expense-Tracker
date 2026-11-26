import React from 'react';
import { Button } from 'antd';
import { FiTrash2 } from 'react-icons/fi';
import type { TransactionItem } from '../../../types/categorytypes';
import { formatCurrency } from '../utils/categoryCalculations';

interface CategoryTransactionListProps {
  transactions: TransactionItem[];
  onDeleteTransaction?: (transactionId: string) => void;
}

export const CategoryTransactionList: React.FC<CategoryTransactionListProps> = ({
  transactions,
  onDeleteTransaction,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-[11px] font-bold text-font-tertiary uppercase tracking-wider">
        Category History
      </div>

      {transactions.length === 0 ? (
        <div className="p-4 rounded-xl border border-dashed border-border bg-modal-input text-center">
          <p className="text-xs text-font-secondary m-0">No transactions recorded yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl border border-border bg-modal-bg shadow-2xs"
            >
              <div className="flex flex-col">
                <div className="text-xs font-semibold text-font line-clamp-1">
                  {tx.note}
                </div>
                <div className="text-[10px] text-font-secondary mt-0.5">
                  {tx.date}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-font">
                  -{formatCurrency(tx.amount)}
                </div>
                {onDeleteTransaction && (
                  <Button
                    type="text"
                    size="small"
                    shape="circle"
                    danger
                    icon={<FiTrash2 size={12} />}
                    onClick={() => onDeleteTransaction(tx.id)}
                    className="!w-6 !h-6 !p-0 !min-w-0 !border-none text-font-tertiary hover:!text-error cursor-pointer"
                    aria-label="Delete transaction"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTransactionList;
