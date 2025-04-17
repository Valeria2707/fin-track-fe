export const getPriorityBadgeStyle = (priority: string) => {
  const cleanPriority = priority.trim().toLowerCase();

  switch (cleanPriority) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'low':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};
