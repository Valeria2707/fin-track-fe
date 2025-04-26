'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ChatButton } from '@/components/ai-chat/ChatButton';
import { usePathname } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/auth');
  return (
    <Provider store={store}>
      {children}
      {!isAuthPage && <ChatButton />}
    </Provider>
  );
}
