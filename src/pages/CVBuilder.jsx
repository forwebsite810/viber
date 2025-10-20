import React, { useState } from 'react';
import { useCV } from '../contexts/NewCVContext';
import HeaderForm from '../components/forms/HeaderForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProgrammingLanguagesForm from '../components/forms/ProgrammingLanguagesForm';
import SoftwareToolsForm from '../components/forms/SoftwareToolsForm';
import VolunteeringForm from '../components/forms/VolunteeringForm';
import SummaryForm from '../components/forms/SummaryForm';
import CustomSectionsForm from '../components/forms/CustomSectionsForm';
import TemplateOne from '../components/templates/TemplateOne';
import PDFDownloadButton from '../components/PDFDownloadButton';
import { Eye, Download, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const steps = [
  { id: 1, name: 'Header', component: HeaderForm },
  { id: 2, name: 'Experience', component: ExperienceForm },
  { id: 3, name: 'Education', component: EducationForm },
  { id: 4, name: 'Skills', component: SkillsForm },
  { id: 5, name: 'Languages', component: ProgrammingLanguagesForm },
  { id: 6, name: 'Tools', component: SoftwareToolsForm },
  { id: 7, name: 'Volunteering', component: VolunteeringForm },
  { id: 8, name: 'Summary', component: SummaryForm },
  { id: 9, name: 'Custom', component: CustomSectionsForm }
];

export default function CVBuilder() {
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    goToStep, 
    isPreviewMode, 
    togglePreview,
    cvData 
  } = useCV();
  
  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component;

  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 1:
        return cvData.header.fullName && cvData.header.title && cvData.header.email;
      case 2:
        return cvData.experience.length > 0;
      case 3:
        return cvData.education.length > 0;
      case 4:
        return cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0;
      case 5:
        return cvData.programmingLanguages.length > 0;
      case 6:
        return cvData.softwareTools.length > 0;
      case 7:
        return cvData.volunteering.length > 0;
      case 8:
        return cvData.profileSummary.length > 0;
      case 9:
        return cvData.customSections.length > 0;
      default:
        return false;
    }
  };

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">CV Preview</h1>
              <div className="flex space-x-4">
                <button
                  onClick={togglePreview}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Edit
                </button>
                <PDFDownloadButton cvData={cvData} />
              </div>
            </div>
          </div>
          
          <TemplateOne />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Build Your Professional CV
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a comprehensive resume that showcases your skills and experience
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : isStepComplete(step.id)
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-300 text-gray-500 hover:border-blue-500'
                    }`}
                  >
                    {isStepComplete(step.id) && currentStep !== step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </button>
                  
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep === step.id ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Step {currentStep}: {steps.find(s => s.id === currentStep)?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Fill in the details for this section. Fields marked with * are required.
                  </p>
                </div>
                
                {CurrentStepComponent && <CurrentStepComponent />}
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sticky top-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Live Preview
                  </h3>
                  <button
                    onClick={togglePreview}
                    className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Full Preview
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
                  <TemplateOne />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <div className="flex space-x-4">
              <button
                onClick={togglePreview}
                className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview CV
              </button>
              
              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <PDFDownloadButton 
                  cvData={cvData} 
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Download PDF
                </PDFDownloadButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
