'use client';

import React, { useState } from 'react';
import Error from '@/components/shared/Error';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetOrderGoalsQuery, useUpdateGoalMutation } from '@/features/goalApi';
import RecommendedListSkeleton from '../skeletons/RecommendedListSkeleton';
import { formatCurrency } from '@/utils/formatCurrency';
import { CheckIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { Goal } from '@/types/goal';

const RecommendedCard: React.FC = () => {
  const { data, isLoading, isError } = useGetOrderGoalsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateGoal] = useUpdateGoalMutation();

  const [addedGoals, setAddedGoals] = useState<number[]>([]);

  const handleAddRecommendedSum = (goal: Goal, recommendedSum: number) => {
    const updatedAmount = parseFloat(goal.current_amount) + recommendedSum;

    updateGoal({
      id: goal.id,
      data: {
        ...goal,
        target_amount: parseFloat(goal.target_amount),
        current_amount: updatedAmount,
      },
    });

    setAddedGoals(prev => [...prev, goal.id]);
  };

  const allSumsTooLow = data?.length && data.every(item => item.recommendedSum < 100);

  if (isError) {
    return <Error text="Failed to load recommended plan. Please try again." />;
  }

  return (
    <Card className="w-full p-6 shadow-lg rounded-2xl border border-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-primary">Recommended Goal Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Below is a list of your goals in the suggested order of completion, along with the recommended amount to allocate for each one this month. This plan
          is based on the priority, deadlines, and target savings for each goal.
        </p>
        {allSumsTooLow && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-md p-3">
            Your recommended contributions for all goals are very low this month. Consider reducing expenses or increasing your income to better achieve your
            goals.
          </div>
        )}
        {isLoading ? (
          <RecommendedListSkeleton />
        ) : (
          <ul className="space-y-4">
            {data?.map(({ goal, recommendedSum }, index) => {
              const isAdded = addedGoals.includes(goal.id);
              const isRecommendedSum = recommendedSum > 0;

              return (
                <li key={goal.id} className="flex justify-between items-start border-b pb-3 last:border-none">
                  <div>
                    <p className="font-medium text-base">
                      {index + 1}. {goal.title}
                    </p>
                    {goal.description && <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>}
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="text-sm text-muted-foreground">Recommended to allocate:</p>
                    <div className={`flex items-center ${isRecommendedSum ? 'justify-between' : 'justify-end'}  w-full`}>
                      <span className="font-semibold">{formatCurrency(recommendedSum)}</span>
                      {isRecommendedSum && (
                        <>
                          {isAdded ? (
                            <CheckIcon className="w-6 h-6 text-green-600" />
                          ) : (
                            <div
                              className="cursor-pointer text-primary hover:text-primary/80 transition"
                              onClick={() => handleAddRecommendedSum(goal, recommendedSum)}
                            >
                              <PlusCircleIcon className="w-6 h-6" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedCard;
