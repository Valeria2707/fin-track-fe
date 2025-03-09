"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { DateRange, RangeType } from "@/types/date";
import {
  formatDateDisplay,
  getCurrentMonthDates,
  getLast12MonthsDates,
  getLastMonthDates,
  getYearDates,
} from "@/utils/date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type Props = {
  onChange: (dates: DateRange) => void;
};

const DateRangePicker: React.FC<Props> = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState<RangeType>("thisMonth");
  const [filters, setFilters] = useState<DateRange>(getCurrentMonthDates());

  const handleRangeChange = (range: RangeType) => {
    let dates: DateRange;
    switch (range) {
      case "thisMonth":
        dates = getCurrentMonthDates();
        break;
      case "lastMonth":
        dates = getLastMonthDates();
        break;
      case "thisYear":
        dates = getYearDates();
        break;
      case "last12Months":
        dates = getLast12MonthsDates();
        break;
      case "custom":
        return setSelectedRange("custom");
    }
    setFilters(dates);
    setSelectedRange(range);
    onChange(dates);
  };

  const handleCustomDateChange = (
    key: keyof DateRange,
    date: Date | undefined
  ) => {
    if (!date) return;
    const formattedDate = format(date, "yyyy-MM-dd");

    const updatedFilters = { ...filters, [key]: formattedDate };

    if (
      key === "fromDate" &&
      filters.toDate &&
      formattedDate > filters.toDate
    ) {
      updatedFilters.toDate = formattedDate;
    }

    if (
      key === "toDate" &&
      filters.fromDate &&
      formattedDate < filters.fromDate
    ) {
      updatedFilters.fromDate = formattedDate;
    }

    setFilters(updatedFilters);
    onChange(updatedFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap gap-2">
        {(
          ["thisMonth", "lastMonth", "thisYear", "last12Months"] as RangeType[]
        ).map((range) => (
          <Button
            key={range}
            variant={selectedRange === range ? "default" : "outline"}
            onClick={() => handleRangeChange(range)}
            className="px-4 py-2"
          >
            {range === "thisMonth" && "This month"}
            {range === "lastMonth" && "Last month"}
            {range === "thisYear" && "This year"}
            {range === "last12Months" && "Last 12 months"}
          </Button>
        ))}
        <Button
          variant={selectedRange === "custom" ? "default" : "outline"}
          className="px-4 py-2 flex items-center gap-2"
          onClick={() => setSelectedRange("custom")}
        >
          <CalendarIcon className="w-4 h-4" />
          Select period
        </Button>
      </div>

      {selectedRange === "custom" && (
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-3 py-2"
              >
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                {formatDateDisplay(filters.fromDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  filters.fromDate ? new Date(filters.fromDate) : undefined
                }
                onSelect={(date) => handleCustomDateChange("fromDate", date)}
              />
            </PopoverContent>
          </Popover>

          <span className="text-gray-600">to</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-3 py-2"
              >
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                {formatDateDisplay(filters.toDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.toDate ? new Date(filters.toDate) : undefined}
                onSelect={(date) => handleCustomDateChange("toDate", date)}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
