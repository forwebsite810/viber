import React, { useState, useEffect } from 'react';
import { useCV } from '../contexts/NewCVContext';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Wrench, 
  Award, 
  Trophy,
  Globe,
  Plus,
  Eye,
  Download,
  CheckCircle,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Calendar,
  Building,
  Trash2,
  Edit3
} from 'lucide-react';

const sections = [
  { id: 1, name: 'Personal Info', key: 'personalInfo', icon: User, color: 'blue' },
  { id: 2, name: 'Education', key: 'education', icon: GraduationCap, color: 'green' },
  { id: 3, name: 'Job Experience', key: 'jobExperience', icon: Briefcase, color: 'purple' },
  { id: 4, name: 'Skills', key: 'skills', icon: Code, color: 'orange' },
  { id: 5, name: 'Tools', key: 'tools', icon: Wrench, color: 'red' },
  { id: 6, name: 'Projects', key: 'projects', icon: Award, color: 'indigo' },
  { id: 7, name: 'Achievements', key: 'achievements', icon: Trophy, color: 'yellow' },
  { id: 8, name: 'Languages', key: 'languages', icon: Globe, color: 'teal' },
  { id: 9, name: 'Custom', key: 'custom', icon: Plus, color: 'pink' }
];

export default function CVBuilder() {
  const { cvData, updateCVData } = useCV();
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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

  const updatePersonalInfo = (field, value) => {
    updateCVData({
      personalInfo: {
        ...cvData.personalInfo,
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
      education: [...(cvData.education || []), newEducation]
    });
  };

  const updateEducation = (id, field, value) => {
    updateCVData({
      education: cvData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id) => {
    updateCVData({
      education: cvData.education.filter(edu => edu.id !== id)
    });
  };

  const addJobExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      description: ''
    };
    updateCVData({
      jobExperience: [...(cvData.jobExperience || []), newExperience]
    });
  };

  const updateJobExperience = (id, field, value) => {
    updateCVData({
      jobExperience: cvData.jobExperience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeJobExperience = (id) => {
    updateCVData({
      jobExperience: cvData.jobExperience.filter(exp => exp.id !== id)
    });
  };

  const updateSkills = (skills) => {
    updateCVData({
      skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    });
  };

  const updateTools = (tools) => {
    updateCVData({
      tools: tools.split(',').map(tool => tool.trim()).filter(tool => tool)
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    updateCVData({
      projects: [...(cvData.projects || []), newProject]
    });
  };

  const updateProject = (id, field, value) => {
    updateCVData({
      projects: cvData.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const removeProject = (id) => {
    updateCVData({
      projects: cvData.projects.filter(project => project.id !== id)
    });
  };

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now(),
      title: '',
      description: '',
      date: ''
    };
    updateCVData({
      achievements: [...(cvData.achievements || []), newAchievement]
    });
  };

  const updateAchievement = (id, field, value) => {
    updateCVData({
      achievements: cvData.achievements.map(achievement => 
        achievement.id === id ? { ...achievement, [field]: value } : achievement
      )
    });
  };

  const removeAchievement = (id) => {
    updateCVData({
      achievements: cvData.achievements.filter(achievement => achievement.id !== id)
    });
  };

  const updateLanguages = (languages) => {
    updateCVData({
      languages: languages.split(',').map(lang => lang.trim()).filter(lang => lang)
    });
  };

  const updateCustom = (field, value) => {
    updateCVData({
      custom: {
        ...cvData.custom,
        [field]: value
      }
    });
  };

  const getSectionIcon = (sectionKey) => {
    const section = sections.find(s => s.key === sectionKey);
    return section ? section.icon : User;
  };

  const getSectionColor = (sectionKey) => {
    const section = sections.find(s => s.key === sectionKey);
    return section ? section.color : 'blue';
  };

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
              <User className="w-6 h-6 mr-3 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-slate-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo?.fullName || ''}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-slate-500" />
                  Professional Title
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo?.title || ''}
                  onChange={(e) => updatePersonalInfo('title', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-slate-500" />
                  Email *
                </label>
                <input
                  type="email"
                  value={cvData.personalInfo?.email || ''}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-slate-500" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={cvData.personalInfo?.phone || ''}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                  Location
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo?.location || ''}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Linkedin className="w-4 h-4 mr-2 text-slate-500" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={cvData.personalInfo?.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <Github className="w-4 h-4 mr-2 text-slate-500" />
                  GitHub
                </label>
                <input
                  type="url"
                  value={cvData.personalInfo?.github || ''}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="https://github.com/yourname"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2 text-slate-500" />
                  Website
                </label>
                <input
                  type="url"
                  value={cvData.personalInfo?.website || ''}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <Edit3 className="w-4 h-4 mr-2 text-slate-500" />
                Professional Summary
              </label>
              <textarea
                value={cvData.personalInfo?.summary || ''}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Brief description of your professional background and key strengths..."
              />
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-green-600" />
                Education
              </h3>
              <button
                onClick={addEducation}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Education</span>
              </button>
            </div>
            {cvData.education?.map((edu, index) => (
              <div key={edu.id} className="p-6 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-slate-900 dark:text-white flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                    Education #{index + 1}
                  </h4>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <Building className="w-4 h-4 mr-2 text-slate-500" />
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                      Year
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="2020-2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Details</label>
                    <input
                      type="text"
                      value={edu.details}
                      onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="GPA, Honors, etc."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'jobExperience':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-purple-600" />
                Job Experience
              </h3>
              <button
                onClick={addJobExperience}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>
            {cvData.jobExperience?.map((exp, index) => (
              <div key={exp.id} className="p-6 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-slate-900 dark:text-white flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
                    Experience #{index + 1}
                  </h4>
                  <button
                    onClick={() => removeJobExperience(exp.id)}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <Building className="w-4 h-4 mr-2 text-slate-500" />
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateJobExperience(exp.id, 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateJobExperience(exp.id, 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                      Duration
                    </label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateJobExperience(exp.id, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateJobExperience(exp.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
              <Code className="w-6 h-6 mr-3 text-orange-600" />
              Skills
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <Code className="w-4 h-4 mr-2 text-slate-500" />
                Technical Skills
              </label>
              <textarea
                value={cvData.skills?.join(', ') || ''}
                onChange={(e) => updateSkills(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="JavaScript, React, Node.js, Python, SQL, AWS..."
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Separate skills with commas</p>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
              <Wrench className="w-6 h-6 mr-3 text-red-600" />
              Tools
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-slate-500" />
                Tools & Technologies
              </label>
              <textarea
                value={cvData.tools?.join(', ') || ''}
                onChange={(e) => updateTools(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="VS Code, Git, Docker, AWS, Figma, Photoshop..."
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Separate tools with commas</p>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
                <Award className="w-6 h-6 mr-3 text-indigo-600" />
                Projects
              </h3>
              <button
                onClick={addProject}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>
            {cvData.projects?.map((project, index) => (
              <div key={project.id} className="p-6 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-slate-900 dark:text-white flex items-center">
                    <Award className="w-4 h-4 mr-2 text-indigo-600" />
                    Project #{index + 1}
                  </h4>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Describe the project, your role, and key achievements..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                        <Code className="w-4 h-4 mr-2 text-slate-500" />
                        Technologies
                      </label>
                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="React, Node.js, MongoDB, AWS"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                        <ExternalLink className="w-4 h-4 mr-2 text-slate-500" />
                        Link
                      </label>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="https://github.com/yourname/project"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-yellow-600" />
                Achievements
              </h3>
              <button
                onClick={addAchievement}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Achievement</span>
              </button>
            </div>
            {cvData.achievements?.map((achievement, index) => (
              <div key={achievement.id} className="p-6 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-slate-900 dark:text-white flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
                    Achievement #{index + 1}
                  </h4>
                  <button
                    onClick={() => removeAchievement(achievement.id)}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Award Name or Achievement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                      Date
                    </label>
                    <input
                      type="text"
                      value={achievement.date}
                      onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="2023 or Jan 2023"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                    <textarea
                      value={achievement.description}
                      onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Describe the achievement and its significance..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'languages':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
              <Globe className="w-6 h-6 mr-3 text-teal-600" />
              Languages
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-slate-500" />
                Languages
              </label>
              <textarea
                value={cvData.languages?.join(', ') || ''}
                onChange={(e) => updateLanguages(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="English (Native), Spanish (Fluent), French (Intermediate)..."
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Include proficiency levels, e.g., "English (Native), Spanish (Fluent)"</p>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
              <Plus className="w-6 h-6 mr-3 text-pink-600" />
              Custom Section
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Section Title</label>
              <input
                type="text"
                value={cvData.custom?.title || ''}
                onChange={(e) => updateCustom('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="e.g., Certifications, Publications, Volunteer Work"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <Edit3 className="w-4 h-4 mr-2 text-slate-500" />
                Content
              </label>
              <textarea
                value={cvData.custom?.content || ''}
                onChange={(e) => updateCustom('content', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Add any additional information that doesn't fit in other sections..."
              />
            </div>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sections</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Jump to any section</p>
              </div>
              
              <div className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.key;
                    const colorClasses = {
                      blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
                      green: 'text-green-600 bg-green-50 dark:bg-green-900/20',
                      purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
                      orange: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
                      red: 'text-red-600 bg-red-50 dark:bg-red-900/20',
                      indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20',
                      yellow: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
                      teal: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20',
                      pink: 'text-pink-600 bg-pink-50 dark:bg-pink-900/20'
                    };
                    
                    return (
                      <button
                        key={section.key}
                        onClick={() => setActiveSection(section.key)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? `${colorClasses[section.color]} shadow-md`
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{section.name}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-current rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  {React.createElement(getSectionIcon(activeSection), {
                    className: `w-6 h-6 text-${getSectionColor(activeSection)}-600`
                  })}
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {sections.find(s => s.key === activeSection)?.name}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Fill in your information</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {renderCurrentSection()}
              </div>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Live Preview
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Auto-save</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 min-h-[500px] text-xs">
                  {/* CV Preview Content */}
                  <div className="max-w-full">
                    {/* Header */}
                    <div className="text-center mb-4">
                      <h1 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {cvData.personalInfo?.fullName || 'Your Name'}
                      </h1>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {cvData.personalInfo?.title || 'Professional Title'}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        {cvData.personalInfo?.email && <span>{cvData.personalInfo.email}</span>}
                        {cvData.personalInfo?.phone && <span>{cvData.personalInfo.phone}</span>}
                        {cvData.personalInfo?.location && <span>{cvData.personalInfo.location}</span>}
                      </div>
                    </div>

                    {/* Summary */}
                    {cvData.personalInfo?.summary && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Professional Summary
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                          {cvData.personalInfo.summary}
                        </p>
                      </div>
                    )}

                    {/* Job Experience */}
                    {cvData.jobExperience && cvData.jobExperience.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Work Experience
                        </h2>
                        <div className="space-y-2">
                          {cvData.jobExperience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-blue-500 pl-2">
                              <h3 className="font-semibold text-slate-900 dark:text-white text-xs">{exp.position}</h3>
                              <p className="text-slate-600 dark:text-slate-400 text-xs">{exp.company} • {exp.duration}</p>
                              {exp.description && (
                                <p className="text-slate-700 dark:text-slate-300 text-xs mt-1">{exp.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {cvData.education && cvData.education.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Education
                        </h2>
                        <div className="space-y-1">
                          {cvData.education.map((edu, index) => (
                            <div key={index}>
                              <h3 className="font-semibold text-slate-900 dark:text-white text-xs">{edu.degree}</h3>
                              <p className="text-slate-600 dark:text-slate-400 text-xs">{edu.institution} • {edu.year}</p>
                              {edu.details && (
                                <p className="text-slate-700 dark:text-slate-300 text-xs">{edu.details}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {cvData.skills && cvData.skills.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Skills
                        </h2>
                        <div className="flex flex-wrap gap-1">
                          {cvData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tools */}
                    {cvData.tools && cvData.tools.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Tools
                        </h2>
                        <div className="flex flex-wrap gap-1">
                          {cvData.tools.map((tool, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {cvData.projects && cvData.projects.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Projects
                        </h2>
                        <div className="space-y-2">
                          {cvData.projects.map((project, index) => (
                            <div key={index}>
                              <h3 className="font-semibold text-slate-900 dark:text-white text-xs">{project.name}</h3>
                              {project.description && (
                                <p className="text-slate-700 dark:text-slate-300 text-xs mb-1">{project.description}</p>
                              )}
                              {project.technologies && (
                                <p className="text-slate-600 dark:text-slate-400 text-xs">
                                  <strong>Tech:</strong> {project.technologies}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {cvData.achievements && cvData.achievements.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Achievements
                        </h2>
                        <div className="space-y-1">
                          {cvData.achievements.map((achievement, index) => (
                            <div key={index}>
                              <h3 className="font-semibold text-slate-900 dark:text-white text-xs">{achievement.title}</h3>
                              {achievement.date && (
                                <p className="text-slate-600 dark:text-slate-400 text-xs">{achievement.date}</p>
                              )}
                              {achievement.description && (
                                <p className="text-slate-700 dark:text-slate-300 text-xs">{achievement.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Languages */}
                    {cvData.languages && cvData.languages.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          Languages
                        </h2>
                        <div className="flex flex-wrap gap-1">
                          {cvData.languages.map((language, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs"
                            >
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom Section */}
                    {cvData.custom?.title && (
                      <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-300 dark:border-slate-600 pb-1">
                          {cvData.custom.title}
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                          {cvData.custom.content}
                        </p>
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