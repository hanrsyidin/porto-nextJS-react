// app/components/About.tsx
'use client';

import React, { useState, useEffect } from 'react'; // useRef tidak digunakan lagi jika Swiper instance langsung di state
import { motion, Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperCore from 'swiper'; // Import SwiperCore type
import { Navigation, Pagination, A11y, EffectFade } from 'swiper/modules'; // Pastikan Navigation ada untuk kontrol programatik
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Impor Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
// CSS untuk Navigation dan Pagination bisa di-skip jika Anda tidak menggunakan style defaultnya sama sekali
// Namun, mengimpornya tidak masalah jika ada style dasar yang terpakai oleh custom nav/pagination.
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// Komponen SkillBadge tetap sama
const SkillBadge = ({ skill }: { skill: string }) => (
  <motion.span
    className="inline-block bg-zinc-200 text-zinc-800 text-sm font-medium mr-2 mb-2 px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:bg-zinc-800 hover:text-white cursor-pointer"
    // Jika Anda ingin SkillBadge dianimasikan individual dalam stagger, Anda bisa tambahkan variants={staggerItem} di sini
    // Namun, saat ini parent div dari grup skill yang akan memiliki staggerItem.
  >
    {skill}
  </motion.span>
);

// Komponen untuk slide "Why Hire Me / Experience"
// Pastikan file ini ada dan path impornya benar
import WhyHireMeExperienceSlide from './WhyHireMeExperienceSlide';


// Varian animasi Framer Motion
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 } // Opsional: animasi saat keluar
};
const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1, // Jeda antar animasi anak
      delayChildren: 0.2,   // Delay sebelum anak pertama mulai
    },
  },
};
const staggerItem: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 } // Opsional
};


