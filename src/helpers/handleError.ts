import { toast } from 'react-toastify';

export const handleError = (error: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any;

  const errorMessage =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : (err?.data?.message ?? err?.response?.data?.message ?? err?.message ?? 'Something went wrong. Please try again.');

  toast.error(errorMessage);
};
