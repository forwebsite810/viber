import React from 'react';
import { useCV } from '../contexts/NewCVContext';
import { useSmartAuth } from '../contexts/SmartAuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StepIndicator from '../components/StepIndicator';
import CVPreview from '../components/CVPreview';
import PersonalInfoStep from '../components/steps/PersonalInfoStep';
import EducationStep from '../components/steps/EducationStep';
import ExperienceStep from '../components/steps/ExperienceStep';
import SkillsStep from '../components/steps/SkillsStep';
import ProjectsStep from '../components/steps/ProjectsStep';
import ExtrasStep from '../components/steps/ExtrasStep';
import { 
  ArrowLeft,
  ArrowRight,
  Eye,
  Download,
  CheckCircle
} from 'lucide-react';

export default function CreateCV() {
  const { currentUser } = useSmartAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    goToStep,
    cvData,
    isPreviewOpen,
    setIsPreviewOpen
  } = useCV();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <EducationStep />;
      case 3:
        return <ExperienceStep />;
      case 4:
        return <SkillsStep />;
      case 5:
        return <ProjectsStep />;
      case 6:
        return <ExtrasStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return cvData.personalInfo.fullName && cvData.personalInfo.email;
      case 2:
        return true; // Education is optional
      case 3:
        return true; // Experience is optional
      case 4:
        return true; // Skills are optional
      case 5:
        return true; // Projects are optional
      case 6:
        return true; // Extras are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      nextStep();
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const handlePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  const handleFinish = () => {
    // Navigate to preview page
    window.location.href = '/preview-cv';
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
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-gray-900 dark:text-white mb-6 text-shadow-lg">
            Create Your CV
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Build a professional CV step by step with our intuitive form builder
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} onStepClick={goToStep} />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-8">
            {renderCurrentStep()}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handlePrev}
                disabled={currentStep === 1}
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={handlePreview}
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isPreviewOpen ? 'Hide' : 'Show'} Preview</span>
                </Button>

                {currentStep === 6 ? (
                  <Button
                    onClick={handleFinish}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Preview CV</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`lg:sticky lg:top-8 transition-all duration-500 ${
            isPreviewOpen ? 'block' : 'hidden lg:block'
          }`}>
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                  Live Preview
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
                </div>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                <CVPreview />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}