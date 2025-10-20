import React from 'react';
import { useCV } from '../contexts/NewCVContext';

const templates = [
  { id: 'TemplateOne', name: 'Modern Minimal', preview: '/logo192.png' },
  { id: 'TemplateTwo', name: 'Creative Bold', preview: '/logo192.png' },
  { id: 'TemplateThree', name: 'Elegant Classic', preview: '/logo192.png' },
];

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useCV();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {templates.map((tpl) => (
        <button
          key={tpl.id}
          onClick={() => setSelectedTemplate(tpl.id)}
          className={`border rounded-xl overflow-hidden text-left transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            selectedTemplate === tpl.id ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-gray-200'
          }`}
        >
          <img src={tpl.preview} alt={tpl.name} className="w-full h-28 object-contain bg-gray-50" />
          <div className="p-3">
            <p className="font-semibold text-gray-900">{tpl.name}</p>
            <p className="text-xs text-gray-500">Click to select</p>
          </div>
        </button>
      ))}
    </div>
  );
}


