import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  amount: Yup.number().positive('Amount must be greater than 0').required('Amount is required'),
  categoryId: Yup.number().nullable().required('Category is required'),
  date: Yup.date().required('Date is required'),
  description: Yup.string(),
});
