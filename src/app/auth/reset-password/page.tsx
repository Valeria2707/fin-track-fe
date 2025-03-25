import { Suspense } from 'react';
import UpdatePasswordPage from './UpdatePasswordPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePasswordPage />
    </Suspense>
  );
}
