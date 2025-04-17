import { Skeleton } from '../ui/skeleton';

const GoalItemSkeleton = () => (
  <div className="border rounded-2xl shadow-md bg-white p-6 flex flex-col gap-4">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4 w-full">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
  </div>
);

export default GoalItemSkeleton;
