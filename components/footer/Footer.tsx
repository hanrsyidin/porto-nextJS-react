'use client';

import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/hanrsyidin' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/in/nama-anda' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/nama-anda' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/nama-anda' },
  ];

  return (
    <footer id="footer" className="bg-zinc-900 text-gray-300" data-cursor-trail-ignore="true">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          
          <div className="flex-shrink-0">
            <h3 className="text-2xl font-bold text-white">Hanrsyidin</h3>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              A software developer passionate about building beautiful and functional web experiences.
            </p>
          </div>

          <div className="flex justify-center md:justify-end space-x-5">
            {socialLinks.map(social => (
              <a 
                key={social.name}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={social.name} 
                className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>

        <hr className="my-8 border-zinc-700/50" />

        <div className="text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Ahmad Farhan Rasyidin. All Rights Reserved.</p>
          <p className="mt-1">
            Built with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2">Next.js</a>, 
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2 ml-1">Tailwind CSS</a>, 
            and a lot of <span className="text-red-500">❤</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;