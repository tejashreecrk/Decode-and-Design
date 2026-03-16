import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

export function StressMeter() {
  const [stressLevel, setStressLevel] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);

  const getStressColor = () => {
    if (stressLevel < 30) return 'from-green-500 to-teal-500';
    if (stressLevel < 70) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getStressLabel = () => {
    if (stressLevel < 30) return 'Calm';
    if (stressLevel < 70) return 'Moderate';
    return 'High Stress';
  };

  const getStressIcon = () => {
    if (stressLevel < 30) return <TrendingDown className="w-5 h-5" />;
    if (stressLevel < 70) return <Minus className="w-5 h-5" />;
    return <TrendingUp className="w-5 h-5" />;
  };

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        className="bg-slate-900/90 border border-purple-500/40 rounded-xl p-4 backdrop-blur-md shadow-xl"
        animate={{ width: isExpanded ? '320px' : '200px' }}
      >
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            {getStressIcon()}
            <span className="text-sm font-medium text-purple-200">
              {getStressLabel()}
            </span>
          </div>
          <span className="text-2xl font-bold text-purple-300">
            {stressLevel}%
          </span>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full mb-3 accent-purple-500"
              />

              <div className="space-y-2 text-xs text-gray-400">
                <p>Adjust the slider to track your current stress level</p>
                {stressLevel > 70 && (
                  <p className="text-pink-400">
                    💭 Consider trying a breathing exercise
                  </p>
                )}
                {stressLevel < 30 && (
                  <p className="text-green-400">
                    ✨ You're doing great! Keep it up
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getStressColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${stressLevel}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
