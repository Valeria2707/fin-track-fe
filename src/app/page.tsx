'use client';

import BalanceSummary from '@/components/transaction/BalanceSummary';
import { withAuth } from '@/hocs/withAuth';
import { getCurrentMonthDates } from '@/utils/date';
import { CheckCircleIcon, InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { adviceList, factsList, practicesList } from '@/constants/text';
import InfoListCard from '@/components/dashboard/InfoListCard';
import MonthlySummaryContainer from '@/components/analytics/MonthlySummaryContainer';

function Home() {
  const filters = getCurrentMonthDates();

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col gap-6">
        <div className="flex justify-content gap-4 flex-col md:flex-row">
          <InfoListCard title="Tips for a Stable Budget" items={adviceList} icon={<CheckCircleIcon className="w-5 h-5 text-green-600" />} />
          <BalanceSummary filters={filters} className="!grid-cols-1 w-full " />
        </div>
        <InfoListCard title="Facts About Budgeting" items={factsList} icon={<InformationCircleIcon className="w-5 h-5 text-gray-500" />} />
        <div className="flex justify-content gap-4 flex-col md:flex-row">
          <MonthlySummaryContainer from={filters.fromDate} to={filters.toDate} />
          <InfoListCard title="Mindful Money Practices" items={practicesList} icon={<SparklesIcon className="w-5 h-5 text-yellow-500" />} />
        </div>
      </div>
    </main>
  );
}

export default withAuth(Home);
