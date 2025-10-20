import React, { useState } from 'react';
import { useCV } from '../../contexts/NewCVContext';
import { Plus, Trash2 } from 'lucide-react';

export default function SoftwareToolsForm() {
  const { cvData, updateSoftwareTools } = useCV();
  const [newTool, setNewTool] = useState('');

  const addTool = () => {
    if (newTool.trim() && !cvData.softwareTools.includes(newTool.trim())) {
      updateSoftwareTools([...cvData.softwareTools, newTool.trim()]);
      setNewTool('');
    }
  };

  const removeTool = (index) => {
    const newTools = cvData.softwareTools.filter((_, i) => i !== index);
    updateSoftwareTools(newTools);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTool();
    }
  };

  const addMultipleTools = (tools) => {
    const newTools = [...cvData.softwareTools];
    tools.forEach(tool => {
      if (tool.trim() && !newTools.includes(tool.trim())) {
        newTools.push(tool.trim());
      }
    });
    updateSoftwareTools(newTools);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Software & Tools
        </h3>
        <button
          onClick={() => document.getElementById('bulk-tools').classList.toggle('hidden')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Multiple
        </button>
      </div>

      {/* Current Tools */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tools ({cvData.softwareTools.length})
        </h4>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {cvData.softwareTools.map((tool, index) => (
            <div key={index} className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              <span>{tool}</span>
              <button
                onClick={() => removeTool(index)}
                className="ml-2 text-orange-600 hover:text-orange-800"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTool}
            onChange={(e) => setNewTool(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add software or tool"
            className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <button
            onClick={addTool}
            className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk Add */}
      <div id="bulk-tools" className="hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add Multiple Tools
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tools (one per line)
            </label>
            <textarea
              id="bulk-tools-text"
              rows={4}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="VS Code&#10;Git&#10;Docker&#10;AWS&#10;Figma&#10;Photoshop"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => document.getElementById('bulk-tools').classList.add('hidden')}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const text = document.getElementById('bulk-tools-text').value;
                const tools = text.split('\n').filter(tool => tool.trim());
                addMultipleTools(tools);
                document.getElementById('bulk-tools-text').value = '';
                document.getElementById('bulk-tools').classList.add('hidden');
              }}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Tools
            </button>
          </div>
        </div>
      </div>

      {/* Popular Tools Quick Add */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Popular Tools
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            'VS Code', 'Git', 'Docker', 'AWS', 'Figma', 'Photoshop',
            'Slack', 'Jira', 'Confluence', 'Postman', 'MongoDB', 'MySQL',
            'Redis', 'Kubernetes', 'Jenkins', 'Trello', 'Notion', 'Zoom'
          ].map(tool => (
            <button
              key={tool}
              onClick={() => {
                if (!cvData.softwareTools.includes(tool)) {
                  updateSoftwareTools([...cvData.softwareTools, tool]);
                }
              }}
              disabled={cvData.softwareTools.includes(tool)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                cvData.softwareTools.includes(tool)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-gray-700 dark:text-gray-300'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
