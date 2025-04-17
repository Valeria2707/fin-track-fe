export const formatCurrency = (value: number, locale: string = 'en-US', currency: string = 'UAH', minimumFractionDigits: number = 0): string => {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
  });
};
