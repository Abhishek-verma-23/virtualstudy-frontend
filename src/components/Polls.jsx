import React from 'react';

export default function Polls({ polls = [] }) {
  return (
    <div className='space-y-4'>
      {polls.map(p => {
        const total = p.votes?.reduce((a, b) => a + b, 0) || 0;
        return (
          <div key={p._id || p.question} className='bg-white dark:bg-slate-800 p-3 rounded shadow'>
            <div className='font-medium mb-2'>{p.question}</div>
            <div className='space-y-2'>
              {p.options.map((opt, i) => {
                const pct = total ? Math.round((p.votes[i] / total) * 100) : 0;
                return (
                  <div key={i} className='flex items-center gap-3'>
                    <div className='flex-1 h-4 bg-gray-100 dark:bg-slate-700 rounded overflow-hidden'>
                      <div
                        className='bg-primary h-4 rounded'
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className='w-12 text-right text-sm'>{pct}%</div>
                    <div className='text-sm ml-2'>{opt}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
