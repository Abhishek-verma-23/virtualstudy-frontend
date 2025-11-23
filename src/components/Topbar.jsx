import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Topbar({ title }) {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className='flex items-center justify-between p-4 border-b bg-white dark:bg-slate-800 dark:border-slate-700'>
      <div className='flex items-center gap-3'>
        <div className='text-primary font-bold text-lg'>VirtualStudy</div>
        <div className='text-sm text-gray-500 dark:text-gray-300'>{title}</div>
      </div>
      <div className='flex items-center gap-3'>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700'
          title='Toggle theme'
        >
          {theme === 'dark' ? <FaSun/> : <FaMoon/>}
        </button>
      </div>
    </div>
  );
}
