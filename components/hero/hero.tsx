'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import GitHubActivityCalendar from '../component/GitHubActivityCalendar';

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);

const HeroSection = () => {
  const now = new Date();
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    timeZone: 'Asia/Jakarta',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-GB', dateFormatOptions);
  const todaysDateInJakarta = dateFormatter.format(now);

  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-8 bg-zinc-200/50 rounded-3xl backdrop-blur-xs">
        <div className="grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12 items-center">
          <div className="lg:col-span-7 xl:col-span-6 text-center lg:text-left">
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-full py-1 pl-4 pr-1.5 text-xs sm:text-sm mb-8 shadow-sm">
              <span className="text-gray-700 mr-2">0 subscriber have joined</span>
              <Link href="#" className="inline-flex items-center px-3 py-1 bg-zinc-800 text-white text-xs font-semibold rounded-full hover:bg-zinc-700 transition-colors">
                Join now <ArrowRightIcon className="w-3 h-3 ml-1.5" />
              </Link>
            </div>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-zinc-900 tracking-tight">
              Farhan Rasyidin <br /> Software Developer
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 text-justify">
              I am a student Informatics Engineering student with a strong interest in web and game development.
              I specialize in backend development using Laravel/NextJS and enjoy exploring frontend technologies and game creation with Unity.
              Currently, I serve as the Head of Academic Division at HMIF Unsri, actively leading various skill development programs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <Link href="#" className="inline-flex items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-800 bg-white hover:bg-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                About Me <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link href="#" className="inline-flex items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-zinc-800 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                Contact
              </Link>
            </div>
            <div className="mt-12 lg:mt-16 bg-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto lg:mx-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 text-center">
                <div> <p className="text-2xl sm:text-3xl font-bold text-gray-900">20+</p> <p className="text-xs sm:text-sm text-gray-500 mt-1">Components</p> </div>
                <div> <p className="text-2xl sm:text-3xl font-bold text-gray-900">10+</p> <p className="text-xs sm:text-sm text-gray-500 mt-1">Pages</p> </div>
                <div> <p className="text-2xl sm:text-3xl font-bold text-gray-900">1+</p>  <p className="text-xs sm:text-sm text-gray-500 mt-1">Customers</p> </div>
                <div> <p className="text-2xl sm:text-3xl font-bold text-gray-900">5+</p>  <p className="text-xs sm:text-sm text-gray-500 mt-1">Projects</p> </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-6 mt-12 lg:mt-0 flex items-center justify-center">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md shadow-2xl rounded-lg">
              <Swiper
                modules={[Navigation, Pagination, A11y, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoHeight={true}
                className="w-full rounded-lg  overflow-hidden"
                style={{
                  '--swiper-navigation-color': '#000000',
                  '--swiper-pagination-color': '#000000',
                  '--swiper-pagination-bullet-inactive-color': '#ffffff', 
                  '--swiper-pagination-bullet-inactive-opacity': '0.7',
                } as React.CSSProperties}
              >
                <SwiperSlide key="profile-image">
                  <div className="flex items-center justify-center w-full h-full shadow-2xl"> 
                    <Image
                      src="/hero.jpg"
                      alt="Farhan Rasyidin"
                      width={360}
                      height={10}
                      className="object-cover"
                      priority
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide key="github-contributions" className="">
                  <div className="w-full h-full flex flex-col justify-center items-center p-16 sm:p-6 ">
                    <GitHubActivityCalendar />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;