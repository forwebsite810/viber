import React, { useState } from 'react';
import { Eye, Download, CheckCircle, Sparkles, Palette, Code, Briefcase, User } from 'lucide-react';

export default function TemplatePreview({ templates, cvData, onTemplateSelect, onDownload }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [folderName, setFolderName] = useState('My_Portfolio');

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const handleDownload = async () => {
    if (!selectedTemplate) return;
    
    if (onDownload) {
      await onDownload(selectedTemplate, folderName);
    }
  };

  const getTemplateIcon = (templateName) => {
    if (templateName.toLowerCase().includes('creative')) return <Palette className="w-6 h-6" />;
    if (templateName.toLowerCase().includes('tech')) return <Code className="w-6 h-6" />;
    if (templateName.toLowerCase().includes('corporate')) return <Briefcase className="w-6 h-6" />;
    return <User className="w-6 h-6" />;
  };

  const getTemplateColor = (index) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-purple-500 to-pink-600',
      'from-indigo-500 to-blue-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Portfolio Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Select from {templates.length} professional templates designed for your CV
          </p>
          
          {/* CV Summary */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              CV Analysis Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <p className="font-semibold text-gray-900 dark:text-white">{cvData.name}</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Title:</span>
                <p className="font-semibold text-gray-900 dark:text-white">{cvData.title}</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                <p className="font-semibold text-gray-900 dark:text-white">{cvData.experience?.length || 0} positions</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Projects:</span>
                <p className="font-semibold text-gray-900 dark:text-white">{cvData.projects?.length || 0} projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedTemplate?.id === template.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50/20' 
                  : 'hover:bg-white/20'
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Template Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getTemplateColor(index)} flex items-center justify-center text-white`}>
                  {getTemplateIcon(template.name)}
                </div>
                {selectedTemplate?.id === template.id && (
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                )}
              </div>

              {/* Template Info */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {template.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {template.description}
              </p>

              {/* Preview Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4 mr-2" />
                  <span>{template.preview.hero}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{template.preview.title}</span>
                </div>
                {template.preview.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {template.preview.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(template);
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateSelect(template);
                  }}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors text-sm ${
                    selectedTemplate?.id === template.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                  }`}
                >
                  {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Download Section */}
        {selectedTemplate && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Download Your Portfolio
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Selected: <span className="font-semibold">{selectedTemplate.name}</span>
              </p>

              {/* Folder Name Input */}
              <div className="max-w-md mx-auto mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Folder Name
                </label>
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="My_Portfolio"
                />
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                <Download className="w-6 h-6 mr-3" />
                Download Portfolio
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Your portfolio will be downloaded as a ZIP file ready for deployment
              </p>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && previewTemplate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {previewTemplate.name} - Preview
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Template Preview</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This template includes all your CV data with a professional, responsive design.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Pages Included:</h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Home (index.html)</li>
                      <li>• About (about.html)</li>
                      <li>• Experience (experience.html)</li>
                      <li>• Projects (projects.html)</li>
                      <li>• Contact (contact.html)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Features:</h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Responsive design</li>
                      <li>• Modern CSS animations</li>
                      <li>• SEO optimized</li>
                      <li>• Cross-browser compatible</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleTemplateSelect(previewTemplate);
                    setShowPreview(false);
                  }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Select This Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
