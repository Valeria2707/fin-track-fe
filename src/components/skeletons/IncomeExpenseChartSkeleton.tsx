import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const IncomeExpenseChartSkeleton: React.FC = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4 space-y-4">
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChartSkeleton;
