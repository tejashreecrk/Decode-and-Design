import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Heart, Share2, Copy, Check } from 'lucide-react';

const affirmations = [
  "Your thoughts don't define you. You are more than your overthinking.",
  "It's okay to rest your mind. Peace is always within reach.",
  "You are doing better than you think. Be gentle with yourself.",
  "Every breath is a new beginning. Let go of what you can't control.",
  "Your mental health matters. Taking breaks is not weakness.",
  "Progress isn't linear. Every small step counts.",
  "You deserve peace, calm, and restful sleep.",
  "It's okay to not be okay. Tomorrow is a new day.",
  "Your feelings are valid. It's okay to feel overwhelmed sometimes.",
  "You are stronger than your anxious thoughts.",
  "Silence your inner critic. You are enough, just as you are.",
  "Worrying won't change the outcome. Focus on what you can control.",
  "Your mind is powerful. Channel it towards positivity.",
  "Rest is productive. You don't have to be busy all the time.",
  "You've survived 100% of your worst days. You're resilient.",
];

export function DailyAffirmation() {
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const getRandomAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(random);
    setIsLiked(false);
  };

  useEffect(() => {
    getRandomAffirmation();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAffirmation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Affirmation',
        text: currentAffirmation,
      });
    }
  };

  return (
    <motion.div
      className="fixed top-20 left-4 z-50 max-w-xs"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 border border-purple-400/50 rounded-xl p-5 backdrop-blur-md shadow-2xl"
        animate={{ height: isMinimized ? '60px' : 'auto' }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h3 className="font-semibold text-purple-100">Daily Affirmation</h3>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-purple-300 hover:text-purple-100 transition-colors"
          >
            {isMinimized ? '▼' : '▲'}
          </button>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <motion.p
                key={currentAffirmation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-purple-50 leading-relaxed mb-4 italic"
              >
                "{currentAffirmation}"
              </motion.p>

              <div className="flex items-center gap-2">
                <button
                  onClick={getRandomAffirmation}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600/50 hover:bg-purple-600/70 border border-purple-400/50 rounded-lg text-xs text-purple-100 transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  New
                </button>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    isLiked
                      ? 'bg-pink-600/70 border-pink-400 text-pink-100'
                      : 'bg-purple-600/30 border-purple-400/50 text-purple-200 hover:bg-purple-600/50'
                  } border`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleCopy}
                  className="px-3 py-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 rounded-lg text-purple-200 transition-all"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {navigator.share && (
                  <button
                    onClick={handleShare}
                    className="px-3 py-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 rounded-lg text-purple-200 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
