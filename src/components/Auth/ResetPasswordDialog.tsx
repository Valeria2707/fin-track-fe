'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useResetPasswordMutation } from '@/features/authApi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleError } from '@/helpers/handleError';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ResetPasswordDialog({ open, onClose }: Props) {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
    }),
    onSubmit: async values => {
      try {
        await resetPassword({ email: values.email }).unwrap();
        setIsSuccess(true);
      } catch (err) {
        handleError(err);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        formik.resetForm();
        setIsSuccess(false);
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-[350px] rounded-xl p-5 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">Reset Password</DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="text-center text-sm text-gray-700 py-4">
            <p>Reset link sent successfully!</p>
            <p className="mt-2">Please check your email to continue.</p>
            <DialogFooter className="flex justify-center pt-4">
              <Button
                onClick={() => {
                  formik.resetForm();
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-4 py-1.5 text-sm rounded-md"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <Input type="email" placeholder="Enter your email" {...formik.getFieldProps('email')} className="text-sm" />
            {formik.touched.email && formik.errors.email && <p className="text-xs text-red-500">{formik.errors.email}</p>}
            <DialogFooter className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={onClose} className="px-3 py-1.5 text-sm rounded-md">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className={'px-3 py-1.5 text-sm rounded-md'}>
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
