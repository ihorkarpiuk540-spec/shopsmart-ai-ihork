import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

function ChatButton({ onClick }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex justify-end">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-xl whitespace-nowrap z-50">
          AI Chat Assistant
          <div className="absolute top-full right-6 transform -translate-y-1/2">
            <div className="border-8 border-transparent border-t-gray-900 dark:border-t-gray-800" />
          </div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all z-40"
        style={{ marginBottom: '80px' }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

export default ChatButton;