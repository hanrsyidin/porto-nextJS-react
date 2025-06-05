'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaTwitter, FaFacebookF, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { IoIosSend } from "react-icons/io";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerItem: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const ContactSection = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean | null, message: string | null }>({ success: null, message: null });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: null });

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setSubmitStatus({ success: true, message: 'Message sent successfully! Thank you.' });
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      setSubmitStatus({ success: false, message: error.message || 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="py-12 md:py-16 bg-[#fbfbfb]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-5">
        
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Contact Me
          </h1>
          <div className="mt-6 flex justify-center">
            <div className="w-20 h-1 bg-zinc-800 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div 
            className="md:col-span-5 lg:col-span-5 space-y-8"
            initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{delay: 0.2}}
          >
            <h2 className="text-sm font-semibold text-zinc-600 tracking-wide uppercase mb-2">
            Reach out <span className="inline-block transform translate-y-[-2px] rotate-45">↗</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Have a question or need assistance? Reach out to me! 
              I'm here to help with any inquiries you may have. 
              Let's connect and discuss how we can work together.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <FaCheckCircle className="w-5 h-5 text-zinc-600 mr-3 flex-shrink-0" />
                Personalized assistance
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="w-5 h-5 text-zinc-600 mr-3 flex-shrink-0" />
                Timely response
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="w-5 h-5 text-zinc-600 mr-3 flex-shrink-0" />
                Comprehensive support
              </li>
            </ul>
            <div className="flex space-x-4">
              <a href="#" target="_blank" data-cursor-trail-ignore="true" rel="noopener noreferrer" className="text-gray-500 hover:text-zinc-800 transition-colors p-2 bg-white rounded-full shadow hover:shadow-md">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" data-cursor-trail-ignore="true" rel="noopener noreferrer" className="text-gray-500 hover:text-zinc-800 transition-colors p-2 bg-white rounded-full shadow hover:shadow-md">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" data-cursor-trail-ignore="true" rel="noopener noreferrer" className="text-gray-500 hover:text-zinc-800 transition-colors p-2 bg-white rounded-full shadow hover:shadow-md">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            data-cursor-trail-ignore="true" 
            className="md:col-span-7 lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
            initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{delay: 0.4}}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" id="name" required className="w-full px-4 py-3 border border-zinc-300 rounded-xl shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition-colors bg-zinc-50 focus:bg-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" id="email" required className="w-full px-4 py-3 border border-zinc-300 rounded-xl shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition-colors bg-zinc-50 focus:bg-white" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" id="message" rows={5} required className="w-full px-4 py-3 border border-zinc-300 rounded-xl shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition-colors bg-zinc-50 focus:bg-white"></textarea>
              </div>
              <div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} 
                  {!isSubmitting && <IoIosSend className="ml-2 w-5 h-5" />}
                </button>
              </div>
            </form>
            {submitStatus.message && (
              <p className={`mt-4 text-sm text-center ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                {submitStatus.message}
              </p>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
        >
          {[
            { icon: FaEnvelope, title: "Email Me", detail: "aan.syidin@gmail.com", href: "mailto:aan.syidin@gmail.com" },
            { icon: FaPhoneAlt, title: "Call Me", detail: "+62 823 7171 4509", href: "tel:+6282371714509" },
            { icon: FaMapMarkerAlt, title: "My Location", detail: "Palembang, South Sumatra, Indonesia", href: "https://maps.app.goo.gl/pXojMGf34pnJaa4cA" } // Ganti dengan link Google Maps jika ada
          ].map((item, index) => (
            <motion.a 
              key={item.title} 
              href={item.href}
              target={item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              data-cursor-trail-ignore="true"
              className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              variants={staggerItem}
            >
              <item.icon className="w-8 h-8 text-zinc-700 mb-4" />
              <h3 className="text-lg font-semibold text-zinc-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.detail}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;