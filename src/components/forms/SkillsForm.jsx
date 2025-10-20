import React, { useState } from 'react';
import { useCV } from '../../contexts/NewCVContext';
import { Plus, Trash2, Edit3 } from 'lucide-react';

export default function SkillsForm() {
  const { cvData, updateSkills } = useCV();
  const [isAdding, setIsAdding] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    technical: [],
    soft: []
  });

  const handleChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSkills(formData);
    setFormData({ technical: [], soft: [] });
    setIsAdding(false);
    setEditingType(null);
  };

  const handleCancel = () => {
    setFormData({ technical: [], soft: [] });
    setIsAdding(false);
    setEditingType(null);
  };

  const addSkill = (type, skill) => {
    const newSkills = [...cvData.skills[type], skill];
    updateSkills({ ...cvData.skills, [type]: newSkills });
  };

  const removeSkill = (type, index) => {
    const newSkills = cvData.skills[type].filter((_, i) => i !== index);
    updateSkills({ ...cvData.skills, [type]: newSkills });
  };

  const addSkillInput = (type) => {
    const input = document.getElementById(`${type}-input`);
    if (input && input.value.trim()) {
      addSkill(type, input.value.trim());
      input.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Skills
        </h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skills
        </button>
      </div>

      {/* Technical Skills */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Technical Skills
        </h4>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {cvData.skills.technical.map((skill, index) => (
            <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span>{skill}</span>
              <button
                onClick={() => removeSkill('technical', index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            id="technical-input"
            type="text"
            placeholder="Add technical skill"
            className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            onKeyPress={(e) => e.key === 'Enter' && addSkillInput('technical')}
          />
          <button
            onClick={() => addSkillInput('technical')}
            className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Soft Skills
        </h4>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {cvData.skills.soft.map((skill, index) => (
            <div key={index} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <span>{skill}</span>
              <button
                onClick={() => removeSkill('soft', index)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            id="soft-input"
            type="text"
            placeholder="Add soft skill"
            className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            onKeyPress={(e) => e.key === 'Enter' && addSkillInput('soft')}
          />
          <button
            onClick={() => addSkillInput('soft')}
            className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk Add Form */}
      {isAdding && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add Multiple Skills
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technical Skills (one per line)
              </label>
              <textarea
                value={formData.technical.join('\n')}
                onChange={(e) => handleChange('technical', e.target.value.split('\n').filter(s => s.trim()))}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="JavaScript&#10;React&#10;Node.js"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Soft Skills (one per line)
              </label>
              <textarea
                value={formData.soft.join('\n')}
                onChange={(e) => handleChange('soft', e.target.value.split('\n').filter(s => s.trim()))}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Leadership&#10;Communication&#10;Problem Solving"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Skills
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
