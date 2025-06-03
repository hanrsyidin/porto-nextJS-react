'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLink, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface Project {
  id: string | number;
  title: string;
  category: 'web' | 'mobile' | 'game';
  description: string;
  technologies: string[];
  image: string;
  liveLink?: string;
  githubLink?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "FurniShop - E-commerce Furniture",
    category: 'web',
    description: "Modern e-commerce platform for furniture sales, built with Next.js and Tailwind CSS for an optimal user experience.",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    image: "/projects/furnishop-hero.jpg",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 2,
    title: "Kids Educational Mobile App",
    category: 'mobile',
    description: "Interactive mobile application for early childhood learning, equipped with gamification.",
    technologies: ["React Native", "Firebase"],
    image: "/projects/mobile-edu.jpg",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    title: "Space Adventure Game",
    category: 'game',
    description: "An engaging 2D space adventure game developed with Unity, featuring various levels and challenges.",
    technologies: ["Unity", "C#"],
    image: "/projects/space-game.jpg",
    githubLink: "#",
  },
  {
    id: 4,
    title: "Personal Portfolio Website (This!)",
    category: 'web',
    description: "The personal portfolio website you are currently viewing, built to showcase my projects and skills.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/projects/portfolio-website.jpg",
    githubLink: "https://github.com/hanrsyidin/portfolio-next",
  },
];

const categories: { key: Project['category']; label: string }[] = [
  { key: 'web', label: 'Web Development' },
  { key: 'mobile', label: 'Mobile Apps' },
  { key: 'game', label: 'Game Projects' },
];

// Varian animasi Framer Motion
const projectContentVariants: Variants = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -30, scale: 0.98, transition: { duration: 0.3, ease: "easeIn" } },
};
const fadeInUp: Variants = { 
  initial: { opacity: 0, y: 40 }, 
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
};


const CategorizedProjectsViewer = () => {
  const [activeCategory, setActiveCategory] = useState<Project['category']>('web');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const displayedProjects = useMemo(() => {
    return projectsData.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const currentProject = displayedProjects[currentProjectIndex];

  useEffect(() => {
    setCurrentProjectIndex(0);
  }, [activeCategory]);

  const handleCategoryChange = (category: Project['category']) => {
    setActiveCategory(category);
  };

  const handleNextProject = () => {
    setCurrentProjectIndex(prev => (prev + 1) % displayedProjects.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex(prev => (prev - 1 + displayedProjects.length) % displayedProjects.length);
  };

  const projectNumber = currentProject ? (displayedProjects.findIndex(p => p.id === currentProject.id) + 1).toString().padStart(2, '0') : "00";


  return (
    <section 
        id="portfolio" 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-8 bg-zinc-200/50 rounded-3xl backdrop-blur-sm mt-12 mb-12"
    >
      <motion.div
        className="text-center mb-4 md:mb-8"
        initial="initial" 
        whileInView="animate" 
        viewport={{ once: true, amount: 0.3 }} 
        variants={fadeInUp}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          My Portfolio
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          A showcase of my passion and work in technology.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-20 h-1 bg-zinc-800 rounded-full"></div>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <motion.div 
          className="md:w-1/4 lg:w-1/5 space-y-3 lg:mt-12 md:self-start" 
          initial={{ opacity:0, x: -50 }}
          whileInView={{ opacity:1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50
                ${activeCategory === category.key
                  ? 'bg-zinc-800 text-white scale-105 shadow-lg'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 hover:shadow-md'
                }`
              }
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <div className="md:w-3/4 lg:w-4/5 flex-1 flex flex-col relative min-h-[60vh] sm:min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentProject ? (
              <motion.div
                key={currentProject.id + currentProject.category}
                variants={projectContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-center flex-grow"
              >
                <div className="flex flex-col justify-center h-full order-2 md:order-1 py-6 md:py-0">
                  <span className="text-5xl sm:text-6xl font-bold text-zinc-600 mb-3 md:mb-4">{projectNumber}</span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 mb-3 md:mb-4 leading-tight">
                    {currentProject.title}
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 md:mb-6 text-justify">
                    {currentProject.description}
                  </p>
                  <div className="mb-4 md:mb-6">
                    <h4 className="text-sm font-semibold text-zinc-600 mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map(tech => (
                        <span key={tech} className="bg-zinc-200 text-zinc-800 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-1">
                    {currentProject.liveLink && (
                      <Link href={currentProject.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zinc-800 hover:bg-zinc-700 transition-colors">
                         <FaLink className="mr-2"/> Live Site
                      </Link>
                    )}
                    {currentProject.githubLink && (
                      <Link href={currentProject.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-zinc-600 hover:text-zinc-900 transition-colors font-medium">
                         <FaGithub className="mr-2 h-5 w-5"/> GitHub
                      </Link>
                    )}
                  </div>
                </div>

                <motion.div 
                  className="w-full aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10] relative rounded-lg overflow-hidden shadow-xl order-1 md:order-2 group"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    layout="fill"
                    objectFit="cover"
                    priority={currentProjectIndex === 0 && activeCategory === categories[0].key}
                    className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="no-project-message"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-grow flex flex-col items-center justify-center text-center h-full min-h-[300px]"
              >
                <svg className="w-16 h-16 text-zinc-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5a.5.5 0 00-.5-.5h-8a.5.5 0 000 1H16a.5.5 0 00.5-.5z" transform="rotate(45 12 12) translate(0 -4.5)" />
                </svg>
                <p className="text-gray-500 text-lg">
                  {displayedProjects.length === 0 && activeCategory 
                    ? `Belum ada proyek di kategori "${categories.find(c => c.key === activeCategory)?.label.toLowerCase()}" nih.`
                    : "Pilih kategori untuk melihat proyek."
                  }
                </p>
                {displayedProjects.length === 0 && activeCategory && (
                  <p className="text-sm text-gray-400 mt-2">Coba cek kategori lainnya ya!</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {currentProject && displayedProjects.length > 1 && ( 
            <div className="flex justify-end gap-3">
              <button 
                onClick={handlePrevProject} 
                className="p-2.5 rounded-full bg-white/60 hover:bg-zinc-200/80 shadow-md backdrop-blur-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed" 
                aria-label="Previous project"
                disabled={displayedProjects.length <= 1}
              >
                <FaChevronLeft className="w-5 h-5 text-zinc-700" />
              </button>
              <button 
                onClick={handleNextProject} 
                className="p-2.5 rounded-full bg-white/60 hover:bg-zinc-200/80 shadow-md backdrop-blur-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed" 
                aria-label="Next project"
                disabled={displayedProjects.length <= 1}
              >
                <FaChevronRight className="w-5 h-5 text-zinc-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorizedProjectsViewer;