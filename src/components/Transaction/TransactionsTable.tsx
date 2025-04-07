'use client';

import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGetTransactionsQuery, useRemoveTransactionMutation } from '@/features/transactionApi';
import { useGetCategoriesQuery } from '@/features/categoryApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Transaction, TransactionType } from '@/types/transaction';
import Error from '../shared/Error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/category';
import { DateRange } from '@/types/date';
import { formatDateDisplay } from '@/utils/date';
import { FileText, MoreVertical } from 'lucide-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { handleError } from '@/helpers/handleError';
import ConfirmDeleteDialog from '../shared/ConfirmDeleteDialog';
import TransactionDialog from './TransactionDialog';

type Props = {
  filters: DateRange;
};
const itemsPerPage = 5;

const TransactionsTable: React.FC<Props> = ({ filters: filtersDate }) => {
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const queryFilters = {
    ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== undefined)),
    ...filtersDate,
    page: String(currentPage + 1),
    limit: String(itemsPerPage),
  } as Record<string, string>;

  const { data: categories } = useGetCategoriesQuery();

  const { data: transactions, isLoading, error } = useGetTransactionsQuery(queryFilters);

  const [removeTransaction, { isLoading: isDeleting }] = useRemoveTransactionMutation();

  const totalPages = Math.ceil((transactions?.total ?? 0) / itemsPerPage) || 1;

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'none' ? undefined : value,
    }));
    setCurrentPage(0);
  };

  const resetFilters = () => {
    setFilters({});
    setCurrentPage(0);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDialogOpen(true);
  };

  const handleOpenDeleteDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedTransaction) {
      try {
        await removeTransaction(selectedTransaction.id).unwrap();
        setIsDeleteDialogOpen(false);
      } catch (error) {
        handleError(error);
      }
    }
  };

  if (error) {
    return <Error text="Failed to load transactions. Please try again." />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transaction History</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center text-sm text-gray-700">
        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-gray-600 text-xs font-medium">
            Type
          </label>
          <Select value={filters.type ?? 'none'} onValueChange={value => handleFilterChange('type', value)}>
            <SelectTrigger className="w-32 text-gray-800">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-gray-600 text-xs font-medium">
            Category
          </label>
          <Select value={filters.category_id ?? 'none'} onValueChange={value => handleFilterChange('category_id', value)}>
            <SelectTrigger className="w-48 text-gray-800">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All</SelectItem>
              {categories?.map((category: Category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={resetFilters} className="mt-5">
          Reset
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm bg-white">
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : transactions?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
            <FileText className="w-12 h-12 text-gray-400" />
            <p className="text-lg font-semibold mt-2">No transactions found</p>
            <p className="text-sm text-gray-600">Adjust your filters or add new transactions.</p>
          </div>
        ) : (
          <Table className="w-full text-sm">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="px-4 py-3 text-center">№</TableHead>
                <TableHead className="px-4 py-3">Category</TableHead>
                <TableHead className="px-4 py-3 text-center">Amount</TableHead>
                <TableHead className="px-4 py-3 text-center">Date</TableHead>
                <TableHead className="px-4 py-3">Description</TableHead>
                <TableHead className="w-[2%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.data?.map((transaction: Transaction, index) => (
                <TableRow key={transaction.id} className="border-b hover:bg-gray-50">
                  <TableCell className="px-4 py-3 text-center">{currentPage * itemsPerPage + index + 1}</TableCell>
                  <TableCell className="px-4 py-3">{transaction.category.name}</TableCell>
                  <TableCell className={`px-4 py-3 text-center font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} ₴{transaction.amount}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">{formatDateDisplay(transaction.date)}</TableCell>
                  <TableCell className="px-4 py-3">{transaction.description || '—'}</TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="p-2 cursor-pointer">
                          <MoreVertical className="h-4 w-4" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-base cursor-pointer" onClick={() => handleEdit(transaction)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="!text-red-600 cursor-pointer hover:!text-red-700 hover:bg-red-50 focus:bg-red-50 text-base"
                          onClick={() => handleOpenDeleteDialog(transaction)}
                        >
                          {isLoading ? 'Deleting...' : 'Delete'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="flex gap-2 justify-center items-center text-sm font-medium"
        activeClassName="border-gray-300 border bg-gray-100 px-3 py-1.5 rounded-md"
        pageClassName="px-3 py-1.5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 text-gray-700"
        previousLabel={<ChevronLeftIcon className="w-4 h-4" />}
        nextLabel={<ChevronRightIcon className="w-4 h-4" />}
        breakLabel="..."
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
      />
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Are you sure you want to delete?"
        description="This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
      <TransactionDialog
        open={isTransactionDialogOpen}
        onOpenChange={setIsTransactionDialogOpen}
        type={selectedTransaction?.type || TransactionType.EXPENSE}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default TransactionsTable;
