import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Package, 
  MousePointer2, 
  Zap,
  BarChart3,
  ShoppingBag,
  ArrowRight,
  Star,
  Rocket
} from 'lucide-react';
import RecommendationWidget from './components/RecommendationWidget';
import StatsCard from './components/StatsCard';
import ThemeToggle from './components/ThemeToggle';
import ChatButton from './components/ChatButton';
import ChatWindow from './components/ChatWindow';
import AnalyticsChart from './components/AnalyticsChart';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setIsDark(saved === 'dark');
    
    const handleStorage = () => {
      const theme = localStorage.getItem('theme') || 'light';
      setIsDark(theme === 'dark');
    };
    
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <>
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-950/90' : 'bg-white/60'
      }`}>
        
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ShopSmart AI
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Powered by AI</p>
                </div>
              </div>
              
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl shadow-lg flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Get Started
              </button>
            </div>
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
              <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                AI-Powered Recommendations
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Boost Sales with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Smart AI
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Increase average order value by 20-40% with intelligent product recommendations.
            </p>

            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2 mx-auto">
              Try Demo
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* AI Analytics Section */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="bg-white/80 dark:bg-gray-950/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-800/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Analytics Dashboard
              </h3>
            </div>
            <AnalyticsChart />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white/80 dark:bg-gray-950/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    AI Recommendations
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Smart product suggestions
                  </p>
                </div>
              </div>
              <RecommendationWidget />
            </div>

            <div className="bg-white/80 dark:bg-gray-950/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Why Choose Us
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Powered by advanced AI
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <FeatureCard
                  icon={<TrendingUp className="w-5 h-5" />}
                  title="Increase Sales"
                  description="Boost order value by 20-40%"
                  color="from-green-500 to-emerald-600"
                  metric="+35%"
                />
                <FeatureCard
                  icon={<Package className="w-5 h-5" />}
                  title="Smart Indexing"
                  description="Auto-index your catalog"
                  color="from-blue-500 to-indigo-600"
                  metric="100%"
                />
                <FeatureCard
                  icon={<MousePointer2 className="w-5 h-5" />}
                  title="Better UX"
                  description="Enhance customer experience"
                  color="from-purple-500 to-pink-600"
                  metric="4.9★"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="fixed bottom-0 right-0 z-50">
          <ThemeToggle />
          <ChatButton onClick={() => setIsChatOpen(true)} />
          <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
      </div>
    </>
  );
}

function FeatureCard({ icon, title, description, color, metric }) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border border-gray-200/50 dark:border-gray-800/50">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {title}
            </h4>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
              {metric}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;