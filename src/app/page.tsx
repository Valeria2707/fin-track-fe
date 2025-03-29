'use client';

import { withAuth } from '@/hocs/withAuth';

function Home() {
  return <>hello</>;
}

export default withAuth(Home);
