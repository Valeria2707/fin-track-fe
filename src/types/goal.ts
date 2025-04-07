export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export type Goal = {
  id: number;
  user_id: string;
  title: string;
  target_amount: string;
  current_amount: string;
  deadline: Date;
  description: string;
  priority: Priority;
};

export type GoalData = {
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: Date;
  priority: Priority;
  description: string;
};

export type RecommendedOrderGoal = {
  goal: Goal;
  recommendedSum: number;
};
