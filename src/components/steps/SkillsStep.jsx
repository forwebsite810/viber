import React, { useState } from 'react';
import { useCV } from '../../contexts/NewCVContext';
import Card from '../Card';
import Button from '../Button';
import { Code, Plus, X, Zap } from 'lucide-react';

const popularSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'C#',
  'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git',
  'Machine Learning', 'Data Analysis', 'Project Management', 'Agile', 'Scrum'
];

export default function SkillsStep() {
  const { cvData, addSkill, removeSkill } = useCV();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !cvData.skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleAddPopularSkill = (skill) => {
    if (!cvData.skills.includes(skill)) {
      addSkill(skill);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <Card variant="glass" className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white">
          <Code className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">
          Skills & Technologies
        </h2>
      </div>

      {/* Add New Skill */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Add New Skill
        </label>
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter a skill or technology..."
            />
          </div>
          <Button
            onClick={handleAddSkill}
            variant="primary"
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>

      {/* Popular Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Popular Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill, index) => (
            <button
              key={index}
              onClick={() => handleAddPopularSkill(skill)}
              disabled={cvData.skills.includes(skill)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                cvData.skills.includes(skill)
                  ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 hover:scale-105'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Skills List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Skills ({cvData.skills.length})
        </h3>
        
        {cvData.skills.length === 0 ? (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No skills added yet. Add your first skill above.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {cvData.skills.map((skill, index) => (
              <div
                key={index}
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300"
              >
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-gray-900 dark:text-white font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="w-6 h-6 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-700 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills Categories */}
      {cvData.skills.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Skills by Category
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Programming Languages</h4>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.filter(skill => 
                  ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Go', 'Rust', 'PHP', 'Ruby'].includes(skill)
                ).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Frameworks & Libraries</h4>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.filter(skill => 
                  ['React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel'].includes(skill)
                ).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tools & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.filter(skill => 
                  ['Git', 'Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL', 'Redis', 'Kubernetes'].includes(skill)
                ).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
