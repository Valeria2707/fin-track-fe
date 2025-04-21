'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const PieChartsSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <div className="h-6 w-1/3 mx-auto">
          <Skeleton className="h-full w-full rounded" />
        </div>
        <div className="h-[300px] w-full">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};
