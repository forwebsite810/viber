import React, { createContext, useContext, useState, useReducer } from 'react';

const CVContext = createContext();

export function useCV() {
  return useContext(CVContext);
}

const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    github: '',
    website: '',
    twitter: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  extras: {
    certifications: [],
    hobbies: [],
    languages: []
  }
};

function cvReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload]
      };
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu, index) => 
          index === action.index ? { ...edu, ...action.payload } : edu
        )
      };
    
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload]
      };
    
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((exp, index) => 
          index === action.index ? { ...exp, ...action.payload } : exp
        )
      };
    
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload]
      };
    
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project, index) => 
          index === action.index ? { ...project, ...action.payload } : project
        )
      };
    
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((_, index) => index !== action.index)
      };
    
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        extras: {
          ...state.extras,
          certifications: [...state.extras.certifications, action.payload]
        }
      };
    
    case 'ADD_HOBBY':
      return {
        ...state,
        extras: {
          ...state.extras,
          hobbies: [...state.extras.hobbies, action.payload]
        }
      };
    
    case 'ADD_LANGUAGE':
      return {
        ...state,
        extras: {
          ...state.extras,
          languages: [...state.extras.languages, action.payload]
        }
      };
    
    case 'RESET_CV':
      return initialState;
    
    default:
      return state;
  }
}

export function CVProvider({ children }) {
  // Hold raw extracted AI data to avoid any hardcoded fallbacks
  const [extractedData, setExtractedData] = useState({});
  const [cvData, dispatch] = useReducer(cvReducer, initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const updatePersonalInfo = (data) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data });
  };

  const addEducation = (data) => {
    dispatch({ type: 'ADD_EDUCATION', payload: data });
  };

  const updateEducation = (index, data) => {
    dispatch({ type: 'UPDATE_EDUCATION', index, payload: data });
  };

  const removeEducation = (index) => {
    dispatch({ type: 'REMOVE_EDUCATION', index });
  };

  const addExperience = (data) => {
    dispatch({ type: 'ADD_EXPERIENCE', payload: data });
  };

  const updateExperience = (index, data) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', index, payload: data });
  };

  const removeExperience = (index) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', index });
  };

  const addSkill = (skill) => {
    dispatch({ type: 'ADD_SKILL', payload: skill });
  };

  const removeSkill = (index) => {
    dispatch({ type: 'REMOVE_SKILL', index });
  };

  const addProject = (data) => {
    dispatch({ type: 'ADD_PROJECT', payload: data });
  };

  const updateProject = (index, data) => {
    dispatch({ type: 'UPDATE_PROJECT', index, payload: data });
  };

  const removeProject = (index) => {
    dispatch({ type: 'REMOVE_PROJECT', index });
  };

  const addCertification = (data) => {
    dispatch({ type: 'ADD_CERTIFICATION', payload: data });
  };

  const addHobby = (hobby) => {
    dispatch({ type: 'ADD_HOBBY', payload: hobby });
  };

  const addLanguage = (data) => {
    dispatch({ type: 'ADD_LANGUAGE', payload: data });
  };

  const loadExtractedData = (data) => {
    // Clear existing data
    dispatch({ type: 'RESET_CV' });
    
    // Load personal info
    if (data.personalInfo) {
      dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data.personalInfo });
    }
    
    // Load education
    if (data.education) {
      data.education.forEach(edu => {
        dispatch({ type: 'ADD_EDUCATION', payload: edu });
      });
    }
    
    // Load experience
    if (data.experience) {
      data.experience.forEach(exp => {
        dispatch({ type: 'ADD_EXPERIENCE', payload: exp });
      });
    }
    
    // Load skills
    if (data.skills) {
      data.skills.forEach(skill => {
        dispatch({ type: 'ADD_SKILL', payload: skill });
      });
    }
    
    // Load projects
    if (data.projects) {
      data.projects.forEach(project => {
        dispatch({ type: 'ADD_PROJECT', payload: project });
      });
    }
    
    // Load certifications
    if (data.certifications) {
      data.certifications.forEach(cert => {
        dispatch({ type: 'ADD_CERTIFICATION', payload: cert });
      });
    }
    
    // Load hobbies
    if (data.hobbies) {
      data.hobbies.forEach(hobby => {
        dispatch({ type: 'ADD_HOBBY', payload: hobby });
      });
    }
    
    // Load languages
    if (data.languages) {
      data.languages.forEach(lang => {
        dispatch({ type: 'ADD_LANGUAGE', payload: lang });
      });
    }
  };

  const resetCV = () => {
    dispatch({ type: 'RESET_CV' });
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const value = {
    extractedData,
    setExtractedData,
    cvData,
    currentStep,
    isPreviewOpen,
    setIsPreviewOpen,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    addHobby,
    addLanguage,
    loadExtractedData,
    resetCV,
    nextStep,
    prevStep,
    goToStep
  };

  return (
    <CVContext.Provider value={value}>
      {children}
    </CVContext.Provider>
  );
}
