'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from './animation';
import { experiences, educationItems, skillsData, TabKey } from './interface'

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`block w-full ml-1 text-left px-4 py-3 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50
      ${isActive
        ? 'bg-zinc-800 text-white scale-101'
        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:shadow-md'
      }`
    }
  >
    {label}
  </button>
);

const WhyHireMeExperienceSlide = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('skills');

  const sectionTitles = {
    experience: "My Experience",
    education: "My Education",
    skills: "My Skills & Expertise"
  };
  
  const sectionSubtitles = {
    experience: "Here are some relevant experiences that have shaped my professional journey.",
    education: "Details of my academic background and qualifications.",
    skills: "A showcase of key technologies and abilities I possess."
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return experiences.map((exp, index) => (
          <motion.div
            key={`exp-${index}`}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            variants={staggerItem}
          >
            <p className="text-xs sm:text-sm font-semibold text-zinc-500 mb-1">{exp.year}</p>
            <h4 className="text-md sm:text-lg font-bold text-zinc-800 mb-1">{exp.title}</h4>
            <p className="text-sm text-zinc-600 mb-2">{exp.company}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{exp.description}</p>
          </motion.div>
        ));
      case 'education':
        return educationItems.map((edu, index) => (
          <motion.div
            key={`edu-${index}`}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            variants={staggerItem}
          >
            <p className="text-xs sm:text-sm font-semibold text-zinc-500 mb-1">{edu.year}</p>
            <h4 className="text-md sm:text-lg font-bold text-zinc-800 mb-1">{edu.degree}</h4>
            <p className="text-sm text-zinc-600 mb-2">{edu.institution}</p>
            {edu.description && <p className="text-xs text-gray-500 leading-relaxed">{edu.description}</p>}
          </motion.div>
        ));
      case 'skills':
        return skillsData.map((category) => (
          <motion.div
            key={category.id}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 sm:col-span-2" // Buat kartu skill mengambil 2 kolom di layar sm agar tidak terlalu sempit
            variants={staggerItem}
          >
            <h4 className="text-md sm:text-lg font-bold text-zinc-800 mb-3">{category.name}</h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <span key={skill} className="inline-block bg-zinc-200 text-zinc-800 text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full shadow-sm hover:scale-105 transition-transform">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ));
      default:
        return null;
    }
  };

  return (
    <motion.div 
        className="md:col-span-4 lg:col-span-3 space-y-6"
        variants={fadeInUp} 
        initial="initial" 
        animate="animate"  
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
        <motion.div 
          className="md:col-span-4 lg:col-span-3 space-y-6"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">Why hire me?</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
              I am a motivated individual with a passion for technology and problem-solving. 
              With a combination of technical skills and organizational experience, I am ready to make a real contribution.
            </p>
          </div>
          <div data-cursor-trail-ignore="true" className="space-y-2">
            <TabButton label="Skills" isActive={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
            <TabButton label="Experience" isActive={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
            <TabButton label="Education" isActive={activeTab === 'education'} onClick={() => setActiveTab('education')} />
          </div>
        </motion.div>

        <motion.div
          key={activeTab}
          className="md:col-span-8 lg:col-span-9 flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1 sm:mb-2 flex-shrink-0">
            {sectionTitles[activeTab]}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base mb-6 flex-shrink-0">
            {sectionSubtitles[activeTab]}
          </p>
          
          <div data-cursor-trail-ignore="true" className="flex-grow overflow-y-auto custom-scrollbar pr-2 max-h-[55vh] sm:max-h-[380px] md:max-h-[420px]">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {renderContent()}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WhyHireMeExperienceSlide;