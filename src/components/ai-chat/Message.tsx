'use client';

import { QueryData } from '@/types/ai';
import { Bot, UserCircle2 } from 'lucide-react';

type Props = {
  q: QueryData;
};

const Message: React.FC<Props> = ({ q }) => {
  return (
    <>
      <div className="flex justify-end gap-2">
        <div className="bg-primary text-primary-foreground p-2 rounded-xl max-w-[70%]">{q.query}</div>
        <UserCircle2 className="h-6 w-6" />
      </div>
      <div className="flex gap-2">
        <Bot className="h-6 w-6 text-muted-foreground" />
        <div className="bg-muted text-muted-foreground p-2 rounded-xl max-w-[70%]">{q.response}</div>
      </div>
    </>
  );
};

export default Message;
