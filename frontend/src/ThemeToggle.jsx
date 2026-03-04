import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, X } from 'lucide-react';

function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  function toggleTheme(newTheme) {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 mb-4 w-72 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Theme
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleTheme('light')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Sun className="w-5 h-5" />
                Light
              </button>
              <button
                onClick={() => toggleTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Moon className="w-5 h-5" />
                Dark
              </button>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
        >
          <Palette className="w-6 h-6" />
        </motion.button>
      </div>
    </AnimatePresence>
  );
}

export default ThemeToggle;