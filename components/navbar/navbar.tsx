"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const now = new Date();
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    timeZone: 'Asia/Jakarta',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-GB', dateFormatOptions);
  const todaysDateInJakarta = dateFormatter.format(now);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav
        data-cursor-trail-ignore="true"
        className="fixed top-0 left-0 right-0 z-50 h-[75px] bg-[#fbfbfb] font-sans shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          <div>
            <Link href="/" className="no-underline">
              <span className="text-3xl sm:text-[38px] font-bold text-[#494d51]">Hanrsyidin</span>
            </Link>
          </div>

          <div className="hidden md:flex gap-[30px]">
            <Link href="/" className="no-underline text-[#494d51] text-base py-[5px] hover:text-opacity-75 transition-opacity">Home</Link>
            <Link href="#about-resume-section" className="no-underline text-[#494d51] text-base py-[5px] hover:text-opacity-75 transition-opacity">About</Link>
            <Link href="#portfolio" className="no-underline text-[#494d51] text-base py-[5px] hover:text-opacity-75 transition-opacity">Portfolio</Link>
            <Link href="#contact" className="no-underline text-[#494d51] text-base py-[5px] hover:text-opacity-75 transition-opacity">Contact</Link>
            <Link href="#comments" className="no-underline text-[#494d51] text-base py-[5px] hover:text-opacity-75 transition-opacity">Comments</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-[28px] text-[#494d51] leading-none">♦</span>
            <span className="text-[15px] text-[#494d51]">Portofolio, {todaysDateInJakarta}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#494d51] to-[#fbfbfb]">
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className="text-[#494d51] focus:outline-none"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          data-cursor-trail-ignore="true"
          className="md:hidden fixed top-[75px] left-0 right-0 z-40 bg-[#fbfbfb] shadow-lg pt-4 pb-8"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-4">
              <Link href="/" className="no-underline text-[#494d51] text-lg w-full py-2 hover:bg-gray-100 rounded" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="#about" className="no-underline text-[#494d51] text-lg w-full py-2 hover:bg-gray-100 rounded" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="#portfolio" className="no-underline text-[#494d51] text-lg w-full py-2 hover:bg-gray-100 rounded" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
              <Link href="#contact" className="no-underline text-[#494d51] text-lg w-full py-2 hover:bg-gray-100 rounded" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link href="#comments" className="no-underline text-[#494d51] text-lg w-full py-2 hover:bg-gray-100 rounded" onClick={() => setIsMobileMenuOpen(false)}>Comments</Link>
              
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200 w-full">
                <span className="text-xl text-[#494d51] leading-none">♦</span>
                <span className="text-sm text-[#494d51]">Portofolio, {todaysDateInJakarta}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};