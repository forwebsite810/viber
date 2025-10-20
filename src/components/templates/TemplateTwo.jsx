import React from 'react';

export default function TemplateTwo({ data }) {
  const name = data?.name || data?.header?.fullName || 'Not provided';
  const title = data?.title || data?.header?.title || 'Not provided';
  const summary = data?.summary || data?.profileSummary || 'No summary provided';
  const experiences = Array.isArray(data?.experience) ? data.experience : [];

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl">
      <h1 className="text-3xl font-extrabold mb-1">{name}</h1>
      <p className="text-indigo-300 mb-4">{title}</p>
      <p className="text-sm text-gray-200">{summary}</p>

      {experiences.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold text-indigo-300">Experience</h2>
          <div className="mt-2 space-y-2">
            {experiences.map((exp, idx) => (
              <div key={idx} className="border border-gray-700 rounded p-3">
                <div className="font-medium">{exp.position || 'Not provided'}</div>
                <div className="text-sm text-gray-300">{exp.company || 'Not provided'}</div>
                <div className="text-xs text-gray-400">{exp.duration || 'Not provided'}</div>
                {exp.description && (
                  <p className="text-sm mt-1 text-gray-200">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