const About = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Indeks slide, 0 atau 1
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const titles = ["About Me", "Resume"];
  const subtitles = [
    "My journey, expertise, and what drives me.",
    "A summary of my professional background and qualifications."
  ];

  useEffect(() => {
    if (swiperInstance) {
      // Update status tombol saat swiper siap atau slide berubah
      const updateNavStatus = () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      };
      updateNavStatus(); // Panggil sekali saat swiperInstance diset
      swiperInstance.on('slideChange', updateNavStatus); // Update saat slide berubah

      // Cleanup listener saat komponen di-unmount atau swiperInstance berubah
      return () => {
        swiperInstance.off('slideChange', updateNavStatus);
      };
    }
  }, [swiperInstance]);


  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveSlideIndex(swiper.realIndex); // Gunakan realIndex untuk loop=true, atau activeIndex untuk loop=false
    // setIsBeginning dan setIsEnd akan diupdate oleh useEffect di atas
  };

  return (
    <section
      id="about-resume-section" // ID yang lebih umum karena kontennya berubah
      className="py-16 md:py-24 shadow-sm bg-[url('/paper-background.png')] bg-cover bg-center relative"
    >
      <div className="container mx-auto px-10 sm:px-6 lg:px-12">
        {/* Judul Bagian Dinamis dan Navigasi Kustom */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          key={titles[activeSlideIndex]} // Ganti key agar animasi teks judul berjalan saat berubah
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-center items-center gap-3 sm:gap-4">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              disabled={isBeginning && !swiperInstance?.params.loop} // Nonaktifkan jika di awal & tidak loop
              className="p-2 rounded-full hover:bg-zinc-300/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800" />
            </button>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight whitespace-nowrap min-w-[180px] sm:min-w-[250px] text-center"> {/* Beri min-width agar layout tidak terlalu geser saat teks judul berubah */}
              {titles[activeSlideIndex]}
            </h2>
            <button
              onClick={() => swiperInstance?.slideNext()}
              disabled={isEnd && !swiperInstance?.params.loop} // Nonaktifkan jika di akhir & tidak loop
              className="p-2 rounded-full hover:bg-zinc-300/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800" />
            </button>
          </div>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitles[activeSlideIndex]}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-20 h-1 bg-zinc-800 rounded-full"></div>
          </div>
        </motion.div>

        <Swiper
          modules={[Navigation, A11y, EffectFade]} // Hapus Pagination jika tidak pakai titik
          spaceBetween={0}
          slidesPerView={1}
          navigation={false} // Navigasi default Swiper dimatikan, kita pakai kustom
          pagination={false} // Pagination default Swiper dimatikan
          loop={false} // Loop di-set false agar tombol prev/next bisa disable
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoHeight={true}
          className="w-full"
          onSwiper={setSwiperInstance} // Untuk mendapatkan instance Swiper
          onSlideChange={handleSlideChange} // Untuk update judul dan status tombol
        >
          <SwiperSlide key="about-me-content">
            {/* KONTEN "ABOUT ME" YANG SUDAH ADA */}
            <motion.div
              // Animasi untuk seluruh konten slide ini bisa diatur di sini
              // atau biarkan Framer Motion pada anak-anaknya yang bekerja.
              // Untuk contoh ini, kita biarkan anak-anaknya yang dianimasikan.
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start"
              // initial="initial"
              // animate="animate" // Jika ingin seluruh slide ini animate sebagai satu kesatuan
              // variants={fadeInUp} // Misalnya
            >
              <motion.div
                className="lg:col-span-3 text-gray-700 text-base md:text-lg leading-relaxed space-y-6 text-justify"
                initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p>
                  Hello! I'm Farhan Rasyidin, an Informatics Engineering student with a strong interest in web and game development. 
                  My journey into the world of technology began with a curiosity about how applications and games are made, which quickly blossomed into a passion for creating innovative and functional digital solutions.
                </p>
                <p>
                  I find satisfaction in solving complex problems and translating them into efficient and elegant code. 
                  I specialize in backend development using Laravel and Next.js, but I also greatly enjoy exploring frontend technologies and game creation with Unity. 
                  For me, continuous learning is essential in this dynamic industry.
                </p>
                <p>
                  Beyond coding, my role as the Head of the Academic Division at HMIF Unsri provides an opportunity to share knowledge, lead, and contribute to the potential development of fellow students. 
                  I believe collaboration and a spirit of continuous growth are key to achieving great things.
                </p>
              </motion.div>
              <motion.div
                className="lg:col-span-2 mt-10 lg:mt-0 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
                initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} transition={{ delay: 0.2 }}
              >
                <motion.h3
                  className="text-xl sm:text-2xl font-semibold text-zinc-800 mb-6 border-b-2 border-zinc-300 pb-3"
                  variants={staggerItem} transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  My Core Skills
                </motion.h3>
                
                <motion.div variants={staggerItem} transition={{ duration: 0.4, ease: "easeOut" }} className="space-y-1">
                  <h4 className="text-lg font-medium text-zinc-700 mb-2">Backend Development</h4>
                  <div className="flex flex-wrap">
                    <SkillBadge skill="Laravel" />
                    <SkillBadge skill="PHP" />
                    <SkillBadge skill="Node.js (Basic)" />
                    <SkillBadge skill="RESTful APIs" />
                    <SkillBadge skill="MySQL" />
                    <SkillBadge skill="PostgreSQL (Basic)" />
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} transition={{ duration: 0.4, ease: "easeOut" }} className="mt-5 space-y-1">
                  <h4 className="text-lg font-medium text-zinc-700 mb-2">Frontend Development</h4>
                  <div className="flex flex-wrap">
                    <SkillBadge skill="Next.js" />
                    <SkillBadge skill="React" />
                    <SkillBadge skill="JavaScript (ES6+)" />
                    <SkillBadge skill="Tailwind CSS" />
                    <SkillBadge skill="HTML5" />
                    <SkillBadge skill="CSS3" />
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} transition={{ duration: 0.4, ease: "easeOut" }} className="mt-5 space-y-1">
                  <h4 className="text-lg font-medium text-zinc-700 mb-2">Game Development</h4>
                  <div className="flex flex-wrap">
                    <SkillBadge skill="Unity" />
                    <SkillBadge skill="C#" />
                    <SkillBadge skill="Game Design Principles" />
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} transition={{ duration: 0.4, ease: "easeOut" }} className="mt-5 space-y-1">
                  <h4 className="text-lg font-medium text-zinc-700 mb-2">Others</h4>
                  <div className="flex flex-wrap">
                    <SkillBadge skill="Git & GitHub" />
                    <SkillBadge skill="Problem Solving" />
                    <SkillBadge skill="Leadership" />
                    <SkillBadge skill="Project Management (Basic)" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide key="resume-content">
            <WhyHireMeExperienceSlide />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default About;