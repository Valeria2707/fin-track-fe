'use client';

import { useGetCountOfTransactionsQuery, useGetIncomeVsExpensesQuery } from '@/features/analyticApi';
import Error from '@/components/shared/Error';
import { Skeleton } from '../ui/skeleton';
import { getDisplayMonth, getPreviousMonthRange } from '@/utils/date';
import SummaryCard from './SummaryCard';

type Props = {
  from: string;
  to: string;
};

const MonthlySummaryContainer: React.FC<Props> = ({ from, to }) => {
  const { prevFrom, prevTo } = getPreviousMonthRange(from, to);

  const { data: countData, isLoading: isLoadingCount, isError: isErrorCount } = useGetCountOfTransactionsQuery({ from, to });
  const { data: currentStats, isLoading: isLoadingCurrent, isError: isErrorCurrent } = useGetIncomeVsExpensesQuery({ from, to });
  const { data: prevStats, isLoading: isLoadingPrev, isError: isErrorPrev } = useGetIncomeVsExpensesQuery({ from: prevFrom, to: prevTo });

  const isLoading = isLoadingCount || isLoadingCurrent || isLoadingPrev;

  const isError = isErrorCount || isErrorCurrent || isErrorPrev || !countData || !currentStats || !prevStats;

  if (isLoading) {
    return <Skeleton className="h-28 w-full" />;
  }

  if (isError) {
    return <Error text="Failed to load analytics data. Please try again." />;
  }

  const incomeDiff = currentStats.income - prevStats.income;
  const expenseDiff = currentStats.expenses - prevStats.expenses;
  const balanceDiff = currentStats.balance - prevStats.balance;

  return (
    <div className="p-6 rounded-xl border bg-white shadow-md flex flex-col items-center space-y-5 w-full">
      <h3 className="text-xl font-bold text-gray-800">Summary for {getDisplayMonth(from)}</h3>
      <p className="text-gray-700 text-sm leading-relaxed">
        During {getDisplayMonth(from)}, a total of <span className="font-semibold text-gray-900">{countData.income + countData.expenses}</span> transactions
        were recorded. Of these,
        <span className="font-semibold text-green-700"> {countData.income} income</span> and
        <span className="font-semibold text-red-700"> {countData.expenses} expenses</span>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <SummaryCard
          title="Income Change"
          value={incomeDiff}
          color="green"
          description={`${incomeDiff >= 0 ? 'Increased inflow.' : 'Decreased income.'} compared to the previous month.`}
        />
        <SummaryCard
          title="Expense Change"
          value={expenseDiff}
          color="red"
          description={`${expenseDiff >= 0 ? 'Higher expenses.' : 'Spending reduced.'} compared to last month.`}
        />
        <SummaryCard
          title="Balance Change"
          value={balanceDiff}
          color="blue"
          description={`Your overall financial result has ${balanceDiff >= 0 ? 'improved.' : 'declined.'}`}
        />
      </div>
    </div>
  );
};

export default MonthlySummaryContainer;
