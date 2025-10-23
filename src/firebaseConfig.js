// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL_BAhlznZnxPnStWwknd9ngXETm5XoLg",
  authDomain: "builder-vibecoding.firebaseapp.com",
  projectId: "builder-vibecoding",
  storageBucket: "builder-vibecoding.firebasestorage.app",
  messagingSenderId: "608265715819",
  appId: "1:608265715819:web:fff8e9f0bf0cc09b95f12e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app); 

// Local dev notice (console only)
if (typeof window !== 'undefined' && window.location.hostname === 'https://viber-bw4jslszn-tayyab-shafiques-projects-55d7fe1c.vercel.app') {
  console.log('Running locally without Firebase emulator.');
}

export default app;
