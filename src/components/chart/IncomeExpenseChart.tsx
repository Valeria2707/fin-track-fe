'use client';

import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { useGetIncomeVsExpensesQuery } from '@/features/analyticApi';
import Error from '@/components/shared/Error';
import IncomeExpenseChartSkeleton from '../skeletons/IncomeExpenseChartSkeleton';
import React from 'react';

type Props = {
  from: string;
  to: string;
};

const IncomeExpenseChart: React.FC<Props> = ({ from, to }) => {
  const { data, isLoading, isError } = useGetIncomeVsExpensesQuery({ from, to });

  if (isError || (!data && !isLoading)) return <Error text="Failed to load icome expense analytics. Please try again." />;

  if (isLoading) return <IncomeExpenseChartSkeleton />;

  const { income, expenses } = data;
  const saving = income - expenses;

  const chartData = [
    {
      name: 'Income',
      value: income > 0 ? income : 0,
      color: 'rgba(34, 197, 94, 0.6)',
    },
    {
      name: 'Expense',
      value: expenses > 0 ? expenses : 0,
      color: 'rgba(239, 68, 68, 0.6)',
    },
    {
      name: 'Saving',
      value: saving > 0 ? saving : 0,
      color: 'rgba(59, 130, 246, 0.6)',
    },
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barSize={60} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis hide />
            <Bar dataKey="value" isAnimationActive radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList dataKey="value" position="top" formatter={(value: number) => `₴${value}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChart;
