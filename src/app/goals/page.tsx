'use client';

import { withAuth } from '@/hocs/withAuth';
import GoalsList from '@/components/goals/GoalsList';
import AddGoalCard from '@/components/goals/AddGoalCard';
import Error from '@/components/shared/Error';
import { useGetGoalsQuery } from '@/features/goalApi';
import RecommendedCard from '@/components/goals/RecommendedCard';

const GoalsPage: React.FC = () => {
  const { data = [], isError, isLoading } = useGetGoalsQuery();
  if (isError) {
    return <Error text="Failed to load goals. Please try again." />;
  }

  const isEnoughGoals = data.length < 5;
  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col gap-6">
        {isEnoughGoals && <AddGoalCard />}
        <GoalsList goals={data} isLoading={isLoading} />
        <RecommendedCard />
      </div>
    </main>
  );
};

export default withAuth(GoalsPage);
