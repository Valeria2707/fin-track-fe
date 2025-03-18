import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { formatDateDisplay, getCurrentMonthDates, getLast12MonthsDates, getLastMonthDates, getYearDates } from '@/utils/date';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@/constants/date';
import { DATE_RANGE_LABELS, DateRange, DateRangeEnum } from '@/types/date';

type Props = {
  onChange: (dates: DateRange) => void;
};

const DateRangePicker: React.FC<Props> = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState<DateRangeEnum>(DateRangeEnum.THIS_MONTH);
  const [filters, setFilters] = useState(getCurrentMonthDates());

  const handleRangeChange = (range: DateRangeEnum) => {
    let dates;
    switch (range) {
      case DateRangeEnum.THIS_MONTH:
        dates = getCurrentMonthDates();
        break;
      case DateRangeEnum.LAST_MONTH:
        dates = getLastMonthDates();
        break;
      case DateRangeEnum.THIS_YEAR:
        dates = getYearDates();
        break;
      case DateRangeEnum.LAST_12_MONTHS:
        dates = getLast12MonthsDates();
        break;
      case DateRangeEnum.CUSTOM:
        return setSelectedRange(DateRangeEnum.CUSTOM);
    }
    setFilters(dates);
    setSelectedRange(range);
    onChange(dates);
  };

  const handleCustomDateChange = (key: keyof DateRange, date: Date | undefined) => {
    if (!date) return;
    const formattedDate = format(date, DATE_FORMAT);

    const updatedFilters = { ...filters, [key]: formattedDate };

    if (key === 'fromDate' && filters.toDate && formattedDate > filters.toDate) {
      updatedFilters.toDate = formattedDate;
    }
    if (key === 'toDate' && filters.fromDate && formattedDate < filters.fromDate) {
      updatedFilters.fromDate = formattedDate;
    }

    setFilters(updatedFilters);
    onChange(updatedFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap gap-2">
        {Object.values(DateRangeEnum)
          .filter(range => range !== DateRangeEnum.CUSTOM)
          .map(range => (
            <Button key={range} variant={selectedRange === range ? 'default' : 'outline'} onClick={() => handleRangeChange(range)} className="px-4 py-2">
              {DATE_RANGE_LABELS[range]}
            </Button>
          ))}

        <Button
          variant={selectedRange === DateRangeEnum.CUSTOM ? 'default' : 'outline'}
          className="px-4 py-2 flex items-center gap-2"
          onClick={() => setSelectedRange(DateRangeEnum.CUSTOM)}
        >
          <CalendarIcon className="w-4 h-4" />
          {DATE_RANGE_LABELS[DateRangeEnum.CUSTOM]}
        </Button>
      </div>

      {selectedRange === DateRangeEnum.CUSTOM && (
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 px-3 py-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                {formatDateDisplay(filters.fromDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.fromDate ? new Date(filters.fromDate) : undefined}
                onSelect={date => handleCustomDateChange('fromDate', date)}
              />
            </PopoverContent>
          </Popover>

          <span className="text-gray-600">to</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 px-3 py-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                {formatDateDisplay(filters.toDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.toDate ? new Date(filters.toDate) : undefined}
                onSelect={date => handleCustomDateChange('toDate', date)}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
