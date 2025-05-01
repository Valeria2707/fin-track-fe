export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export type Goal = {
  id: number;
  userId: string;
  title: string;
  target_amount: string;
  current_amount: string;
  deadline: Date;
  description: string;
  priority: Priority;
};

export type GoalData = {
  title: string;
  target_amount: number | string;
  current_amount: number | string;
  deadline: Date;
  priority: Priority;
  description: string;
};

export type RecommendedOrderGoal = {
  goal: Goal;
  recommendedSum: number;
};
