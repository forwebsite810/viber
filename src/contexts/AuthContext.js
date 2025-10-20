import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useDemoAuth } from './DemoAuthContext';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check if Firebase is properly configured
  useEffect(() => {
    const checkFirebaseConfig = async () => {
      try {
        // Check if Firebase config is valid
        if (!auth || !auth.app) {
          throw new Error('Firebase not initialized');
        }
        
        // Try a simple Firebase operation with longer timeout
        await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
          });
          
          // Longer timeout for Firebase connection
          setTimeout(() => {
            unsubscribe();
            reject(new Error('Firebase connection timeout'));
          }, 5000);
        });
        
        setFirebaseError(null);
        setIsDemoMode(false);
        setLoading(false);
      } catch (error) {
        console.warn('Firebase not configured properly, using demo mode:', error.message);
        setFirebaseError('Firebase configuration not found - using demo mode');
        setIsDemoMode(true);
        setLoading(false);
      }
    };

    checkFirebaseConfig();
  }, []);

  // Sign up with email and password
  async function signup(email, password) {
    try {
      if (isDemoMode) {
        // Use demo mode
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
      }
      
      // Try Firebase signup
      try {
        return await createUserWithEmailAndPassword(auth, email, password);
      } catch (firebaseError) {
        console.error('Firebase signup error:', firebaseError);
        
        // If Firebase fails, automatically switch to demo mode
        if (firebaseError.code === 'auth/configuration-not-found' || 
            firebaseError.code === 'auth/domain-not-authorized') {
          console.log('Firebase not configured, switching to demo mode');
          setIsDemoMode(true);
          setFirebaseError('Firebase Authentication not enabled in console. Go to Firebase Console → Authentication → Sign-in method and enable Email/Password.');
          
          // Create demo user
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
        }
        
        throw firebaseError;
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // Sign in with email and password
  async function login(email, password) {
    try {
      if (isDemoMode) {
        // Use demo mode
        const savedUser = localStorage.getItem('demoUser');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setCurrentUser(user);
          return { user };
        } else {
          return await signup(email, password);
        }
      }
      
      // Try Firebase login
      try {
        return await signInWithEmailAndPassword(auth, email, password);
      } catch (firebaseError) {
        console.error('Firebase login error:', firebaseError);
        
        // If Firebase fails, automatically switch to demo mode
        if (firebaseError.code === 'auth/configuration-not-found' || 
            firebaseError.code === 'auth/domain-not-authorized') {
          console.log('Firebase not configured, switching to demo mode');
          setIsDemoMode(true);
          setFirebaseError('Firebase Authentication not enabled in console. Go to Firebase Console → Authentication → Sign-in method and enable Email/Password.');
          
          // Use demo mode
          const savedUser = localStorage.getItem('demoUser');
          if (savedUser) {
            const user = JSON.parse(savedUser);
            setCurrentUser(user);
            return { user };
          } else {
            return await signup(email, password);
          }
        }
        
        throw firebaseError;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Sign in with Google
  async function signInWithGoogle() {
    try {
      if (isDemoMode) {
        // Use demo mode
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
      }
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  // Sign out
  async function logout() {
    try {
      if (isDemoMode) {
        localStorage.removeItem('demoUser');
        setCurrentUser(null);
        return;
      }
      return await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  useEffect(() => {
    if (isDemoMode) {
      // Demo mode - check localStorage
      const savedUser = localStorage.getItem('demoUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      setLoading(false);
    } else {
      // Firebase mode
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      return unsubscribe;
    }
  }, [isDemoMode]);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    signInWithGoogle,
    logout,
    firebaseError,
    isDemoMode
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
