import { toast } from 'react-toastify';

export const handleError = (error: unknown) => {
  console.error('Error:', error);
  toast.error('Something went wrong. Please try again.');
};
