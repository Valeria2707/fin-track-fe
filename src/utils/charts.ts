export const getGoalDonutData = (saved: number, target: number) => {
  const limitedSaved = Math.min(saved, target);
  const percentage = ((limitedSaved / target) * 100).toFixed(1);
  const data = [
    { name: 'Saved', value: limitedSaved },
    { name: 'Remaining', value: Math.max(target - limitedSaved, 0) },
  ];

  return { data, percentage };
};
