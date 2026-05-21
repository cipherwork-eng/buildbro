'use client';

import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { User, Bot } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  message: ChatMessageType;
}

function parseContent(content: string) {
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'code', content: match[2].trim(), language: match[1] || 'text' });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.slice(lastIndex) });
  }

  if (parts.length === 0) {
    parts.push({ type: 'text', content });
  }

  return parts;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const parts = parseContent(message.content);

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs ${
        isUser ? 'bg-accent text-white' : 'bg-elevated text-text-secondary border border-border'
      }`}>
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      <div className={`flex-1 max-w-[85%] space-y-2 ${isUser ? 'flex flex-col items-end' : ''}`}>
        {parts.map((part, i) => {
          if (part.type === 'code') {
            return (
              <div key={i} className="w-full">
                <CodeBlock code={part.content} language={part.language || 'text'} />
              </div>
            );
          }
          return (
            <div
              key={i}
              className={`text-sm leading-relaxed whitespace-pre-wrap ${
                isUser
                  ? 'bg-accent/10 text-text px-4 py-2.5 rounded-xl rounded-br-sm'
                  : 'text-text-secondary'
              }`}
            >
              {part.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
