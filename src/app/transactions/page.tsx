"use client";

import DateRangePicker from "@/components/Shared/DateRangePicker";
import AddTransactionCard from "@/components/Transaction/AddTransactionCard";
import BalanceSummary from "@/components/Transaction/BalanceSummary";
import TransactionsTable from "@/components/Transaction/TransactionsTable";
import { DateRange } from "@/types/date";
import { getCurrentMonthDates } from "@/utils/date";
import React, { useState } from "react";

const TransactionsPage = () => {
  const [filters, setFilters] = useState<DateRange>(getCurrentMonthDates());
  console.log(filters);
  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col gap-6">
        <DateRangePicker onChange={setFilters} />
        <BalanceSummary filters={filters} />
        <div className="flex gap-4">
          <AddTransactionCard type="income" />
          <AddTransactionCard type="expense" />
        </div>
        <TransactionsTable filters={filters} />
      </div>
    </main>
  );
};

export default TransactionsPage;
