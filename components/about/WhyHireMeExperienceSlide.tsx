// app/components/WhyHireMeExperienceSlide.tsx
'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion'; // Pastikan Variants diimpor

// --- DATA (Ganti dengan data Anda sendiri) ---
interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
}
interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  description?: string;
}
interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

// Contoh Data (HARAP GANTI DENGAN DATA ANDA)
const experiences: ExperienceItem[] = [
  { year: "2024 - 2025", title: "Web Programming Coursework (I & II)", company: "Informatics Engineering, Sriwijaya University", description: "Completed 2 website development projects using CodeIgniter 4 and Laravel 12." },
  { year: "2025 - 2026", title: "Head of Academic Division", company: "Informatics Student Association Unsri 2024", description: "Leading and managing skill and academic development programs for Informatics Engineering students at Sriwijaya University for the year 2025." },
  { year: "2024 - 2025", title: "Information Technology Development Staff - HMIF 2024", company: "Informatics Student Association Unsri 2024", description: "Organized and participated in the committee for numerous events such as exhibitions, internal events, national events, and coding events." },
  { year: "2023 - 2023", title: "Volunteer IT Lead Srifoton 2023", company: "Informatics Student Association Unsri 2023", description: "Developed the Home Page for the Srifoton 2023 event website." },
];

const educationItems: EducationItem[] = [
  { year: "2021 - 2025 (Expected)", degree: "Bachelor of Engineering in Informatics", institution: "Sriwijaya University, Palembang", description: "Focusing on software engineering, web development, and data structures." },
  { year: "2018 - 2021", degree: "Science Program", institution: "SMA Negeri Example, Palembang", description: "Active in science club and programming competitions." },
];

const skillsData: SkillCategory[] = [
  { id: "backend", name: "Backend Development", skills: ["Laravel", "PHP", "Node.js (Basic)", "RESTful APIs", "MySQL", "PostgreSQL (Basic)"] },
  { id: "frontend", name: "Frontend Development", skills: ["Next.js", "React", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3"] },
  { id: "gamedev", name: "Game Development", skills: ["Unity", "C#", "Game Design Principles"] },
  { id: "others", name: "Others", skills: ["Git & GitHub", "Problem Solving", "Leadership", "Project Management (Basic)"] },
];


// Framer Motion Variants
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};
const staggerContainer: Variants = {
  initial: {}, // Bisa juga initial: { opacity: 0 } jika ingin container fade in juga
  animate: { 
    // opacity: 1, // Jika initial opacity: 0
    transition: { 
      staggerChildren: 0.1, // Jeda animasi antar anak
      delayChildren: 0.2    // Delay sebelum anak pertama mulai animasi
    } 
  },
};
const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 }, // Sebelumnya x: -50, y: 20 lebih cocok untuk item list
  animate: { opacity: 1, y: 0 },
};

// Tipe untuk tab
type TabKey = 'experience' | 'education' | 'skills';

// Komponen Tombol Tab
const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-4 py-3 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50
      ${isActive
        ? 'bg-zinc-800 text-white scale-105'
        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:shadow-md'
      }`
    }
  >
    {label}
  </button>
);

const WhyHireMeExperienceSlide = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('experience');

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
        className="md:col-span-4 lg:col-span-3 space-y-6" // (D) Kolom kiri
        variants={fadeInUp} // <-- TAMBAHKAN VARIANTS DI SINI
        initial="initial"    // <-- TAMBAHKAN INITIAL
        animate="animate"    // <-- TAMBAHKAN ANIMATE
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} // Opsional: delay agar muncul setelah judul utama slide
    >
      <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
        {/* Kolom Kiri: Why Hire Me & Navigasi Tab */}
        <motion.div 
          className="md:col-span-4 lg:col-span-3 space-y-6"
          // Tidak perlu variants di sini jika parent sudah punya fadeInUp dan kita tidak ingin double animation
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">Why hire me?</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
              I am a motivated individual with a passion for technology and problem-solving. 
              With a combination of technical skills and organizational experience, I am ready to make a real contribution.
            </p>
          </div>
          <div className="space-y-2">
            <TabButton label="Experience" isActive={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
            <TabButton label="Education" isActive={activeTab === 'education'} onClick={() => setActiveTab('education')} />
            <TabButton label="Skills" isActive={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
          </div>
        </motion.div>

        {/* Kolom Kanan: Konten Dinamis (Experience, Education, Skills) */}
        <motion.div
          key={activeTab} // Ganti key saat tab berubah untuk memicu animasi ulang konten
          className="md:col-span-8 lg:col-span-9 flex flex-col"
          initial={{ opacity: 0, y: 10 }} // Animasi sederhana untuk blok konten kanan
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1 sm:mb-2 flex-shrink-0">
            {sectionTitles[activeTab]}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base mb-6 flex-shrink-0">
            {sectionSubtitles[activeTab]}
          </p>
          
          {/* Area Konten yang Bisa di-Scroll */}
          <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 max-h-[55vh] sm:max-h-[380px] md:max-h-[420px]">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer} // Stagger untuk kartu-kartu di dalamnya
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