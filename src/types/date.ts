export type DateRange = {
  fromDate: string;
  toDate: string;
};

export type RangeType =
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "last12Months"
  | "custom";
