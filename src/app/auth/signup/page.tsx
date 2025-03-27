'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignUpMutation } from '@/features/authApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { handleError } from '@/helpers/handleError';
import { ROUTES } from '@/constants/routes';
import { withPublic } from '@/hocs/withPublic';
import { signUpValidationSchema } from '@/validators/auth';
import { SignUp } from '@/types/auth';

function SignUpPage() {
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();

  const signUpHandler = async (values: SignUp) => {
    try {
      await signUp(values).unwrap();
      router.push(ROUTES.dashboard);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={signUpValidationSchema} onSubmit={signUpHandler}>
            <Form className="space-y-4">
              <div>
                <Field as={Input} type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <Field as={Input} type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <Field as={Input} type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="text-xs text-red-500" />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </Form>
          </Formik>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Already have an account?{' '}
            <Link href={ROUTES.login} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default withPublic(SignUpPage);
