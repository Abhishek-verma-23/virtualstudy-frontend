import React from 'react';

export default function ChatBubble({ message, mine }) {
  return (
    <div className={lex  mb-2}>
      <div className={${mine ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100'} p-3 rounded-lg max-w-[70%]}>
        <div className='text-sm'>{message.text}</div>
        <div className='text-[10px] text-gray-400 mt-1 text-right'>{new Date(message.timestamp || Date.now()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
      </div>
    </div>
  );
}
