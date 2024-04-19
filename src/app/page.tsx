'use client';
 
import { Chat } from '@/components/component/chat';
import { useChat } from 'ai/react';
 
export default function Chats() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
 
  return (
    <Chat 
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}