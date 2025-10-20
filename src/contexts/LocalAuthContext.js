import React, { createContext, useContext, useState, useEffect } from 'react';

const LocalAuthContext = createContext();

export function useLocalAuth() {
  return useContext(LocalAuthContext);
}

export function LocalAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('localUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('localUser');
      }
    }
    setLoading(false);
  }, []);

  const signup = async (email, password) => {
    // Create a local user
    const user = {
      uid: 'local-user-' + Date.now(),
      email: email,
      displayName: email.split('@')[0],
      photoURL: null,
      emailVerified: true,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('localUser', JSON.stringify(user));
    setCurrentUser(user);
    return { user };
  };

  const login = async (email, password) => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('localUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email) {
        setCurrentUser(user);
        return { user };
      }
    }
    
    // If no user found, create one (demo behavior)
    return await signup(email, password);
  };

  const signInWithGoogle = async () => {
    // Demo Google login
    const user = {
      uid: 'local-google-user-' + Date.now(),
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: 'https://via.placeholder.com/150',
      emailVerified: true,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('localUser', JSON.stringify(user));
    setCurrentUser(user);
    return { user };
  };

  const logout = async () => {
    localStorage.removeItem('localUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    signInWithGoogle,
    logout
  };

  return (
    <LocalAuthContext.Provider value={value}>
      {children}
    </LocalAuthContext.Provider>
  );
}
