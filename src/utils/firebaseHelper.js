// Firebase helper utilities
import { auth } from '../firebaseConfig';

export const checkFirebaseAuth = async () => {
  try {
    // Check if auth is available
    if (!auth) {
      return { success: false, error: 'Firebase auth not initialized' };
    }
    
    // Try to get current user (this tests the connection)
    const user = auth.currentUser;
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const testFirebaseSignup = async (email, password) => {
  try {
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message, code: error.code };
  }
};

export const getFirebaseErrorInfo = (errorCode) => {
  const errorMessages = {
    'auth/configuration-not-found': 'Firebase Authentication not enabled. Go to Firebase Console → Authentication → Sign-in method and enable Email/Password.',
    'auth/domain-not-authorized': 'localhost not in authorized domains. Go to Firebase Console → Authentication → Settings and add localhost.',
    'auth/network-request-failed': 'Network error. Check your internet connection.',
    'auth/too-many-requests': 'Too many requests. Please try again later.',
    'auth/user-disabled': 'User account has been disabled.',
    'auth/user-not-found': 'User not found.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'Email already in use.',
    'auth/weak-password': 'Password is too weak.',
    'auth/invalid-email': 'Invalid email address.'
  };
  
  return errorMessages[errorCode] || `Unknown error: ${errorCode}`;
};
