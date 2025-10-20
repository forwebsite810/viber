import React from 'react';
import { User, GraduationCap, Briefcase, Code, Award, Star } from 'lucide-react';

const steps = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Education', icon: GraduationCap },
  { id: 3, name: 'Experience', icon: Briefcase },
  { id: 4, name: 'Skills', icon: Code },
  { id: 5, name: 'Projects', icon: Award },
  { id: 6, name: 'Extras', icon: Star }
];

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const isClickable = onStepClick && (isCompleted || isActive);
        
        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110' 
                  : isCompleted 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-600 dark:text-gray-400'
              } ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
            >
              <Icon className="w-6 h-6" />
            </button>
            
            {index < steps.length - 1 && (
              <div className={`w-12 h-1 mx-4 rounded-full transition-all duration-300 ${
                isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-white/20'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
