export type DateRange = {
  fromDate: string;
  toDate: string;
};

export enum DateRangeEnum {
  THIS_MONTH = 'thisMonth',
  LAST_MONTH = 'lastMonth',
  THIS_YEAR = 'thisYear',
  LAST_12_MONTHS = 'last12Months',
  CUSTOM = 'custom',
}

export const DATE_RANGE_LABELS: Record<DateRangeEnum, string> = {
  [DateRangeEnum.THIS_MONTH]: 'This month',
  [DateRangeEnum.LAST_MONTH]: 'Last month',
  [DateRangeEnum.THIS_YEAR]: 'This year',
  [DateRangeEnum.LAST_12_MONTHS]: 'Last 12 months',
  [DateRangeEnum.CUSTOM]: 'Select period',
};
