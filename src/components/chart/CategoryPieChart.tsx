'use client';

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ExpensesByCategory } from '@/types/analytic';
import { EXPENSE_COLORS, INCOME_COLORS } from '@/constants/colors';

type Props = {
  chartData: ExpensesByCategory[];
  title: string;
};

export const CategoryPieChart: React.FC<Props> = ({ chartData, title }) => {
  const isIncome = chartData[0]?.type === 'income';
  const colorPalette = isIncome ? INCOME_COLORS : EXPENSE_COLORS;

  return (
    <Card className="w-full select-none">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
        <div onMouseDown={e => e.preventDefault()}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ category, percent }) => `${category} ${Math.round(percent * 100)}%`}
                className="text-[0] md:text-sm"
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={colorPalette[index % colorPalette.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₴${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
