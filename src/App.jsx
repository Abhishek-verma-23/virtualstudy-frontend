import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RoomPage from './pages/RoomPage';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeContext = React.createContext();

function AppWrapper() {
  const [theme, setTheme] = useState(() => localStorage.getItem('vs_theme') || 'light');
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('vs_theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BrowserRouter>
        <div className='min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors'>
          <div className='max-w-7xl mx-auto'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/room/:id' element={<RoomPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default AppWrapper;
