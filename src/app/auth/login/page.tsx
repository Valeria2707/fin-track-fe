'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignInMutation } from '@/features/authApi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleError } from '@/helpers/handleError';
import { ROUTES } from '@/constants/routes';
import { withPublic } from '@/hocs/withPublic';

function LoginPage() {
  const router = useRouter();
  const [signIn, { isLoading }] = useSignInMutation();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email. Example "example@gmail.com"').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async values => {
      try {
        await signIn(values).unwrap();
        router.push(ROUTES.dashboard);
      } catch (err) {
        handleError(err);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Input type="email" placeholder="Email" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && <p className="text-xs text-red-500">{formik.errors.email}</p>}
            </div>
            <div>
              <Input type="password" placeholder="Password" {...formik.getFieldProps('password')} />
              {formik.touched.password && formik.errors.password && <p className="text-xs text-red-500">{formik.errors.password}</p>}
            </div>
            <div className="flex justify-end">
              <Link href={ROUTES.resetPassword} className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Don`t have an account?{' '}
            <Link href={ROUTES.signup} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default withPublic(LoginPage);
