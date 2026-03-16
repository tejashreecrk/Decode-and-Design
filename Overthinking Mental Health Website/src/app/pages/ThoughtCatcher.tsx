import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Target, Trophy, RotateCcw } from 'lucide-react';

interface Thought {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

const worryThoughts = [
  "What if I fail?",
  "Did I say something wrong?",
  "I'm not good enough",
  "Everyone is judging me",
  "I can't do this",
  "What if something goes wrong?",
  "I'm falling behind",
  "I should have done better",
  "Am I making a mistake?",
  "Why can't I be like them?",
];

export function ThoughtCatcher() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('thoughtCatcherHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const newThought: Thought = {
        id: Date.now(),
        text: worryThoughts[Math.floor(Math.random() * worryThoughts.length)],
        x: Math.random() * 80 + 10,
        y: -10,
        speed: Math.random() * 2 + 1,
      };
      setThoughts((prev) => [...prev, newThought]);
    }, 1500);

    return () => clearInterval(interval);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive || timer <= 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('thoughtCatcherHighScore', score.toString());
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [gameActive, timer, score, highScore]);

  const catchThought = (id: number) => {
    setThoughts((prev) => prev.filter((t) => t.id !== id));
    setScore((prev) => prev + 10);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimer(30);
    setThoughts([]);
  };

  return (
    <div className="min-h-screen pt-16 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Thought Catcher Game
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Catch and release negative thoughts before they overwhelm you!
            Click on the falling thoughts to capture them.
          </p>
        </motion.div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          <motion.div
            className="bg-slate-900/70 border border-purple-500/40 rounded-xl p-4 text-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-3xl text-purple-300">{score}</div>
            <div className="text-xs text-gray-400">Score</div>
          </motion.div>

          <motion.div
            className="bg-slate-900/70 border border-pink-500/40 rounded-xl p-4 text-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl text-pink-300">{timer}s</div>
            <div className="text-xs text-gray-400">Time Left</div>
          </motion.div>

          <motion.div
            className="bg-slate-900/70 border border-yellow-500/40 rounded-xl p-4 text-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-3xl text-yellow-300">{highScore}</div>
            <div className="text-xs text-gray-400">High Score</div>
          </motion.div>
        </div>

        {/* Game Controls */}
        <div className="text-center mb-8">
          {!gameActive ? (
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/50 text-lg font-semibold"
            >
              {score > 0 ? 'Play Again' : 'Start Game'}
            </button>
          ) : (
            <button
              onClick={() => setGameActive(false)}
              className="px-8 py-4 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-all duration-300"
            >
              Stop Game
            </button>
          )}
        </div>

        {/* Game Area */}
        <div className="relative h-[500px] bg-slate-900/50 border border-purple-500/30 rounded-xl overflow-hidden backdrop-blur-sm">
          {!gameActive && thoughts.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-xl mb-2">Click "Start Game" to begin!</p>
                <p className="text-sm">Catch negative thoughts by clicking on them</p>
              </div>
            </div>
          )}

          {gameActive && timer === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm z-10"
            >
              <div className="text-center">
                <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-4xl text-purple-300 mb-2">Game Over!</h2>
                <p className="text-2xl text-gray-300 mb-4">Score: {score}</p>
                {score > highScore && (
                  <p className="text-lg text-green-400 mb-4">🎉 New High Score!</p>
                )}
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  Play Again
                </button>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {thoughts.map((thought) => (
              <motion.div
                key={thought.id}
                initial={{ x: `${thought.x}%`, y: '-10%' }}
                animate={{ y: '110%' }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 10 / thought.speed, ease: 'linear' }}
                className="absolute cursor-pointer"
                onClick={() => catchThought(thought.id)}
              >
                <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 border border-purple-400 rounded-full px-4 py-2 text-sm text-white backdrop-blur-sm hover:scale-110 transition-transform shadow-lg">
                  {thought.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-2xl mx-auto bg-slate-900/50 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm"
        >
          <h3 className="text-xl text-purple-300 mb-3">How to Play:</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Click "Start Game" to begin</li>
            <li>• Negative thoughts will fall from the top</li>
            <li>• Click on them to "catch" and release them</li>
            <li>• Each thought caught earns you 10 points</li>
            <li>• You have 30 seconds to catch as many as you can!</li>
          </ul>
          <p className="text-sm text-purple-400 mt-4 italic">
            💡 This game is a metaphor for mindfulness - acknowledging negative
            thoughts and letting them go rather than dwelling on them.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
