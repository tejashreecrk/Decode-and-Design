import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, TrendingUp, Calendar, Flame } from 'lucide-react';

interface ProgressData {
  journalEntries: number;
  breathingExercises: number;
  gameScore: number;
  daysActive: number;
  lastVisit: string;
}

export function ProgressTracker() {
  const [progress, setProgress] = useState<ProgressData>({
    journalEntries: 0,
    breathingExercises: 0,
    gameScore: 0,
    daysActive: 1,
    lastVisit: new Date().toISOString(),
  });
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('userProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setProgress(data);
      calculateStreak(data.lastVisit);
    }

    // Track journal entries
    const journals = localStorage.getItem('journalEntries');
    if (journals) {
      const count = JSON.parse(journals).length;
      setProgress((prev) => ({ ...prev, journalEntries: count }));
    }

    // Track breathing exercises (from localStorage if stored)
    const breathing = localStorage.getItem('breathingCount') || '0';
    setProgress((prev) => ({ ...prev, breathingExercises: parseInt(breathing) }));

    // Track game high score
    const gameScore = localStorage.getItem('thoughtCatcherHighScore') || '0';
    setProgress((prev) => ({ ...prev, gameScore: parseInt(gameScore) }));
  }, []);

  const calculateStreak = (lastVisit: string) => {
    const last = new Date(lastVisit);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - last.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      setStreak((prev) => prev + 1);
    } else if (diffDays > 1) {
      setStreak(0);
    }
  };

  const achievements = [
    {
      name: 'First Entry',
      description: 'Write your first journal entry',
      unlocked: progress.journalEntries >= 1,
      icon: '📝',
    },
    {
      name: 'Mindful Explorer',
      description: 'Complete 5 breathing exercises',
      unlocked: progress.breathingExercises >= 5,
      icon: '🧘',
    },
    {
      name: 'Thought Master',
      description: 'Score 100+ in Thought Catcher',
      unlocked: progress.gameScore >= 100,
      icon: '🎯',
    },
    {
      name: 'Week Warrior',
      description: 'Visit for 7 days in a row',
      unlocked: streak >= 7,
      icon: '🔥',
    },
  ];

  const totalProgress =
    (progress.journalEntries * 2) +
    (progress.breathingExercises * 5) +
    (Math.floor(progress.gameScore / 10)) +
    (streak * 3);

  const level = Math.floor(totalProgress / 50) + 1;
  const progressToNextLevel = (totalProgress % 50) / 50 * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/70 border border-purple-500/40 rounded-xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-yellow-400" />
        <div>
          <h2 className="text-2xl text-purple-200">Your Progress</h2>
          <p className="text-sm text-gray-400">Level {level} Explorer</p>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Level {level}</span>
          <span>{Math.floor(progressToNextLevel)}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressToNextLevel}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Journal Entries</span>
          </div>
          <div className="text-2xl text-purple-300">{progress.journalEntries}</div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-gray-400">Breathing Sessions</span>
          </div>
          <div className="text-2xl text-pink-300">{progress.breathingExercises}</div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Game High Score</span>
          </div>
          <div className="text-2xl text-yellow-300">{progress.gameScore}</div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-gray-400">Day Streak</span>
          </div>
          <div className="text-2xl text-orange-300">{streak}</div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg text-purple-200 mb-3">Achievements</h3>
        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50'
                  : 'bg-slate-800/30 border border-slate-700 opacity-50'
              }`}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  achievement.unlocked ? 'text-purple-200' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </div>
                <div className="text-xs text-gray-400">{achievement.description}</div>
              </div>
              {achievement.unlocked && (
                <div className="text-green-400 text-sm">✓</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
