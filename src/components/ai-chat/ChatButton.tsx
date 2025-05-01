'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import ChatWindow from './ChatWindow';

export const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      {isOpen ? (
        <ChatWindow isOpen={isOpen} handleOpen={setIsOpen} />
      ) : (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <Button size="icon" className="rounded-full p-4 sm:p-6 shadow-lg" onClick={handleOpen}>
            <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ChatButton;
