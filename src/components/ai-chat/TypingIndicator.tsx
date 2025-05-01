'use client';

import { Bot } from 'lucide-react';

const dots = [{ delay: '' }, { delay: '[animation-delay:.15s]' }, { delay: '[animation-delay:.3s]' }];

const TypingIndicator = () => (
  <div className="flex items-center gap-2">
    <Bot className="h-6 w-6 text-muted-foreground" />
    <div className="p-2 rounded-xl max-w-[70%]">
      <span className="inline-flex gap-1">
        {dots.map((dot, index) => (
          <span key={index} className={`w-1.5 h-1.5 bg-current rounded-full animate-bounce ${dot.delay}`} />
        ))}
      </span>
    </div>
  </div>
);

export default TypingIndicator;
