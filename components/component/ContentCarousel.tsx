'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import HeroSection from '../hero/hero';
import GitHubActivityCalendar from './GitHubActivityCalendar';

export default function ContentCarousel() {
  return (
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
      className="w-full"
      autoplay={{ delay: 7000, disableOnInteraction: false }} // Opsional: Autoplay
    >
      <SwiperSlide key="hero">
        <HeroSection />
      </SwiperSlide>
      <SwiperSlide key="github-contributions">
        <div className="py-12 md:py-16 bg-transparent flex justify-center items-start min-h-[60vh] sm:min-h-[70vh]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-3xl xl:max-w-4xl">
            <GitHubActivityCalendar />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}