import React from 'react';

export default function FileGrid({ files }) {
  return (
    <div className='grid grid-cols-3 gap-3'>
      {files.map(f => (
        <div key={f._id || f.title} className='bg-white dark:bg-slate-800 rounded p-3 shadow'>
          <div className='h-40 flex items-center justify-center bg-gray-50 dark:bg-slate-900 rounded mb-2'>
            {f.mimeType?.startsWith('image') ? <img src={f.url} alt={f.title} className='max-h-full max-w-full'/> : <div className='text-sm text-gray-400'>Preview</div>}
          </div>
          <div className='text-sm font-medium truncate'>{f.title}</div>
          <div className='text-xs text-gray-500 flex justify-between mt-2'>
            <span>{f.fileSize || '—'}</span>
            <a className='text-primary text-xs' href={f.url} target='_blank' rel='noreferrer'>Download</a>
          </div>
        </div>
      ))}
    </div>
  );
}
