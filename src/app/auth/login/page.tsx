'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignInMutation } from '@/features/authApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleError } from '@/helpers/handleError';
import { ROUTES } from '@/constants/routes';
import { withPublic } from '@/hocs/withPublic';
import { useState } from 'react';
import ResetPasswordDialog from '@/components/Auth/ResetPasswordDialog';
import { loginValidationSchema } from '@/validators/auth';

function LoginPage() {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [signIn, { isLoading }] = useSignInMutation();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={async values => {
              try {
                await signIn(values).unwrap();
                router.push(ROUTES.dashboard);
              } catch (err) {
                handleError(err);
              }
            }}
          >
            <Form className="space-y-4">
              <div>
                <Field as={Input} type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <Field as={Input} type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="text-xs text-red-500" />
              </div>
              <div className="flex justify-end">
                <span onClick={() => setDialogOpen(true)} className="text-sm text-blue-500 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Formik>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Don’t have an account?{' '}
            <Link href={ROUTES.signup} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
      <ResetPasswordDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}

export default withPublic(LoginPage);
