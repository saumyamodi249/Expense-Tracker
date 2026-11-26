import { useTotalCategoryStats } from '../../categories/hooks/useCategoryCalculationAndValidator';
import { CategoryProgressBar } from '../../categories/card/CategoryProgressBar';

export const ApperanceDashboard = () => {
  const {
    formattedSpent,
    formattedBudget,
    progressPercent,
    statusText,
    isOver,
  } = useTotalCategoryStats();

  return (
    <div className="rounded-xl border border-border p-4 bg-background mb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-font-secondary">Total Budget</div>
          <div className="text-2xl font-bold text-font tracking-tight mt-0.5">
            {formattedBudget}
          </div>
        </div>
        <div
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
            isOver ? 'text-error bg-error/10' : 'text-emerald-600 bg-emerald-500/10'
          }`}
        >
          {statusText || `${progressPercent}% used`}
        </div>
      </div>

      {/* Monthly Budget Progress Bar */}
      <div className="mt-4 p-3 rounded-lg bg-background-secondary border border-border">
        <div className="flex items-center justify-between text-xs text-font-secondary mb-1.5">
          <div>Monthly budget</div>
          <div className="font-semibold text-font">{progressPercent}%</div>
        </div>

        <CategoryProgressBar percent={progressPercent} isOver={isOver} />

        <div className="flex items-center justify-between text-[11px] text-font-secondary mt-2">
          <div>{formattedSpent} spent</div>
          <div>{formattedBudget} total</div>
        </div>
      </div>
    </div>
  );
};

export default ApperanceDashboard;
