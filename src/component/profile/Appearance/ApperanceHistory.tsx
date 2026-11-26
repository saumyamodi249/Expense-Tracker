import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCategoryStore } from '../../categories/store(Zustand)/useCategoryStore';
import { formatCurrency } from '../../categories/utils/categoryCalculations';
import { getCategoryIconElement } from '../../categories/constants/categoryConstants';

export const ApperanceHistory = () => {
  const navigate = useNavigate();
  const transactions = useCategoryStore((state) => state.transactions);
  const categories = useCategoryStore((state) => state.categories);

  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-semibold text-font-secondary uppercase tracking-wider">
          Recent activity
        </div>
        <Button
          type="link"
          size="small"
          onClick={() => navigate('/expenses')}
          className="!text-xs !text-font-secondary hover:underline cursor-pointer !p-0 !h-auto"
        >
          View all
        </Button>
      </div>

      {recentTransactions.length === 0 ? (
        <div className="p-4 rounded-xl border border-dashed border-border bg-modal-input text-center">
          <div className="text-xs text-font-secondary">No recent transactions recorded yet.</div>
        </div>
      ) : (
        recentTransactions.map((tx) => {
          const cat = categories.find((c) => c.id === tx.categoryId);
          const icon = cat ? getCategoryIconElement(cat.icon, 18) : <FiShoppingBag size={18} />;
          const colorKey = cat?.color || 'charcoal';
          const hasNote = Boolean(
            tx.note &&
            tx.note.trim() !== '' &&
            tx.note !== 'Expense' &&
            tx.note !== 'Expense entry'
          );

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl border border-border bg-background"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 cat-badge-${colorKey} bg-background-secondary text-primary`}
                >
                  {icon}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-[16px] font-semibold text-font leading-tight">
                    {cat?.name || 'General Expense'}
                  </div>

                  {hasNote && (
                    <div className="text-[11px] text-font-secondary mt-0.5 line-clamp-1">
                      {tx.note}
                    </div>
                  )}

                  <div className="text-[10px] text-font-tertiary mt-0.5 flex items-center gap-1.5">
                    <div>{tx.date}</div>
                    {tx.time && <div className="text-[8px]">•</div>}
                    {tx.time && <div>{tx.time}</div>}
                  </div>
                </div>
              </div>
              <div className="text-xs font-semibold text-font">-{formatCurrency(tx.amount)}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ApperanceHistory;
