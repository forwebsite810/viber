import React, { useState } from 'react';
import { useCV } from '../../contexts/NewCVContext';
import { Sparkles, Edit3 } from 'lucide-react';

export default function SummaryForm() {
  const { cvData, updateProfileSummary } = useCV();
  const [summary, setSummary] = useState(cvData.profileSummary);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateProfileSummary(summary);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSummary(cvData.profileSummary);
    setIsEditing(false);
  };

  const generateAISummary = () => {
    // Mock AI summary generation based on existing data
    const { header, experience, education, skills } = cvData;
    
    let aiSummary = `Experienced ${header.title || 'professional'} with `;
    
    if (experience.length > 0) {
      aiSummary += `${experience.length} year${experience.length > 1 ? 's' : ''} of experience in `;
      const industries = experience.map(exp => exp.company).join(', ');
      aiSummary += `various organizations including ${industries}. `;
    }
    
    if (education.length > 0) {
      const degrees = education.map(edu => edu.degree).join(', ');
      aiSummary += `Holds ${degrees}. `;
    }
    
    if (skills.technical.length > 0) {
      const topSkills = skills.technical.slice(0, 3).join(', ');
      aiSummary += `Proficient in ${topSkills} and other technologies. `;
    }
    
    if (skills.soft.length > 0) {
      const softSkills = skills.soft.slice(0, 2).join(' and ');
      aiSummary += `Strong ${softSkills} skills. `;
    }
    
    aiSummary += `Passionate about delivering high-quality solutions and continuous learning.`;
    
    setSummary(aiSummary);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Profile Summary
        </h3>
        <button
          onClick={generateAISummary}
          className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate with AI
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Professional Summary
          </h4>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Summary (2-4 sentences recommended)
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career goals..."
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {summary.length} characters
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Summary
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cvData.profileSummary ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {cvData.profileSummary}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No summary added yet. Click "Edit" to add your professional summary.
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Summary
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 Writing Tips
        </h4>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• Keep it concise (2-4 sentences, 150-200 words)</li>
          <li>• Highlight your most relevant skills and experience</li>
          <li>• Mention your career goals or what you're seeking</li>
          <li>• Use action words and quantify achievements when possible</li>
          <li>• Tailor it to the type of roles you're applying for</li>
        </ul>
      </div>
    </div>
  );
}
