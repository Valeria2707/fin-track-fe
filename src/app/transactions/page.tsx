'use client';

import DateRangePicker from '@/components/shared/DateRangePicker';
import AddTransactionCard from '@/components/transaction/AddTransactionCard';
import BalanceSummary from '@/components/transaction/BalanceSummary';
import TransactionsTable from '@/components/transaction/TransactionsTable';
import { withAuth } from '@/hocs/withAuth';
import { DateRange } from '@/types/date';
import { Transaction, TransactionType } from '@/types/transaction';
import { getCurrentMonthDates } from '@/utils/date';
import React, { useState } from 'react';

const TransactionsPage = () => {
  const [filters, setFilters] = useState<DateRange>(getCurrentMonthDates());

  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

  const addTransactionToList = (newTransaction: Transaction) => {
    setTransactionsList(prev => [newTransaction, ...prev]);
  };

  const updateTransactionInList = (updated: Transaction) => {
    setTransactionsList(prev => prev.map(tx => (tx.id === updated.id ? updated : tx)));
  };

  const removeTransactionFromList = (id: number) => {
    setTransactionsList(prev => prev.filter(tx => tx.id !== id));
  };

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col gap-6">
        <DateRangePicker onChange={setFilters} />
        <BalanceSummary filters={filters} />
        <div className="flex flex-col sm:flex-row gap-4">
          <AddTransactionCard type={TransactionType.INCOME} onAdd={addTransactionToList} />
          <AddTransactionCard type={TransactionType.EXPENSE} onAdd={addTransactionToList} />
        </div>
        <TransactionsTable
          filters={filters}
          transactionsList={transactionsList}
          setTransactionsList={setTransactionsList}
          updateTransactionInList={updateTransactionInList}
          removeTransactionFromList={removeTransactionFromList}
        />
      </div>
    </main>
  );
};

export default withAuth(TransactionsPage);
