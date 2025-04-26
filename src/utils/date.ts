import { DateRange } from '@/types/date';
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear, subYears, formatISO } from 'date-fns';

export const getCurrentMonthDates = (): DateRange => ({
  fromDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
  toDate: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
});

export const getLastMonthDates = (): DateRange => ({
  fromDate: format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
  toDate: format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
});

export const getYearDates = (): DateRange => ({
  fromDate: format(startOfYear(new Date()), 'yyyy-MM-dd'),
  toDate: format(endOfYear(new Date()), 'yyyy-MM-dd'),
});

export const getLast12MonthsDates = (): DateRange => ({
  fromDate: format(subYears(new Date(), 1), 'yyyy-MM-dd'),
  toDate: format(new Date(), 'yyyy-MM-dd'),
});

export const formatDateDisplay = (date: Date | string | undefined): string => {
  if (!date) return 'Select date';
  return format(new Date(date), 'dd/MM/yyyy');
};

export const formatDateTextMonthDisplay = (date: Date | string | undefined): string => {
  if (!date) return 'Select date';
  return format(new Date(date), 'dd MMMM yyyy');
};

export const formatDateDotDisplay = (date: Date | string | undefined): string => {
  if (!date) return 'Select date';
  return format(new Date(date), 'dd.MM.yyyy');
};

export function getPreviousMonthRange(from: string, to: string) {
  const prevFrom = formatISO(startOfMonth(subMonths(new Date(from), 1)), {
    representation: 'date',
  });

  const prevTo = formatISO(endOfMonth(subMonths(new Date(to), 1)), {
    representation: 'date',
  });

  return { prevFrom, prevTo };
}

export function getDisplayMonth(date: string): string {
  return format(new Date(date), 'MMMM yyyy');
}
