import React, { useState } from 'react';
import { useCV } from '../../contexts/NewCVContext';
import Card from '../Card';
import Button from '../Button';
import { Star, Plus, X, Award, Heart, Globe, BookOpen } from 'lucide-react';

export default function ExtrasStep() {
  const { cvData, addCertification, addHobby, addLanguage } = useCV();
  const [newCertification, setNewCertification] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleAddCertification = () => {
    if (newCertification.trim() && !cvData.extras.certifications.includes(newCertification.trim())) {
      addCertification(newCertification.trim());
      setNewCertification('');
    }
  };

  const handleAddHobby = () => {
    if (newHobby.trim() && !cvData.extras.hobbies.includes(newHobby.trim())) {
      addHobby(newHobby.trim());
      setNewHobby('');
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !cvData.extras.languages.includes(newLanguage.trim())) {
      addLanguage(newLanguage.trim());
      setNewLanguage('');
    }
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      if (type === 'certification') handleAddCertification();
      if (type === 'hobby') handleAddHobby();
      if (type === 'language') handleAddLanguage();
    }
  };

  return (
    <Card variant="glass" className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white">
          <Star className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">
          Extras & Additional Info
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Certifications */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Certifications
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'certification')}
                className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                placeholder="AWS Certified Developer"
              />
              <Button onClick={handleAddCertification} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {cvData.extras.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-yellow-500/10 rounded-lg"
                >
                  <span className="text-yellow-600 dark:text-yellow-400 text-sm">{cert}</span>
                  <button
                    onClick={() => {
                      const newCerts = cvData.extras.certifications.filter((_, i) => i !== index);
                      // This would need to be implemented in the context
                    }}
                    className="w-5 h-5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-700 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Languages
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'language')}
                className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="English (Native)"
              />
              <Button onClick={handleAddLanguage} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {cvData.extras.languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-blue-500/10 rounded-lg"
                >
                  <span className="text-blue-600 dark:text-blue-400 text-sm">{lang}</span>
                  <button
                    onClick={() => {
                      const newLangs = cvData.extras.languages.filter((_, i) => i !== index);
                      // This would need to be implemented in the context
                    }}
                    className="w-5 h-5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-700 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center text-white">
              <Heart className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Hobbies & Interests
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'hobby')}
                className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                placeholder="Photography"
              />
              <Button onClick={handleAddHobby} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {cvData.extras.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-pink-500/10 rounded-lg"
                >
                  <span className="text-pink-600 dark:text-pink-400 text-sm">{hobby}</span>
                  <button
                    onClick={() => {
                      const newHobbies = cvData.extras.hobbies.filter((_, i) => i !== index);
                      // This would need to be implemented in the context
                    }}
                    className="w-5 h-5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-700 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-white/5 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Summary
          </h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-yellow-500 mb-1">
              {cvData.extras.certifications.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Certifications</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {cvData.extras.languages.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Languages</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-pink-500 mb-1">
              {cvData.extras.hobbies.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Hobbies</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
