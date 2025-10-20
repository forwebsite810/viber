import React from 'react';
import { useCV } from '../../contexts/NewCVContext';

export default function TemplateOne() {
  const { cvData, sectionsToInclude } = useCV();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div id="cv-preview" className="w-[210mm] min-h-[297mm] bg-white text-black font-sans p-10 leading-relaxed">
      {/* Header Section */}
      {sectionsToInclude.header && (
        <header className="border-b border-gray-400 pb-3 mb-5">
          <h1 className="text-3xl font-bold">
            {cvData.header.fullName || 'Your Name'}
          </h1>
          <p className="text-lg">
            {cvData.header.title || 'Professional Title'}
          </p>
          
          <div className="flex justify-between text-sm mt-2">
            {cvData.header.phone && (
              <span><b>Phone:</b> {cvData.header.phone}</span>
            )}
            {cvData.header.email && (
              <span><b>Email:</b> {cvData.header.email}</span>
            )}
            {cvData.header.linkedin && (
              <span><b>LinkedIn:</b> {cvData.header.linkedin}</span>
            )}
          </div>
        </header>
      )}

      {/* Profile Summary */}
      {sectionsToInclude.profileSummary && cvData.profileSummary && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-1 border-b border-gray-300">Summary</h2>
          <p className="text-sm">{cvData.profileSummary}</p>
        </section>
      )}

      {/* Experience Section */}
      {sectionsToInclude.experience && cvData.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-1 border-b border-gray-300">Experience</h2>
          {cvData.experience.map((exp, index) => (
            <div key={exp.id || index} className="mb-3">
              <h3 className="text-lg font-medium">{exp.jobTitle}</h3>
              <p className="italic text-sm">{exp.company}, {exp.location}</p>
              <p className="text-xs">
                {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
              </p>
              
              {exp.keyAchievement && (
                <p className="text-sm font-medium mb-2">
                  <strong>Key Achievement:</strong> {exp.keyAchievement}
                </p>
              )}
              
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {sectionsToInclude.education && cvData.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-1 border-b border-gray-300">Education</h2>
          {cvData.education.map((edu, index) => (
            <div key={edu.id || index} className="mb-2">
              <h3 className="text-lg font-medium">{edu.degree}</h3>
              <p className="italic text-sm">{edu.institution}, {edu.location}</p>
              <p className="text-xs">
                {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
              </p>
              {edu.gpa && (
                <p className="text-sm">GPA: {edu.gpa}</p>
              )}
              {edu.roles && edu.roles.length > 0 && (
                <div className="mt-1">
                  <p className="text-sm font-medium">Notable Roles:</p>
                  <ul className="list-disc list-inside text-sm ml-4">
                    {edu.roles.map((role, idx) => (
                      <li key={idx}>{role}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {sectionsToInclude.skills && (cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0) && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-1 border-b border-gray-300">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {cvData.skills.technical.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-sm">Technical Skills</h4>
                <ul className="grid grid-cols-1 gap-1 text-sm">
                  {cvData.skills.technical.map((skill, index) => (
                    <li key={index}>• {skill}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {cvData.skills.soft.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-sm">Soft Skills</h4>
                <ul className="grid grid-cols-1 gap-1 text-sm">
                  {cvData.skills.soft.map((skill, index) => (
                    <li key={index}>• {skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Programming Languages */}
      {sectionsToInclude.programmingLanguages && cvData.programmingLanguages.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-1 border-b border-gray-300">Programming Languages</h2>
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {cvData.programmingLanguages.map((language, index) => (
              <li key={index}>• {language}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Software/Tools */}
      {sectionsToInclude.softwareTools && cvData.softwareTools.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-1 border-b border-gray-300">Tools / Software</h2>
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {cvData.softwareTools.map((tool, index) => (
              <li key={index}>• {tool}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Volunteering/Extracurricular */}
      {sectionsToInclude.volunteering && cvData.volunteering.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-1 border-b border-gray-300">Volunteering</h2>
          {cvData.volunteering.map((vol, index) => (
            <div key={vol.id || index}>
              <p className="text-sm font-medium">{vol.organization}</p>
              <p className="italic text-xs">
                {vol.location} ({formatDate(vol.startDate)} – {vol.current ? 'Present' : formatDate(vol.endDate)})
              </p>
              {vol.description && (
                <p className="text-sm">{vol.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Custom Sections */}
      {sectionsToInclude.customSections && cvData.customSections.length > 0 && (
        <section className="mb-4">
          {cvData.customSections.map((section, index) => (
            <div key={section.id || index} className="mb-4">
              <h2 className="text-xl font-semibold mb-1 border-b border-gray-300">{section.title}</h2>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-sm">
                    <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
