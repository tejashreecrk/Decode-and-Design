import { motion } from 'motion/react';
import { ProgressTracker } from '../components/ProgressTracker';
import { BarChart, Activity, Brain, Heart } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="min-h-screen pt-16 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <BarChart className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Your Journey Dashboard
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Track your progress, celebrate achievements, and see how far you've come
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/40 rounded-xl p-6 backdrop-blur-sm"
          >
            <Activity className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-xl text-purple-200 mb-2">Overall Activity</h3>
            <p className="text-3xl text-purple-300 mb-1">Active</p>
            <p className="text-sm text-gray-400">Your mental wellness journey</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border border-pink-500/40 rounded-xl p-6 backdrop-blur-sm"
          >
            <Brain className="w-8 h-8 text-pink-400 mb-3" />
            <h3 className="text-xl text-pink-200 mb-2">Mindfulness</h3>
            <p className="text-3xl text-pink-300 mb-1">Growing</p>
            <p className="text-sm text-gray-400">Keep practicing daily</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 border border-blue-500/40 rounded-xl p-6 backdrop-blur-sm"
          >
            <Heart className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-xl text-blue-200 mb-2">Emotional Health</h3>
            <p className="text-3xl text-blue-300 mb-1">Improving</p>
            <p className="text-sm text-gray-400">One step at a time</p>
          </motion.div>
        </div>

        {/* Main Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ProgressTracker />
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm text-center"
        >
          <h3 className="text-2xl text-purple-200 mb-3">Keep Going! 💪</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Every interaction, every breathing exercise, every journal entry is a step
            toward better mental health. You're building habits that will help you manage
            overthinking and find peace. We're proud of your progress!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
