import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import PortfolioPreview from './pages/PortfolioPreview';
import PortfolioGenerated from './pages/PortfolioGenerated';
import PortfolioGenerator from './components/PortfolioGenerator';
import EnhancedPortfolioGenerator from './components/EnhancedPortfolioGenerator';
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
              <Route path="/portfolio-generator" element={<PortfolioGenerator />} />
              <Route path="/enhanced-portfolio" element={<EnhancedPortfolioGenerator />} />
              
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
              <Route 
                path="/portfolio-preview" 
                element={
                  <ProtectedRoute>
                    <PortfolioPreview />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/portfolio-generated" 
                element={
                  <ProtectedRoute>
                    <PortfolioGenerated />
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
