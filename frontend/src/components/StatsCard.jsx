import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, MousePointer, TrendingUp } from 'lucide-react';

function StatsCard() {
  const [stats, setStats] = useState({ 
    totalProducts: 0, 
    weeklyClicks: 0,
    conversionRate: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('http://localhost:3001/api/analytics/dashboard');
        const data = await response.json();
        setStats(data.data || { totalProducts: 0, weeklyClicks: 0, conversionRate: 0 });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      icon: <Package className="w-6 h-6" />,
      label: 'Products Indexed',
      value: stats.totalProducts,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      icon: <MousePointer className="w-6 h-6" />,
      label: 'Weekly Clicks',
      value: stats.weeklyClicks,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Conversion Rate',
      value: `${stats.conversionRate || 0}%`,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className={`p-6 rounded-xl bg-gradient-to-br ${stat.bgColor} border border-white/20 shadow-lg`}
        >
          <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-3`}>
            {stat.icon}
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-gray-800 mb-1"
            >
              {loading ? '-' : stat.value}
            </motion.div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCard;