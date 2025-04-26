import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const DailyTrendChartSkeleton: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-4">
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
};

export default DailyTrendChartSkeleton;
