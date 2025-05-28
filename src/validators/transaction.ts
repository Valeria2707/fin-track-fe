import * as Yup from 'yup';

const maxTwoDecimalPlaces = (message = 'Max 2 decimal places') =>
  Yup.number().test('max-decimals', message, value => {
    if (value === undefined || value === null) return true;
    return Number.isInteger(value * 100);
  });

export const validationSchema = Yup.object().shape({
  amount: Yup.number().positive('Amount must be greater than 0').required('Amount is required').concat(maxTwoDecimalPlaces()),
  categoryId: Yup.number().nullable().required('Category is required'),
  date: Yup.date().required('Date is required'),
  description: Yup.string(),
});
