import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoAuthContext = createContext();

export function useDemoAuth() {
  return useContext(DemoAuthContext);
}

export function DemoAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (demo mode)
    const savedUser = localStorage.getItem('demoUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email, password) => {
    // Demo signup - just create a mock user
    const user = {
      uid: 'demo-user-' + Date.now(),
      email: email,
      displayName: email.split('@')[0],
      photoURL: null,
      emailVerified: true
    };
    
    localStorage.setItem('demoUser', JSON.stringify(user));
    setCurrentUser(user);
    return { user };
  };

  const login = async (email, password) => {
    // Demo login - check if user exists in localStorage
    const savedUser = localStorage.getItem('demoUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      return { user };
    } else {
      // Create a new demo user
      return await signup(email, password);
    }
  };

  const loginWithGoogle = async () => {
    // Demo Google login
    const user = {
      uid: 'demo-google-user-' + Date.now(),
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: 'https://via.placeholder.com/150',
      emailVerified: true
    };
    
    localStorage.setItem('demoUser', JSON.stringify(user));
    setCurrentUser(user);
    return { user };
  };

  const logout = async () => {
    localStorage.removeItem('demoUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
}
