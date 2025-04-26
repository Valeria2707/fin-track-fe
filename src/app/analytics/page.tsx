'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import MonthlySummaryContainer from '@/components/analytics/MonthlySummaryContainer';
import DailyTrendChart from '@/components/chart/DailyTrendChart';
import IncomeExpenseChart from '@/components/chart/IncomeExpenseChart';
import { PieCharts } from '@/components/chart/PieCharts';
import { withAuth } from '@/hocs/withAuth';
import { getCurrentMonthDates } from '@/utils/date';
import MonthYearSelector from '@/components/shared/MonthYearSelector';
import ReportButton from '@/components/analytics/ReportButton';
import { DATE_FORMAT } from '@/constants/date';

const GoalsPage: React.FC = () => {
  const [filters, setFilters] = useState(getCurrentMonthDates);

  const handleMonthChange = (year: number, monthIndex: number) => {
    const selectedDate = new Date(year, monthIndex);
    setFilters({
      fromDate: format(startOfMonth(selectedDate), DATE_FORMAT),
      toDate: format(endOfMonth(selectedDate), DATE_FORMAT),
    });
  };

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-[180px] md:w-full">
          <MonthYearSelector filters={filters} handleMonthChange={handleMonthChange} />
          <ReportButton from={filters.fromDate} to={filters.toDate} />
        </div>
        <div className="flex justify-content gap-4 flex-col md:flex-row">
          <IncomeExpenseChart from={filters.fromDate} to={filters.toDate} />
          <MonthlySummaryContainer from={filters.fromDate} to={filters.toDate} />
        </div>
        <DailyTrendChart from={filters.fromDate} to={filters.toDate} />
        <PieCharts from={filters.fromDate} to={filters.toDate} />
      </div>
    </main>
  );
};

export default withAuth(GoalsPage);
