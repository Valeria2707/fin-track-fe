"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { useGetTransactionsQuery } from "@/features/transactionApi";
import Error from "../Shared/Error";
import { DateRange } from "@/types/date";

type Props = {
  filters: DateRange;
};

const BalanceSummary: React.FC<Props> = ({ filters }) => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useGetTransactionsQuery(filters);

  const { data = [] } = transactions || {};

  if (error) {
    return <Error text="Failed to load transactions. Please try again." />;
  }
  const totalIncome =
    data
      ?.filter((t) => t.type === "income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0) ?? 0;

  const totalExpenses =
    data
      ?.filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0) ?? 0;

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4">
      <Card className="shadow-sm border border-green-100 bg-green-50/50 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-green-700">
            Income
          </CardTitle>
          <ArrowUpRight className="w-6 h-6 text-green-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <p className="text-green-700 text-xl font-semibold">
              {totalIncome.toFixed(2)} UAH
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-rose-100 bg-rose-50/50 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-rose-700">
            Expenses
          </CardTitle>
          <ArrowDownRight className="w-6 h-6 text-rose-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <p className="text-rose-700 text-xl font-semibold">
              {totalExpenses.toFixed(2)} UAH
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-gray-200 bg-gray-50/50 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium text-gray-700">
            Balance
          </CardTitle>
          <DollarSign className="w-6 h-6 text-gray-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <p
              className={`text-xl font-semibold ${
                balance >= 0 ? "text-blue-700" : "text-gray-700"
              }`}
            >
              {balance.toFixed(2)} UAH
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSummary;
