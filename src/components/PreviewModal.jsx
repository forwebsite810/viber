import React from 'react';
import { X, Download, Copy } from 'lucide-react';

const PreviewModal = ({ isOpen, onClose, cvData, onDownloadPDF, onCopyToClipboard }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">CV Preview</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={onCopyToClipboard}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
            <button
              onClick={onDownloadPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* CV Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">
                {cvData.personalInfo?.fullName || 'Your Name'}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {cvData.personalInfo?.title || 'Professional Title'}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                {cvData.personalInfo?.email && <span>{cvData.personalInfo.email}</span>}
                {cvData.personalInfo?.phone && <span>{cvData.personalInfo.phone}</span>}
                {cvData.personalInfo?.location && <span>{cvData.personalInfo.location}</span>}
                {cvData.personalInfo?.linkedin && <span>{cvData.personalInfo.linkedin}</span>}
                {cvData.personalInfo?.github && <span>{cvData.personalInfo.github}</span>}
                {cvData.personalInfo?.website && <span>{cvData.personalInfo.website}</span>}
              </div>
            </div>

            {/* Professional Summary */}
            {cvData.personalInfo?.summary && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-black leading-relaxed">
                  {cvData.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {cvData.jobExperience && cvData.jobExperience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-6">
                  {cvData.jobExperience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-black pl-4">
                      <h3 className="font-bold text-black text-lg">{exp.position}</h3>
                      <p className="text-gray-600 font-medium">{exp.company} • {exp.duration}</p>
                      {exp.description && (
                        <p className="text-black mt-2 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education && cvData.education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-black text-lg">{edu.degree}</h3>
                      <p className="text-gray-600 font-medium">{edu.institution} • {edu.year}</p>
                      {edu.details && (
                        <p className="text-black mt-1">{edu.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {cvData.skills && cvData.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">
                  SKILLS
                </h2>
                <p className="text-black">{cvData.skills.join(', ')}</p>
              </div>
            )}

            {/* Tools */}
            {cvData.tools && cvData.tools.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">
                  TOOLS
                </h2>
                <p className="text-black">{cvData.tools.join(', ')}</p>
              </div>
            )}

            {/* Projects */}
            {cvData.projects && cvData.projects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">
                  PROJECTS
                </h2>
                <div className="space-y-4">
                  {cvData.projects.map((project, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-black text-lg">{project.name}</h3>
                      {project.description && (
                        <p className="text-black mt-1 leading-relaxed">{project.description}</p>
                      )}
                      {project.technologies && (
                        <p className="text-gray-600 mt-1">
                          <strong>Technologies:</strong> {project.technologies}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {cvData.achievements && cvData.achievements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">
                  ACHIEVEMENTS
                </h2>
                <div className="space-y-4">
                  {cvData.achievements.map((achievement, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-black text-lg">{achievement.title}</h3>
                      {achievement.date && (
                        <p className="text-gray-600 font-medium">{achievement.date}</p>
                      )}
                      {achievement.description && (
                        <p className="text-black mt-1 leading-relaxed">{achievement.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {cvData.languages && cvData.languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">
                  LANGUAGES
                </h2>
                <p className="text-black">{cvData.languages.join(', ')}</p>
              </div>
            )}

            {/* Custom Section */}
            {cvData.custom?.title && cvData.custom?.content && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">
                  {cvData.custom.title.toUpperCase()}
                </h2>
                <p className="text-black leading-relaxed">{cvData.custom.content}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
