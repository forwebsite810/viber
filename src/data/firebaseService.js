// Firebase service functions for data management

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';

// CV Data Management
export const saveCVData = async (userId, cvData) => {
  try {
    const cvRef = doc(db, 'cvs', userId);
    await setDoc(cvRef, {
      ...cvData,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    });
    return { success: true, id: userId };
  } catch (error) {
    console.error('Error saving CV data:', error);
    return { success: false, error: error.message };
  }
};

export const getCVData = async (userId) => {
  try {
    const cvRef = doc(db, 'cvs', userId);
    const cvSnap = await getDoc(cvRef);
    
    if (cvSnap.exists()) {
      return { success: true, data: cvSnap.data() };
    } else {
      return { success: false, error: 'CV not found' };
    }
  } catch (error) {
    console.error('Error getting CV data:', error);
    return { success: false, error: error.message };
  }
};

export const updateCVData = async (userId, updates) => {
  try {
    const cvRef = doc(db, 'cvs', userId);
    await updateDoc(cvRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating CV data:', error);
    return { success: false, error: error.message };
  }
};

// Portfolio Management
export const savePortfolio = async (userId, portfolioData) => {
  try {
    const portfolioRef = doc(db, 'portfolios', `${userId}_${Date.now()}`);
    await setDoc(portfolioRef, {
      ...portfolioData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: portfolioRef.id };
  } catch (error) {
    console.error('Error saving portfolio:', error);
    return { success: false, error: error.message };
  }
};

export const getUserPortfolios = async (userId) => {
  try {
    const portfoliosRef = collection(db, 'portfolios');
    const q = query(portfoliosRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const portfolios = [];
    querySnapshot.forEach((doc) => {
      portfolios.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: portfolios };
  } catch (error) {
    console.error('Error getting user portfolios:', error);
    return { success: false, error: error.message };
  }
};

// File Upload Management
export const uploadFile = async (userId, file, path = 'uploads') => {
  try {
    const fileRef = ref(storage, `${path}/${userId}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { 
      success: true, 
      url: downloadURL, 
      path: snapshot.ref.fullPath 
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error: error.message };
  }
};

export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: error.message };
  }
};

// User Preferences
export const saveUserPreferences = async (userId, preferences) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      preferences,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return { success: false, error: error.message };
  }
};

export const getUserPreferences = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'User preferences not found' };
    }
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return { success: false, error: error.message };
  }
};

// Analytics and Usage Tracking
export const trackPortfolioGeneration = async (userId, templateId, generationTime) => {
  try {
    const analyticsRef = doc(db, 'analytics', `${userId}_${Date.now()}`);
    await setDoc(analyticsRef, {
      userId,
      templateId,
      generationTime,
      timestamp: serverTimestamp(),
      type: 'portfolio_generation'
    });
    return { success: true };
  } catch (error) {
    console.error('Error tracking portfolio generation:', error);
    return { success: false, error: error.message };
  }
};

export const trackCVUpload = async (userId, fileSize, processingTime) => {
  try {
    const analyticsRef = doc(db, 'analytics', `${userId}_${Date.now()}`);
    await setDoc(analyticsRef, {
      userId,
      fileSize,
      processingTime,
      timestamp: serverTimestamp(),
      type: 'cv_upload'
    });
    return { success: true };
  } catch (error) {
    console.error('Error tracking CV upload:', error);
    return { success: false, error: error.message };
  }
};
