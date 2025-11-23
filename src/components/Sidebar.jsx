import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaUsers, FaBook } from 'react-icons/fa';

export default function Sidebar({ rooms }) {
  return (
    <aside className='w-72 border-r bg-white dark:bg-slate-800 dark:border-slate-700 min-h-screen p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>Rooms</h3>
        <button className='p-1 rounded bg-primary text-white'><FaPlus/></button>
      </div>
      <div className='space-y-2'>
        {rooms?.map(r => (
          <Link key={r._id} to={'/room/' + r._id} className='block p-3 rounded hover:bg-gray-100 dark:hover:bg-slate-700'>
            <div className='font-medium'>{r.name}</div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>{r.description}</div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
