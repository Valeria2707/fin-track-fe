'use client';

import { useState } from 'react';
import { useRemoveTransactionMutation } from '@/features/transactionApi';
import { useGetCategoriesQuery } from '@/features/categoryApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Transaction, TransactionType } from '@/types/transaction';
import Error from '../shared/Error';
import { DateRange } from '@/types/date';
import { FileText } from 'lucide-react';
import { handleError } from '@/helpers/handleError';
import ConfirmDeleteDialog from '../shared/ConfirmDeleteDialog';
import TransactionDialog from './TransactionDialog';
import InfiniteScroll from 'react-infinite-scroll-component';
import TransactionFilters from './TransactionFilters';
import TransactionTableBody from './TransactionTableBody';
import { useTransactionData } from '@/hooks/useTransactionData';

type Props = {
  filters: DateRange;
  transactionsList: Transaction[];
  setTransactionsList: (val: Transaction[]) => void;
  updateTransactionInList: (t: Transaction) => void;
  removeTransactionFromList: (id: number) => void;
};

const TransactionsTable: React.FC<Props> = ({
  filters: filtersDate,
  setTransactionsList,
  transactionsList,
  updateTransactionInList,
  removeTransactionFromList,
}) => {
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});

  const [dialogState, setDialogState] = useState<{
    selected: Transaction | null;
    mode: 'edit' | 'delete' | null;
  }>({
    selected: null,
    mode: null,
  });

  const { isLoading, error, fetchNext, hasMore, resetPage } = useTransactionData(filters, filtersDate, transactionsList, setTransactionsList);

  const { data: categories } = useGetCategoriesQuery();
  const [removeTransaction, { isLoading: isDeleting }] = useRemoveTransactionMutation();

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'none' ? undefined : value,
    }));
    resetPage();
  };

  const resetFilters = () => {
    setFilters({});
    resetPage();
  };

  const handleEdit = (transaction: Transaction) => {
    setDialogState({ selected: transaction, mode: 'edit' });
  };

  const handleOpenDeleteDialog = (transaction: Transaction) => {
    setDialogState({ selected: transaction, mode: 'delete' });
  };

  const handleDeleteConfirm = async () => {
    if (!dialogState.selected) return;
    try {
      await removeTransaction(dialogState.selected.id).unwrap();
      removeTransactionFromList(dialogState.selected.id);
      setDialogState({ selected: null, mode: null });
    } catch (error) {
      handleError(error);
    }
  };

  if (error) return <Error text="Failed to load transactions. Please try again." />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transaction History</h2>
      <TransactionFilters filters={filters} categories={categories} onFilterChange={handleFilterChange} onResetFilters={resetFilters} />

      <div className="border rounded-lg shadow-sm bg-white max-h-[520px] overflow-y-auto" id="scroll-parent">
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : transactionsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
            <FileText className="w-12 h-12 text-gray-400" />
            <p className="text-lg font-semibold mt-2">No transactions found</p>
            <p className="text-sm text-gray-600">Adjust your filters or add new transactions.</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={transactionsList.length}
            next={fetchNext}
            hasMore={hasMore}
            loader={<Skeleton className="h-16 w-full" />}
            endMessage={<p className="text-center py-4 text-gray-400 text-sm">You’ve reached the end </p>}
            scrollableTarget="scroll-parent"
          >
            <TransactionTableBody transactions={transactionsList} onEdit={handleEdit} onDelete={handleOpenDeleteDialog} />
          </InfiniteScroll>
        )}
      </div>
      <ConfirmDeleteDialog
        open={dialogState.mode === 'delete'}
        onOpenChange={v => setDialogState(prev => ({ ...prev, mode: v ? 'delete' : null }))}
        title="Are you sure you want to delete?"
        description="This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />

      <TransactionDialog
        open={dialogState.mode === 'edit'}
        onOpenChange={v => setDialogState(prev => ({ ...prev, mode: v ? 'edit' : null }))}
        type={dialogState.selected?.type || TransactionType.EXPENSE}
        transaction={dialogState.selected}
        onSave={updated => {
          updateTransactionInList(updated);
          setDialogState({ selected: null, mode: null });
        }}
      />
    </div>
  );
};

export default TransactionsTable;
