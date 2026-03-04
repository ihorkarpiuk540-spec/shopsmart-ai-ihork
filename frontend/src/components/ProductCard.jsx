import React from 'react';
import { motion } from 'framer-motion';
import { Package, DollarSign, Image as ImageIcon } from 'lucide-react';

function ProductCard({ product }) {
  const defaultImages = {
    'test-1': '/images/products/headphones-1.jpg',
    'test-2': '/images/products/earbuds-1.jpg',
    'test-3': '/images/products/headphones-2.jpg',
    'test-4': '/images/products/earphones-1.jpg'
  };

  const imageUrl = product.image_url || defaultImages[product.product_id];
  const [imageError, setImageError] = React.useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}
      className="glass-card rounded-xl overflow-hidden transition-all duration-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 overflow-hidden">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"
            >
              <ImageIcon className="w-12 h-12 text-white" />
            </motion.div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 px-4 text-center">
              {product.name}
            </p>
          </div>
        )}
        
        {/* Similarity Badge */}
        {product.similarity && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg"
          >
            {Math.round(product.similarity * 100)}% match
          </motion.div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start gap-2 mb-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
            <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1 flex-1">
            {product.name}
          </h3>
        </div>
        
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <DollarSign className="w-4 h-4" />
            <span className="font-bold text-lg">
              ${parseFloat(product.price || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;