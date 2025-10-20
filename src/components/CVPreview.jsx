import React from 'react';
import { useCV } from '../contexts/NewCVContext';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

export default function CVPreview() {
  const { cvData } = useCV();

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {cvData.personalInfo.fullName ? cvData.personalInfo.fullName.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-2">
            {cvData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
            {cvData.personalInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{cvData.personalInfo.email}</span>
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{cvData.personalInfo.phone}</span>
              </div>
            )}
            {cvData.personalInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{cvData.personalInfo.location}</span>
              </div>
            )}
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {cvData.personalInfo.linkedin && (
              <a href={cvData.personalInfo.linkedin} className="text-blue-600 hover:text-blue-800">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {cvData.personalInfo.github && (
              <a href={cvData.personalInfo.github} className="text-gray-600 hover:text-gray-800">
                <Github className="w-5 h-5" />
              </a>
            )}
            {cvData.personalInfo.twitter && (
              <a href={cvData.personalInfo.twitter} className="text-blue-400 hover:text-blue-600">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {cvData.personalInfo.website && (
              <a href={cvData.personalInfo.website} className="text-purple-600 hover:text-purple-800">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {cvData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {cvData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Education</h2>
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {edu.startYear} - {edu.endYear || 'Present'}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500 dark:text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
            <div className="space-y-4">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.position}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  {exp.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {cvData.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
            <div className="space-y-4">
              {cvData.projects.map((project, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 mt-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">View Project</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {cvData.extras.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Certifications</h2>
            <div className="space-y-2">
              {cvData.extras.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span className="text-gray-600 dark:text-gray-400">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {cvData.extras.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.extras.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {cvData.extras.hobbies.length > 0 && (
          <div>
            <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Hobbies</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.extras.hobbies.map((hobby, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full text-sm"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
