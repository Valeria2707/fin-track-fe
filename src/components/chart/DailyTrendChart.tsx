'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import Error from '@/components/shared/Error';
import { useGetDailyTrendQuery } from '@/features/analyticApi';
import DailyTrendChartSkeleton from '../skeletons/DailyTrendChartSkeleton';
import { formatDateDotDisplay, generateDateRange } from '@/utils/date';
import React from 'react';
import { format } from 'date-fns';

type Props = {
  from: string;
  to: string;
};

const DailyTrendChart: React.FC<Props> = ({ from, to }) => {
  const { data = [], isLoading, isError } = useGetDailyTrendQuery({ from, to });

  if (isError) return <Error text="Failed to load daily trend. Please try again." />;

  if (isLoading) return <DailyTrendChartSkeleton />;

  const fullDateRange = generateDateRange(from, to);

  const dataMap = new Map(data.map(d => [format(d.date, 'yyyy-MM-dd'), d]));

  const formattedData = fullDateRange.map(date => {
    const entry = dataMap.get(date);
    return {
      date: formatDateDotDisplay(date),
      income: entry?.income ?? 0,
      expense: entry?.expense ?? 0,
    };
  });

  const isData = formattedData.length > 0;

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-6 text-center">Income vs. Expense Trend</h3>
        {isData ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={v => `₴${v}`} tick={{ fontSize: 12, dx: -5 }} />
              <Tooltip
                formatter={(value: number, name: string) => [`₴${value}`, name === 'income' ? 'Income' : 'Expense']}
                labelFormatter={label => `Date: ${label}`}
              />
              <Area type="monotone" dataKey="expense" stroke="#b91c1c" fill="#ef4444" fillOpacity={0.3} />
              <Area type="monotone" dataKey="income" stroke="#15803d" fill="#86efac" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-muted-foreground text-sm">No expenses and incomes</div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyTrendChart;
