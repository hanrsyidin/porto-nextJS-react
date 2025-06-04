import { Variants } from 'framer-motion';

export const projectContentVariants: Variants = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -30, scale: 0.98, transition: { duration: 0.3, ease: "easeIn" } },
};
export const fadeInUp: Variants = { 
  initial: { opacity: 0, y: 40 }, 
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
};