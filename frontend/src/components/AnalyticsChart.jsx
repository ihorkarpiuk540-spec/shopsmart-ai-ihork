import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

function AnalyticsChart() {
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Conversion Rate',
      value: '+24.5%',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: 'Avg Order Value',
      value: '$127.50',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Active Users',
      value: '2,847',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      label: 'Total Sales',
      value: '$45.2K',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const chartData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 78 },
    { day: 'Wed', value: 85 },
    { day: 'Thu', value: 72 },
    { day: 'Fri', value: 90 },
    { day: 'Sat', value: 95 },
    { day: 'Sun', value: 88 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50`}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-2`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Weekly Performance
        </h3>
        
        <div className="flex items-end justify-between gap-2 h-40">
          {chartData.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${item.value}%`, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {item.day}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Impact Metrics */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4">AI Impact</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-blue-100">Recommendations Shown</span>
            <span className="font-bold">12,847</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-100">Click-through Rate</span>
            <span className="font-bold">18.5%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-100">Revenue Generated</span>
            <span className="font-bold">$28.4K</span>
          </div>
          <div className="pt-3 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-blue-100">AI Accuracy</span>
              <span className="font-bold text-2xl">94.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsChart;