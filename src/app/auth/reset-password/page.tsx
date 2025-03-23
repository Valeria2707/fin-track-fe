'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdatePasswordMutation } from '@/features/authApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleError } from '@/helpers/handleError';
import { ROUTES } from '@/constants/routes';
import { withPublic } from '@/hocs/withPublic';
import { resetPasswordValidationSchema } from '@/validators/auth';

function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">New Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Formik
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={async values => {
              try {
                if (!token) {
                  handleError('Invalid or missing token');
                  return;
                }
                await updatePassword({ token, newPassword: values.newPassword }).unwrap();
                router.push(ROUTES.login);
              } catch (err) {
                handleError(err);
              }
            }}
          >
            <Form className="space-y-4">
              <div>
                <Field as={Input} type="password" name="newPassword" placeholder="New Password" />
                <ErrorMessage name="newPassword" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <Field as={Input} type="password" name="confirmPassword" placeholder="Confirm Password" />
                <ErrorMessage name="confirmPassword" component="div" className="text-xs text-red-500" />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </Form>
          </Formik>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Remembered password?{' '}
            <a href={ROUTES.login} className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default withPublic(UpdatePasswordPage);
