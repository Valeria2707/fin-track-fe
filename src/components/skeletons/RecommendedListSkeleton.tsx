import { MAX_COUNT_OF_GOALS } from '@/constants/goals';
import { Skeleton } from '../ui/skeleton';

const RecommendedListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {[...Array(MAX_COUNT_OF_GOALS)].map((_, idx) => (
        <div key={idx} className="flex justify-between items-center">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
};

export default RecommendedListSkeleton;
