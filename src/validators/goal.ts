import * as Yup from 'yup';

const maxTwoDecimalPlaces = (message = 'Max 2 decimal places') =>
  Yup.number().test('max-decimals', message, value => {
    if (value === undefined || value === null) return true;
    return Number.isInteger(value * 100);
  });

export const validationSchema = Yup.object().shape({
  amount: Yup.number().typeError('Must be a number').required('Required').moreThan(0, 'Must be greater than 0'),
});

export const goalValidationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Title must be at least 2 characters').max(100, 'Title is too long').required('Title is required'),

  target_amount: Yup.number()
    .typeError('Target amount must be a number')
    .min(0.1, 'Target amount must be greater than 0')
    .required('Target amount is required')
    .concat(maxTwoDecimalPlaces()),

  current_amount: Yup.number().typeError('Current amount must be a number').min(0, 'Current amount cannot be negative').concat(maxTwoDecimalPlaces()),

  deadline: Yup.date().typeError('Invalid date').min(new Date(), 'Deadline cannot be in the past').required('Deadline is required'),

  priority: Yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').required('Priority is required'),
});
