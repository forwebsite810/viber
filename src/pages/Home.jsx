import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  FileText, 
  Download, 
  Palette, 
  Zap,
  ArrowRight,
  Sun,
  Moon,
  Star,
  Shield,
  Rocket
} from 'lucide-react';

export default function Home() {
  const { currentUser } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-20 blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-10 blur-3xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 mb-12">
            <Zap className="w-5 h-5 mr-3 text-yellow-500" />
            Professional CV Builder
          </div>
          
          <h1 className="text-7xl md:text-9xl font-poppins font-bold text-gray-900 dark:text-white mb-8 text-shadow-lg">
            Create Your
            <span className="block gradient-text">
              Perfect CV
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Build a professional CV with our easy-to-use builder. Choose from beautiful templates and create a standout resume in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {currentUser ? (
              <Button
                as={Link}
                to="/dashboard"
                size="xl"
                className="group"
              >
                Go to Dashboard
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                as={Link}
                to="/signin"
                size="xl"
                className="group"
              >
                Start Building
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            
            <Button
              as={Link}
              to="/signin"
              variant="secondary"
              size="xl"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-poppins font-bold text-gray-900 dark:text-white mb-8 text-shadow-lg">
              Why Choose Our CV Builder?
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Create professional CVs with our intuitive and powerful builder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <FileText className="w-10 h-10" />,
                title: "Easy CV Creation",
                description: "Build your CV step by step with our intuitive form-based interface",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: <Palette className="w-10 h-10" />,
                title: "Professional Templates",
                description: "Choose from beautiful, modern CV templates that showcase your skills perfectly",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: <Download className="w-10 h-10" />,
                title: "Export & Download",
                description: "Download your CV as a PDF file ready for job applications",
                gradient: "from-green-500 to-emerald-600"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                variant="glass"
                className="group p-10 text-center hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center text-white mx-auto mb-8 group-hover:glow-animation transition-all duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                  {feature.title}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Card variant="glass" className="p-16">
            <h2 className="text-5xl md:text-6xl font-poppins font-bold text-gray-900 dark:text-white mb-8 text-shadow-lg">
              Ready to Create Your CV?
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12">
              Join thousands of professionals who have created standout CVs with our builder
            </p>
            {currentUser ? (
              <Button
                as={Link}
                to="/dashboard"
                size="xl"
                className="group"
              >
                Go to Dashboard
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                as={Link}
                to="/signup"
                size="xl"
                className="group"
              >
                Get Started Free
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
