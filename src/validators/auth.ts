import * as Yup from 'yup';

const emailField = Yup.string().email('Invalid email. Example "example@gmail.com"').required('Email is required');

const passwordField = Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required');

const nameField = Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required');

export const loginValidationSchema = Yup.object({
  email: emailField,
  password: passwordField,
});

export const signUpValidationSchema = Yup.object({
  name: nameField,
  email: emailField,
  password: passwordField,
});

export const resetPasswordValidationSchema = Yup.object({
  newPassword: passwordField.label('New password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});
