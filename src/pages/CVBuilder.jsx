import React, { useState, useEffect } from 'react';
import { useCV } from '../contexts/NewCVContext';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award, 
  Download, 
  Copy, 
  Share2,
  Eye,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function CVBuilder() {
  const { cvData, updateCVData } = useCV();
  const [activeSection, setActiveSection] = useState('personal');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Initialize CV data if empty
  useEffect(() => {
    if (!cvData || Object.keys(cvData).length === 0) {
      updateCVData({
        personal: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          title: '',
          summary: ''
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certifications: []
      });
    }
  }, [cvData, updateCVData]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updatePersonalInfo = (field, value) => {
    updateCVData({
      ...cvData,
      personal: {
        ...cvData.personal,
        [field]: value
      }
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      institution: '',
      year: '',
      details: ''
    };
    updateCVData({
      ...cvData,
      education: [...(cvData.education || []), newEducation]
    });
  };

  const updateEducation = (id, field, value) => {
    updateCVData({
      ...cvData,
      education: cvData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id) => {
    updateCVData({
      ...cvData,
      education: cvData.education.filter(edu => edu.id !== id)
    });
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      description: ''
    };
    updateCVData({
      ...cvData,
      experience: [...(cvData.experience || []), newExperience]
    });
  };

  const updateExperience = (id, field, value) => {
    updateCVData({
      ...cvData,
      experience: cvData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id) => {
    updateCVData({
      ...cvData,
      experience: cvData.experience.filter(exp => exp.id !== id)
    });
  };

  const updateSkills = (skills) => {
    updateCVData({
      ...cvData,
      skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: ''
    };
    updateCVData({
      ...cvData,
      projects: [...(cvData.projects || []), newProject]
    });
  };

  const updateProject = (id, field, value) => {
    updateCVData({
      ...cvData,
      projects: cvData.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const removeProject = (id) => {
    updateCVData({
      ...cvData,
      projects: cvData.projects.filter(project => project.id !== id)
    });
  };

  const handleDownloadPDF = async () => {
    showToastMessage('Generating PDF...');
    // PDF generation logic would go here
    setTimeout(() => {
      showToastMessage('CV downloaded successfully!');
    }, 2000);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(cvData, null, 2));
      showToastMessage('CV data copied to clipboard!');
    } catch (err) {
      showToastMessage('Failed to copy to clipboard');
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">CV Builder</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Build your professional CV with ease</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">CV Information</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Fill in your details and watch your CV come alive in real-time</p>
              </div>
              
              <div className="p-6">
                {/* Section Navigation */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Personal Information */}
                {activeSection === 'personal' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={cvData.personal?.fullName || ''}
                          onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={cvData.personal?.email || ''}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={cvData.personal?.phone || ''}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                        <input
                          type="text"
                          value={cvData.personal?.location || ''}
                          onChange={(e) => updatePersonalInfo('location', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Professional Title</label>
                      <input
                        type="text"
                        value={cvData.personal?.title || ''}
                        onChange={(e) => updatePersonalInfo('title', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="e.g., Software Engineer, Marketing Manager"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Professional Summary</label>
                      <textarea
                        value={cvData.personal?.summary || ''}
                        onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="Brief description of your professional background and key strengths..."
                      />
                    </div>
                  </div>
                )}

                {/* Education */}
                {activeSection === 'education' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        Education
                      </h3>
                      <button
                        onClick={addEducation}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Education</span>
                      </button>
                    </div>
                    {cvData.education?.map((edu, index) => (
                      <div key={edu.id} className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-slate-900 dark:text-white">Education #{index + 1}</h4>
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Degree</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Year</label>
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="2020-2024"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Details</label>
                            <input
                              type="text"
                              value={edu.details}
                              onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="GPA, Honors, etc."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {activeSection === 'experience' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Work Experience
                      </h3>
                      <button
                        onClick={addExperience}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Experience</span>
                      </button>
                    </div>
                    {cvData.experience?.map((exp, index) => (
                      <div key={exp.id} className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-slate-900 dark:text-white">Experience #{index + 1}</h4>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Position</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="Job Title"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Duration</label>
                            <input
                              type="text"
                              value={exp.duration}
                              onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="Jan 2020 - Present"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {activeSection === 'skills' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Skills
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technical Skills</label>
                      <textarea
                        value={cvData.skills?.join(', ') || ''}
                        onChange={(e) => updateSkills(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="JavaScript, React, Node.js, Python, SQL, AWS..."
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Separate skills with commas</p>
                    </div>
                  </div>
                )}

                {/* Projects */}
                {activeSection === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Projects
                      </h3>
                      <button
                        onClick={addProject}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Project</span>
                      </button>
                    </div>
                    {cvData.projects?.map((project, index) => (
                      <div key={project.id} className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-slate-900 dark:text-white">Project #{index + 1}</h4>
                          <button
                            onClick={() => removeProject(project.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Name</label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="E-commerce Website"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="Describe the project, your role, and key achievements..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies</label>
                            <input
                              type="text"
                              value={project.technologies}
                              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              placeholder="React, Node.js, MongoDB, AWS"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Live Preview
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Auto-save enabled</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 min-h-[600px]">
                  {/* CV Preview Content */}
                  <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {cvData.personal?.fullName || 'Your Name'}
                      </h1>
                      <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                        {cvData.personal?.title || 'Professional Title'}
                      </p>
                      <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        {cvData.personal?.email && <span>{cvData.personal.email}</span>}
                        {cvData.personal?.phone && <span>{cvData.personal.phone}</span>}
                        {cvData.personal?.location && <span>{cvData.personal.location}</span>}
                      </div>
                    </div>

                    {/* Summary */}
                    {cvData.personal?.summary && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Professional Summary
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {cvData.personal.summary}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {cvData.experience && cvData.experience.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Work Experience
                        </h2>
                        <div className="space-y-4">
                          {cvData.experience.map((exp, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-4">
                              <h3 className="font-semibold text-slate-900 dark:text-white">{exp.position}</h3>
                              <p className="text-slate-600 dark:text-slate-400">{exp.company} • {exp.duration}</p>
                              {exp.description && (
                                <p className="text-slate-700 dark:text-slate-300 mt-2 text-sm">{exp.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {cvData.education && cvData.education.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Education
                        </h2>
                        <div className="space-y-3">
                          {cvData.education.map((edu, index) => (
                            <div key={index}>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{edu.degree}</h3>
                              <p className="text-slate-600 dark:text-slate-400">{edu.institution} • {edu.year}</p>
                              {edu.details && (
                                <p className="text-slate-700 dark:text-slate-300 text-sm">{edu.details}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {cvData.skills && cvData.skills.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {cvData.projects && cvData.projects.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Projects
                        </h2>
                        <div className="space-y-4">
                          {cvData.projects.map((project, index) => (
                            <div key={index}>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{project.name}</h3>
                              {project.description && (
                                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">{project.description}</p>
                              )}
                              {project.technologies && (
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                  <strong>Technologies:</strong> {project.technologies}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-slate-900 dark:text-white font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}