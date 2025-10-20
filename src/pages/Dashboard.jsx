import React from 'react';
import { Link } from 'react-router-dom';
import { useSmartAuth } from '../contexts/SmartAuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Sun, 
  Moon,
  LogOut,
  User,
  History,
  Zap,
  Palette,
  Download,
  Eye
} from 'lucide-react';

export default function Dashboard() {
  const { currentUser, logout } = useSmartAuth();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-20 blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-10 blur-3xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 mb-8">
            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
            Professional CV Builder
          </div>
          
          <h1 className="text-6xl md:text-8xl font-poppins font-bold text-gray-900 dark:text-white mb-8 text-shadow-lg">
            Welcome Back!
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create your professional CV with our easy-to-use builder. Choose from beautiful templates and build your perfect resume.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="max-w-4xl mx-auto mb-20">
          {/* Create CV Card */}
          <Card 
            variant="glass" 
            hover={true}
            className="group relative overflow-hidden p-12 cursor-pointer"
            onClick={() => window.location.href = '/cv-builder'}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-white mb-8 group-hover:glow-animation transition-all duration-500">
                <FileText className="w-10 h-10" />
              </div>
              
              <h2 className="text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                Build Professional CV
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Create a comprehensive, professional resume with our step-by-step builder. Includes all sections: experience, education, skills, and more.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                  Start Creating
                  <ArrowRight className="w-6 h-6 ml-3" />
                </div>
                
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card variant="elevated" className="p-8 text-center group hover:scale-105 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:glow-animation">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Preview</h3>
            <p className="text-gray-600 dark:text-gray-300">Preview your CV before downloading</p>
          </Card>
          
          <Card variant="elevated" className="p-8 text-center group hover:scale-105 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:glow-animation">
              <Palette className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Customize</h3>
            <p className="text-gray-600 dark:text-gray-300">Choose from stunning templates</p>
          </Card>
          
          <Card variant="elevated" className="p-8 text-center group hover:scale-105 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:glow-animation">
              <Download className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Export</h3>
            <p className="text-gray-600 dark:text-gray-300">Download as ZIP or deploy online</p>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card variant="glass" className="p-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center text-white">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center glow-animation">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">CV Created</p>
                  <p className="text-gray-600 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                Completed
              </span>
            </div>
            
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">CV Created</p>
                  <p className="text-gray-600 dark:text-gray-400">Yesterday</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                Draft
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
