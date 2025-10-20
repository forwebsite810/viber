import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LocalAuthProvider } from './contexts/LocalAuthContext';
import { SmartAuthProvider } from './contexts/SmartAuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CVProvider } from './contexts/NewCVContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateCV from './pages/CreateCV';
import CVBuilder from './pages/CVBuilder';
import PreviewCV from './pages/PreviewCV';
import NotFound from './pages/NotFound';
import FirebaseTest from './components/FirebaseTest';
import FirebaseStatus from './components/FirebaseStatus';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <LocalAuthProvider>
            <SmartAuthProvider>
              <CVProvider>
                <Router>
            <div className="App">
              <Navbar />
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/firebase-test" element={<FirebaseTest />} />
              <Route path="/firebase-status" element={<FirebaseStatus />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-cv" 
                element={
                  <ProtectedRoute>
                    <CreateCV />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cv-builder" 
                element={
                  <ProtectedRoute>
                    <CVBuilder />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/preview-cv" 
                element={
                  <ProtectedRoute>
                    <PreviewCV />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
              </CVProvider>
            </SmartAuthProvider>
          </LocalAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
