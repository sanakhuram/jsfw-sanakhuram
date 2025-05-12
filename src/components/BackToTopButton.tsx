'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsArrowUp } from 'react-icons/bs';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-red-900 text-orange-200 shadow-lg hover:bg-red-700 z-50"
      aria-label="Back To Top"
    >
      <BsArrowUp size={20} />
    </motion.button>
  );
}
