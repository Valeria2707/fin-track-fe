'use client';

import { useGetAllQueriesQuery, useSendQueryMutation } from '@/features/aiApi';
import { handleError } from '@/helpers/handleError';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Message from './Message';

type Props = {
  isOpen: boolean;
  handleOpen: (val: boolean) => void;
};

const ChatWindow: React.FC<Props> = ({ isOpen, handleOpen }) => {
  const [message, setMessage] = useState('');

  const { data: history, refetch } = useGetAllQueriesQuery(undefined, { skip: !isOpen });
  const [sendQuery, { isLoading: isSending }] = useSendQueryMutation();

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    try {
      await sendQuery({ message: trimmed }).unwrap();
      setMessage('');
      refetch();
    } catch (error) {
      handleError(error);
    }
  };

  const reversedHistory = useMemo(() => {
    return history ? [...history].reverse() : [];
  }, [history]);

  const isHistory = reversedHistory.length > 0;

  const handleClose = () => handleOpen(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[330px] sm:w-[350px] h-[500px] bg-background rounded-2xl shadow-xl flex flex-col overflow-hidden border">
      <div className="bg-primary text-primary-foreground p-4  flex items-center justify-between">
        <span className="font-semibold">Your Personal Finance Assistant</span>
        <button onClick={handleClose}>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 text-sm space-y-4">
        {reversedHistory.map(q => (
          <div key={q.id} className="space-y-4">
            <Message q={q} />
          </div>
        ))}
        {!isHistory && <div className="text-center text-muted-foreground">Start the conversation!</div>}
        {isSending && <TypingIndicator />}
      </div>
      <div className="p-2 border-t flex items-center gap-2">
        <Input
          placeholder="Ask a question..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="flex-1"
          disabled={isSending}
        />
        <Button onClick={handleSend} disabled={isSending}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
