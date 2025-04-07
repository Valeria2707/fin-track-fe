'use client';

import { Goal } from '@/types/goal';
import { Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { GoalDonutChart } from '../chart/GoalDonutChart';
import { formatDateTextMonthDisplay } from '@/utils/date';
import { getPriorityBadgeStyle } from '@/utils/styles';
import GoalDetails from './GoalDetails';
import GoalItemSkeleton from '../skeletons/GoalItemSkeleton';
import { formatCurrency } from '@/utils/formatCurrency';

type Props = {
  goals: Goal[];
  isLoading: boolean;
};

const GoalsList: React.FC<Props> = ({ goals, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <GoalItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {goals.map((goal: Goal) => {
        const saved = parseFloat(goal.current_amount);
        const target = parseFloat(goal.target_amount);
        return (
          <AccordionItem
            key={goal.id}
            value={`goal-${goal.id}`}
            className="border rounded-2xl shadow-md bg-white transition-all hover:bg-gray-50 hover:shadow-lg "
          >
            <AccordionTrigger
              className="group px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl transition-all duration-200 hover:bg-gray-50 hover:shadow-sm [&>svg]:ml-1"
              style={{ textDecoration: 'none' }}
            >
              <div className="flex items-center flex-col md:flex-row gap-4 w-full">
                <GoalDonutChart saved={saved} target={target} />
                <div className="flex flex-col justify-center gap-1 w-full">
                  <span className="text-base font-semibold text-gray-900 truncate">{goal.title}</span>
                  <div className="flex flex-col xs:flex-row gap-1 xs:gap-3 text-sm text-gray-500 flex-wrap">
                    <span className="text-gray-700 font-medium">{formatCurrency(Number(goal.target_amount))}</span>
                    <span>to {formatDateTextMonthDisplay(goal.deadline)}</span>
                  </div>
                </div>
              </div>
              <div className="md:ml-auto mt-2 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadgeStyle(goal.priority)}`}>{goal.priority}</span>
              </div>
            </AccordionTrigger>
            <GoalDetails goal={goal} />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default GoalsList;
