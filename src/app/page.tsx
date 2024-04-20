'use client';
 
import { Chat } from '@/components/component/Chat';
import { useChat } from 'ai/react';
 
export default function Chats() {
  const {messages, input, handleInputChange, handleSubmit } = useChat({});

  const data = localStorage.getItem('invoice');
  
  const messagesWithInvoice = [...messages, { content: data }];



 
  return (
    <Chat 
      messages={messagesWithInvoice}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}