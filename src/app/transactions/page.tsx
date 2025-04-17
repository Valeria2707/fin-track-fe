'use client';

import DateRangePicker from '@/components/shared/DateRangePicker';
import AddTransactionCard from '@/components/transaction/AddTransactionCard';
import BalanceSummary from '@/components/transaction/BalanceSummary';
import TransactionsTable from '@/components/transaction/TransactionsTable';
import { withAuth } from '@/hocs/withAuth';
import { DateRange } from '@/types/date';
import { TransactionType } from '@/types/transaction';
import { getCurrentMonthDates } from '@/utils/date';
import React, { useState } from 'react';

const TransactionsPage = () => {
  const [filters, setFilters] = useState<DateRange>(getCurrentMonthDates());

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col gap-6">
        <DateRangePicker onChange={setFilters} />
        <BalanceSummary filters={filters} />
        <div className="flex gap-4">
          <AddTransactionCard type={TransactionType.INCOME} />
          <AddTransactionCard type={TransactionType.EXPENSE} />
        </div>
        <TransactionsTable filters={filters} />
      </div>
    </main>
  );
};

export default withAuth(TransactionsPage);
