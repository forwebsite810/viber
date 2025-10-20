import React, { useState } from 'react';
import { useCV } from '../../contexts/NewCVContext';
import { Plus, Trash2 } from 'lucide-react';

export default function ProgrammingLanguagesForm() {
  const { cvData, updateProgrammingLanguages } = useCV();
  const [newLanguage, setNewLanguage] = useState('');

  const addLanguage = () => {
    if (newLanguage.trim() && !cvData.programmingLanguages.includes(newLanguage.trim())) {
      updateProgrammingLanguages([...cvData.programmingLanguages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (index) => {
    const newLanguages = cvData.programmingLanguages.filter((_, i) => i !== index);
    updateProgrammingLanguages(newLanguages);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLanguage();
    }
  };

  const addMultipleLanguages = (languages) => {
    const newLanguages = [...cvData.programmingLanguages];
    languages.forEach(lang => {
      if (lang.trim() && !newLanguages.includes(lang.trim())) {
        newLanguages.push(lang.trim());
      }
    });
    updateProgrammingLanguages(newLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Programming Languages
        </h3>
        <button
          onClick={() => document.getElementById('bulk-languages').classList.toggle('hidden')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Multiple
        </button>
      </div>

      {/* Current Languages */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Languages ({cvData.programmingLanguages.length})
        </h4>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {cvData.programmingLanguages.map((language, index) => (
            <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              <span>{language}</span>
              <button
                onClick={() => removeLanguage(index)}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add programming language"
            className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <button
            onClick={addLanguage}
            className="px-4 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk Add */}
      <div id="bulk-languages" className="hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add Multiple Languages
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Languages (one per line)
            </label>
            <textarea
              id="bulk-languages-text"
              rows={4}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="JavaScript&#10;Python&#10;Java&#10;TypeScript&#10;Go&#10;Rust"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => document.getElementById('bulk-languages').classList.add('hidden')}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const text = document.getElementById('bulk-languages-text').value;
                const languages = text.split('\n').filter(lang => lang.trim());
                addMultipleLanguages(languages);
                document.getElementById('bulk-languages-text').value = '';
                document.getElementById('bulk-languages').classList.add('hidden');
              }}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Add Languages
            </button>
          </div>
        </div>
      </div>

      {/* Popular Languages Quick Add */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Popular Languages
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin'].map(lang => (
            <button
              key={lang}
              onClick={() => {
                if (!cvData.programmingLanguages.includes(lang)) {
                  updateProgrammingLanguages([...cvData.programmingLanguages, lang]);
                }
              }}
              disabled={cvData.programmingLanguages.includes(lang)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                cvData.programmingLanguages.includes(lang)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-gray-700 dark:text-gray-300'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
