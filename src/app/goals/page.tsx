'use client';

import { withAuth } from '@/hocs/withAuth';
import GoalsList from '@/components/goals/GoalsList';
import AddGoalCard from '@/components/goals/AddGoalCard';
import Error from '@/components/shared/Error';
import { useGetGoalsQuery } from '@/features/goalApi';
import RecommendedCard from '@/components/goals/RecommendedCard';
import { MAX_COUNT_OF_GOALS } from '@/constants/goals';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const GoalsPage: React.FC = () => {
  const { data = [], isError, isLoading } = useGetGoalsQuery();
  if (isError) {
    return <Error text="Failed to load goals. Please try again." />;
  }

  const isEnoughGoals = data.length < MAX_COUNT_OF_GOALS;
  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col gap-6">
        {isEnoughGoals ? (
          <AddGoalCard />
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 text-gray-700">
            <InformationCircleIcon className="w-6 h-6 text-blue-500" />

            <p className="text-sm">
              You already have <strong>{MAX_COUNT_OF_GOALS}</strong> active goals — the ideal number to stay focused on what matters most. To add a new goal,
              remove one that’s no longer relevant or close a goal you’ve already achieved.
            </p>
          </div>
        )}
        <GoalsList goals={data} isLoading={isLoading} />
        <RecommendedCard />
      </div>
    </main>
  );
};

export default withAuth(GoalsPage);
