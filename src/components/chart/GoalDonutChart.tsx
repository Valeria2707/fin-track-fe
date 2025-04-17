import { getGoalDonutData } from '@/utils/charts';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

export const GoalDonutChart = ({ saved, target }: { saved: number; target: number }) => {
  const { data, percentage } = getGoalDonutData(saved, target);

  return (
    <div className="relative w-20 h-20">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0 }}>
          <Pie data={data} dataKey="value" innerRadius={30} outerRadius={36} stroke="none" startAngle={90} endAngle={-270}>
            <Cell fill="#1D4ED8" />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-900">{percentage}%</span>
      </div>
    </div>
  );
};
