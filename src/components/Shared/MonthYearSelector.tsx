'use client';

import { MONTHS } from '@/constants/date';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DateRange } from '@/types/date';

type Props = {
  filters: DateRange;
  handleMonthChange: (year: number, monthIndex: number) => void;
};

const MonthYearSelector: React.FC<Props> = ({ filters, handleMonthChange }) => {
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <Select
          value={new Date(filters.fromDate).getMonth().toString()}
          onValueChange={monthIndex => handleMonthChange(new Date(filters.fromDate).getFullYear(), parseInt(monthIndex))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month, index) => (
              <SelectItem key={month} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={new Date(filters.fromDate).getFullYear().toString()}
          onValueChange={year => handleMonthChange(parseInt(year), new Date(filters.fromDate).getMonth())}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MonthYearSelector;
