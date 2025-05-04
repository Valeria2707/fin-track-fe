import { useState, useEffect } from 'react';
import { useGetTransactionsQuery } from '@/features/transactionApi';
import { DateRange } from '@/types/date';
import { Transaction } from '@/types/transaction';

const itemsPerPage = 10;

export function useTransactionData(
  filters: Record<string, string | undefined>,
  filtersDate: DateRange,
  transactionsList: Transaction[],
  setTransactionsList: (val: Transaction[]) => void,
) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const queryFilters = {
    ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== undefined)),
    ...filtersDate,
    page: String(currentPage + 1),
    limit: String(itemsPerPage),
  };

  const { data: transactions, isLoading, error } = useGetTransactionsQuery(queryFilters);

  useEffect(() => {
    if (!transactions) return;

    setTotalPages(Math.max(1, Math.ceil(transactions.total / itemsPerPage)));

    const newItems = transactions.data.filter(item => !transactionsList.some(p => p.id === item.id));
    const updatedList = currentPage === 0 ? transactions.data : [...transactionsList, ...newItems];
    setTransactionsList(updatedList);
  }, [transactions, currentPage]);

  const fetchNext = () => {
    if (currentPage + 1 < totalPages && !isLoading) {
      setCurrentPage(p => p + 1);
    }
  };

  return {
    isLoading,
    error,
    fetchNext,
    hasMore: currentPage + 1 < totalPages,
    resetPage: () => {
      setTransactionsList([]);
      setCurrentPage(0);
    },
    setCurrentPage,
  };
}
