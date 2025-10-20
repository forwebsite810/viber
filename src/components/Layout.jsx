import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';

export default function Layout({ children, showNavbar = true }) {
  const { currentUser } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {showNavbar && <Navbar />}
      <main className={showNavbar ? 'pt-0' : ''}>
        {children}
      </main>
    </div>
  );
}
