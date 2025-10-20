import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Testing...');
  const [error, setError] = useState(null);
  const [testUser, setTestUser] = useState(null);

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const testFirebaseConnection = async () => {
    try {
      setStatus('Testing Firebase connection...');
      
      // Test 1: Check if auth is available
      if (!auth) {
        throw new Error('Firebase auth not initialized');
      }
      
      setStatus('Firebase auth initialized ✅');
      
      // Test 2: Try to create a test user
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = 'testpassword123';
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        setTestUser(userCredential.user);
        setStatus('Firebase authentication working ✅');
        
        // Clean up test user
        setTimeout(() => {
          if (userCredential.user) {
            userCredential.user.delete();
          }
        }, 5000);
        
      } catch (authError) {
        if (authError.code === 'auth/configuration-not-found') {
          setError('Firebase Authentication not enabled in console');
          setStatus('❌ Firebase Authentication not configured');
        } else if (authError.code === 'auth/domain-not-authorized') {
          setError('localhost not in authorized domains');
          setStatus('❌ Domain not authorized');
        } else {
          setError(authError.message);
          setStatus('❌ Firebase error: ' + authError.code);
        }
      }
      
    } catch (error) {
      setError(error.message);
      setStatus('❌ Firebase connection failed');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Firebase Connection Test</h2>
      
      <div className="mb-4">
        <strong>Status:</strong> <span className={status.includes('✅') ? 'text-green-600' : 'text-red-600'}>{status}</span>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <strong>Error:</strong> <span className="text-red-600">{error}</span>
        </div>
      )}
      
      {testUser && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <strong>Test User Created:</strong> <span className="text-green-600">{testUser.email}</span>
        </div>
      )}
      
      <div className="text-sm text-gray-600">
        <p><strong>Next Steps:</strong></p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Go to Firebase Console: <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://console.firebase.google.com/</a></li>
          <li>Select project: <code>builder-vibecoding</code></li>
          <li>Go to Authentication → Sign-in method</li>
          <li>Enable Email/Password and Google</li>
          <li>Add localhost to authorized domains</li>
        </ol>
      </div>
    </div>
  );
}
