import React, { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export function useCV() {
  return useContext(CVContext);
}

export function CVProvider({ children }) {
  const [cvData, setCvData] = useState({
    // Header Section
    header: {
      fullName: '',
      title: '',
      phone: '',
      email: '',
      linkedin: '',
      summary: ''
    },
    
    // Experience
    experience: [],
    
    // Education
    education: [],
    
    // Skills
    skills: {
      technical: [],
      soft: []
    },
    
    // Programming Languages
    programmingLanguages: [],
    
    // Software/Tools
    softwareTools: [],
    
    // Volunteering/Extracurricular
    volunteering: [],
    
    // Summary Section
    profileSummary: '',
    
    // Custom Sections
    customSections: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState('TemplateOne');

  const [currentStep, setCurrentStep] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [sectionsToInclude, setSectionsToInclude] = useState({
    header: true,
    experience: true,
    education: true,
    skills: true,
    programmingLanguages: true,
    softwareTools: true,
    volunteering: false,
    profileSummary: true,
    customSections: true
  });

  const updateHeader = (header) => {
    setCvData(prev => ({
      ...prev,
      header: { ...prev.header, ...header }
    }));
  };

  const addExperience = (experience) => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id: Date.now() }]
    }));
  };

  const updateExperience = (id, experience) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, ...experience } : exp)
    }));
  };

  const removeExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = (education) => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { ...education, id: Date.now() }]
    }));
  };

  const updateEducation = (id, education) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, ...education } : edu)
    }));
  };

  const removeEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateSkills = (skills) => {
    setCvData(prev => ({
      ...prev,
      skills: { ...prev.skills, ...skills }
    }));
  };

  const updateProgrammingLanguages = (languages) => {
    setCvData(prev => ({
      ...prev,
      programmingLanguages: languages
    }));
  };

  const updateSoftwareTools = (tools) => {
    setCvData(prev => ({
      ...prev,
      softwareTools: tools
    }));
  };

  const addVolunteering = (volunteering) => {
    setCvData(prev => ({
      ...prev,
      volunteering: [...prev.volunteering, { ...volunteering, id: Date.now() }]
    }));
  };

  const updateVolunteering = (id, volunteering) => {
    setCvData(prev => ({
      ...prev,
      volunteering: prev.volunteering.map(vol => vol.id === id ? { ...vol, ...volunteering } : vol)
    }));
  };

  const removeVolunteering = (id) => {
    setCvData(prev => ({
      ...prev,
      volunteering: prev.volunteering.filter(vol => vol.id !== id)
    }));
  };

  const updateProfileSummary = (summary) => {
    setCvData(prev => ({
      ...prev,
      profileSummary: summary
    }));
  };

  const addCustomSection = (section) => {
    setCvData(prev => ({
      ...prev,
      customSections: [...prev.customSections, { ...section, id: Date.now() }]
    }));
  };

  const updateCustomSection = (id, section) => {
    setCvData(prev => ({
      ...prev,
      customSections: prev.customSections.map(sec => sec.id === id ? { ...sec, ...section } : sec)
    }));
  };

  const removeCustomSection = (id) => {
    setCvData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(sec => sec.id !== id)
    }));
  };

  const toggleSection = (section) => {
    setSectionsToInclude(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 9));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const loadExtractedData = (data) => {
    setCvData(prev => ({
      ...prev,
      ...data
    }));
  };

  const resetCV = () => {
    setCvData({
      header: {
        fullName: '',
        title: '',
        phone: '',
        email: '',
        linkedin: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: {
        technical: [],
        soft: []
      },
      programmingLanguages: [],
      softwareTools: [],
      volunteering: [],
      profileSummary: '',
      customSections: []
    });
    setCurrentStep(1);
    setIsPreviewMode(false);
    setSectionsToInclude({
      header: true,
      experience: true,
      education: true,
      skills: true,
      programmingLanguages: true,
      softwareTools: true,
      volunteering: false,
      profileSummary: true
    });
  };

  // General update function for CV data
  const updateCVData = (updates) => {
    setCvData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const value = {
    cvData,
    currentStep,
    isPreviewMode,
    sectionsToInclude,
    selectedTemplate,
    setSelectedTemplate,
    updateHeader,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    updateProgrammingLanguages,
    updateSoftwareTools,
    addVolunteering,
    updateVolunteering,
    removeVolunteering,
    updateProfileSummary,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    toggleSection,
    nextStep,
    prevStep,
    goToStep,
    togglePreview,
    loadExtractedData,
    resetCV,
    updateCVData
  };

  return (
    <CVContext.Provider value={value}>
      {children}
    </CVContext.Provider>
  );
}
