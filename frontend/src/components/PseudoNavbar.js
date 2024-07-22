import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PseudoNavbar = () => {
  const [currentTheme, setCurrentTheme] = useState('theme-1'); // Default theme

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.className = ''; // Clear existing theme classes
    document.documentElement.classList.add(theme); // Add the selected theme class
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-transparent">
      <motion.h1
        className="text-2xl md:text-5xl font-bold text-center md:text-left mb-4 md:mb-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Go To Quiz App
      </motion.h1>
    </div>
  );
};

export default PseudoNavbar;
