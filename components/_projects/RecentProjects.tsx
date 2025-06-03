
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaLocationArrow } from 'react-icons/fa6';

export const projects = [
  {
    id: 1,
    title: "Aplikasi E-commerce Modern",
    des: "Platform e-commerce komprehensif yang dibangun dengan Next.js, Tailwind CSS, dan integrasi pembayaran Stripe untuk pengalaman belanja yang mulus.",
    img: "/projects/ecommerce.jpg",
    iconLists: ["/icons/nextjs.svg", "/icons/react.svg", "/icons/tailwind.svg", "/icons/stripe.svg"],
    link: "https://link-ke-proyek-anda.com",
  },
  {
    id: 2,
    title: "Game Platformer 2D Unity",
    des: "Game platformer 2D yang menarik dengan beberapa level, musuh, dan power-up, dikembangkan menggunakan Unity dan C#.",
    img: "/projects/game-platformer.jpg",
    iconLists: ["/icons/unity.svg", "/icons/csharp.svg"],
    link: "https://link-ke-game-anda.itch.io",
  },

];

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  initial: {}, 
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
};


const RecentProjects = () => {
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Beberapa Pilihan dari
            <br />
            <span className="text-zinc-700">Proyek Terbaru Saya</span>
          </h1>
          <div className="mt-6 flex justify-center">
            <div className="w-20 h-1 bg-zinc-800 rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col h-full group transition-shadow duration-300"
              variants={cardVariants}
            >
              <div className="relative w-full h-52 sm:h-56 md:h-60 overflow-hidden bg-zinc-200">
                <Image
                  src={item.img}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-zinc-900 line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-3 mb-4 flex-grow">
                  {item.des}
                </p>

                <div className="mt-auto pt-4 border-t border-zinc-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.iconLists.map((iconUrl, index) => (
                        <div
                          key={index}
                          className="border-2 border-white rounded-full bg-zinc-700 w-8 h-8 sm:w-9 sm:h-9 flex justify-center items-center shadow-md"
                          style={{
                            transform: `translateX(-${index * 8}px)`,
                            zIndex: item.iconLists.length - index,
                          }}
                          title={iconUrl.split('/').pop()?.split('.')[0] || 'tech icon'}
                        >
                          <Image src={iconUrl} alt="tech icon" width={18} height={18} className="p-0.5" />
                        </div>
                      ))}
                    </div>
                    
                    {item.link && (
                      <Link href={item.link} target="_blank" rel="noopener noreferrer" passHref className="flex items-center text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors group/link">
                          <span className="mr-1.5 group-hover/link:underline">Live Site</span>
                          <FaLocationArrow className="text-zinc-500 group-hover/link:text-zinc-700 transition-colors" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentProjects;