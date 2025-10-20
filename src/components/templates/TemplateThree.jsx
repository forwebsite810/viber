import React from 'react';

export default function TemplateThree({ data }) {
  const name = data?.name || data?.header?.fullName || 'Not provided';
  const title = data?.title || data?.header?.title || 'Not provided';
  const summary = data?.summary || data?.profileSummary || 'No summary provided';
  const experiences = Array.isArray(data?.experience) ? data.experience : [];

  return (
    <div className="p-6 border rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600">{title}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          {name && name !== 'Not provided' ? name.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-3">{summary}</p>

      {experiences.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold">Experience</h2>
          <ul className="mt-2 space-y-2">
            {experiences.map((exp, idx) => (
              <li key={idx} className="p-3 bg-gray-50 rounded">
                <div className="font-medium">{exp.position || 'Not provided'}</div>
                <div className="text-sm text-gray-600">{exp.company || 'Not provided'}</div>
                <div className="text-xs text-gray-500">{exp.duration || 'Not provided'}</div>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


