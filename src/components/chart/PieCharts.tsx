'use client';

import { useGetExpensesByCategoryQuery } from '@/features/analyticApi';
import Error from '@/components/shared/Error';
import { CategoryPieChart } from './CategoryPieChart';
import { PieChartsSkeleton } from '../skeletons/PieChartsSkeleton';

type Props = {
  from: string;
  to: string;
};

export const PieCharts: React.FC<Props> = ({ from, to }) => {
  const { data = [], isLoading, isError } = useGetExpensesByCategoryQuery({ from, to });

  if (isLoading) return <PieChartsSkeleton />;
  if (isError) return <Error text="Failed to load category chart data" />;

  const incomeData = data.filter(d => d.type === 'income');
  const expenseData = data.filter(d => d.type === 'expense');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CategoryPieChart chartData={expenseData} title="Expenses by Category" />
      <CategoryPieChart chartData={incomeData} title="Income by Category" />
    </div>
  );
};
