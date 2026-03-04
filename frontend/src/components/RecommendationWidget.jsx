import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Zap, Star } from 'lucide-react';
import ProductCard from './ProductCard';

function RecommendationWidget() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleGenerateRecommendations() {
    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/recommendations/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: 'test-1',
          productName: 'Premium Wireless Headphones',
          productDescription: 'High-quality wireless headphones with noise cancellation'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Animated Button */}
      <motion.button
        onClick={handleGenerateRecommendations}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="relative w-full group"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Button Content */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-5 rounded-2xl font-semibold text-lg shadow-2xl flex items-center justify-center gap-3 overflow-hidden">
          {/* Animated Sparkles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/30"
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <Star className="w-4 h-4 fill-current" />
              </motion.div>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg">AI is thinking...</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <span className="text-lg tracking-wide">Generate AI Recommendations</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Zap className="w-5 h-5" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.button>

      {/* Results Section */}
      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {!loading && recommendations.length > 0 && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">
                    Found {recommendations.length} similar products
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendations.map((product, index) => (
                    <motion.div
                      key={product.product_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {!loading && recommendations.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                No recommendations found. Try adding more products!
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RecommendationWidget;