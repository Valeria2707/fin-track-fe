"use client";

import { useMemo, useState } from "react";
import { useGetTransactionsQuery } from "@/features/transactionApi";
import { useGetCategoriesQuery } from "@/features/categoryApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types/transaction";
import Error from "../Shared/Error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";
import { DateRange } from "@/types/date";
import { formatDateDisplay } from "@/utils/date";
import { FileText } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type Props = {
  filters: DateRange;
};

const TransactionsTable: React.FC<Props> = ({ filters: filtersDate }) => {
  const [filters, setFilters] = useState<Record<string, string | undefined>>({
    type: undefined,
    category_id: undefined,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const queryFilters = {
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    ),
    ...filtersDate,
  } as Record<string, string>;

  const { data: categories } = useGetCategoriesQuery();
  const {
    data: transactions,
    isLoading,
    error,
  } = useGetTransactionsQuery(queryFilters);

  const totalPages = Math.ceil((transactions?.length ?? 0) / itemsPerPage) || 1;

  const paginatedTransactions = useMemo(() => {
    return (
      transactions?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) ?? []
    );
  }, [transactions, currentPage, itemsPerPage]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "none" ? undefined : value,
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ type: undefined, category_id: undefined });
    setCurrentPage(1);
  };

  if (error)
    return <Error text="Failed to load transactions. Please try again." />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transaction History</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center text-sm text-gray-700">
        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-gray-600 text-xs font-medium">
            Type
          </label>
          <Select
            value={filters.type ?? "none"}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
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
          <label
            htmlFor="category"
            className="text-gray-600 text-xs font-medium"
          >
            Category
          </label>
          <Select
            value={filters.category_id ?? "none"}
            onValueChange={(value) => handleFilterChange("category_id", value)}
          >
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
        ) : transactions?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
            <FileText className="w-12 h-12 text-gray-400" />
            <p className="text-lg font-semibold mt-2">No transactions found</p>
            <p className="text-sm text-gray-600">
              Adjust your filters or add new transactions.
            </p>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions?.map((transaction: Transaction, index) => (
                <TableRow
                  key={transaction.id}
                  className="border-b hover:bg-gray-50"
                >
                  <TableCell className="px-4 py-3 text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {transaction.category.name}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3 text-center font-medium ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"} ₴
                    {transaction.amount}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    {formatDateDisplay(transaction.date)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {transaction.description || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TransactionsTable;
