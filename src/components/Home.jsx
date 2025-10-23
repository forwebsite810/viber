import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const { currentUser } = useAuth();
  
  // If user is logged in, redirect to dashboard
  // If not, redirect to login
  return currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}






