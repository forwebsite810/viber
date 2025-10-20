import React from 'react';
import { useCV } from '../contexts/NewCVContext';
import { useSmartAuth } from '../contexts/SmartAuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import CVPreview from '../components/CVPreview';
import TemplateOne from '../components/templates/TemplateOne';
import TemplateTwo from '../components/templates/TemplateTwo';
import TemplateThree from '../components/templates/TemplateThree';
import { 
  Sparkles, 
  Download, 
  Eye, 
  Share2, 
  CheckCircle,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

export default function PortfolioGenerated() {
  const { currentUser } = useSmartAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { cvData, selectedTemplate } = useCV();

  // Add conditional rendering for loading state
  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const safeName = cvData.name || cvData.header?.fullName || 'Not provided';
  const safeTitle = cvData.title || cvData.header?.title || 'Not provided';
  const safeSummary = cvData.summary || cvData.profileSummary || 'No summary provided';
  const safeEmail = cvData.contact?.email || cvData.header?.email || 'Not provided';
  const experiences = Array.isArray(cvData.experience) ? cvData.experience : [];
  const techSkills = Array.isArray(cvData.skills?.technical) ? cvData.skills.technical : [];
  const softSkills = Array.isArray(cvData.skills?.soft) ? cvData.skills.soft : [];

  const handleDownload = () => {
    // TODO: Implement portfolio download functionality
    console.log('Download portfolio');
  };

  const handleShare = () => {
    // TODO: Implement portfolio sharing functionality
    console.log('Share portfolio');
  };

  const handleViewLive = () => {
    // TODO: Implement live portfolio viewing
    console.log('View live portfolio');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-20 blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 mb-8">
            <CheckCircle className="w-5 h-5 mr-3" />
            Portfolio Generated Successfully!
          </div>
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-gray-900 dark:text-white mb-6 text-shadow-lg">
            Your Portfolio is Ready
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your professional portfolio has been generated based on your CV data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Portfolio Preview */}
          <div className="space-y-8">
            <Card variant="glass" className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">
                  Portfolio Preview
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {safeName && safeName !== 'Not provided' ? safeName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {safeName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {safeEmail}
                  </p>
                </div>
                
                {safeSummary && safeSummary !== 'No summary provided' && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {safeSummary}
                    </p>
                  </div>
                )}
                
                {(techSkills.length > 0 || softSkills.length > 0) && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {techSkills.slice(0, 6).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {softSkills.slice(0, 3).map((skill, index) => (
                        <span
                          key={`soft-${index}`}
                          className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {experiences.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Experience</h4>
                    <div className="space-y-3">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40">
                          <h5 className="font-semibold text-gray-900 dark:text-white">{exp.position || 'Not provided'}</h5>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{exp.company || 'Not provided'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{exp.duration || 'Not provided'}</p>
                          {exp.description && (
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={handleDownload}
                variant="primary"
                className="flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download ZIP</span>
              </Button>
              
              <Button
                onClick={handleViewLive}
                variant="secondary"
                className="flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Live</span>
              </Button>
            </div>
          </div>

          {/* Full CV Preview */}
          <div className="lg:sticky lg:top-8">
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                  Full CV Preview
                </h2>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Full View</span>
                </Button>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                {/* Render selected template preview using AI JSON */}
                {selectedTemplate === 'TemplateOne' && <TemplateOne data={cvData} />}
                {selectedTemplate === 'TemplateTwo' && <TemplateTwo data={cvData} />}
                {selectedTemplate === 'TemplateThree' && <TemplateThree data={cvData} />}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => window.location.href = '/dashboard'}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            
            <Button
              onClick={handleShare}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Portfolio</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}