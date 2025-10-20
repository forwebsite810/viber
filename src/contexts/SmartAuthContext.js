import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth as useFirebaseAuth } from './AuthContext';
import { useLocalAuth } from './LocalAuthContext';

const SmartAuthContext = createContext();

export function useSmartAuth() {
  return useContext(SmartAuthContext);
}

export function SmartAuthProvider({ children }) {
  const [authMode, setAuthMode] = useState('checking'); // 'firebase', 'local', 'checking'
  const [firebaseError, setFirebaseError] = useState(null);
  
  const firebaseAuth = useFirebaseAuth();
  const localAuth = useLocalAuth();

  useEffect(() => {
    const checkAuthMode = async () => {
      try {
        // Try to access Firebase auth
        if (firebaseAuth && !firebaseAuth.isDemoMode) {
          setAuthMode('firebase');
          setFirebaseError(null);
        } else {
          setAuthMode('local');
          setFirebaseError('Firebase not configured - using local authentication');
        }
      } catch (error) {
        setAuthMode('local');
        setFirebaseError('Firebase error - using local authentication');
      }
    };

    checkAuthMode();
  }, [firebaseAuth]);

  // Use the appropriate auth context based on mode
  const currentAuth = authMode === 'firebase' ? firebaseAuth : localAuth;

  const value = {
    ...currentAuth,
    authMode,
    firebaseError,
    isDemoMode: authMode === 'local'
  };

  return (
    <SmartAuthContext.Provider value={value}>
      {children}
    </SmartAuthContext.Provider>
  );
}
