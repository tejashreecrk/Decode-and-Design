import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Wind, Play, Pause, RotateCcw, Heart } from "lucide-react";
import { useAudio } from "../hooks/useAudio";

type BreathingPhase = "inhale" | "hold" | "exhale" | "rest";

interface Exercise {
  name: string;
  description: string;
  pattern: { phase: BreathingPhase; duration: number; instruction: string }[];
  color: string;
}

export function BreathingMeditation() {
  const [isActive, setIsActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const { playBreathIn, playBreathOut, playSuccess } = useAudio();

  const exercises: Exercise[] = [
    {
      name: "4-7-8 Breathing",
      description: "Calms the nervous system, reduces anxiety",
      pattern: [
        { phase: "inhale", duration: 4, instruction: "Breathe in through your nose" },
        { phase: "hold", duration: 7, instruction: "Hold your breath" },
        { phase: "exhale", duration: 8, instruction: "Exhale slowly through your mouth" },
      ],
      color: "blue",
    },
    {
      name: "Box Breathing",
      description: "Used by Navy SEALs for focus and calm",
      pattern: [
        { phase: "inhale", duration: 4, instruction: "Breathe in" },
        { phase: "hold", duration: 4, instruction: "Hold" },
        { phase: "exhale", duration: 4, instruction: "Breathe out" },
        { phase: "hold", duration: 4, instruction: "Hold" },
      ],
      color: "purple",
    },
    {
      name: "Calm Breathing",
      description: "Simple and effective for immediate relief",
      pattern: [
        { phase: "inhale", duration: 4, instruction: "Breathe in slowly" },
        { phase: "exhale", duration: 6, instruction: "Breathe out gently" },
        { phase: "rest", duration: 2, instruction: "Rest" },
      ],
      color: "green",
    },
    {
      name: "Deep Relaxation",
      description: "Perfect for before sleep",
      pattern: [
        { phase: "inhale", duration: 5, instruction: "Deep breath in" },
        { phase: "hold", duration: 5, instruction: "Hold gently" },
        { phase: "exhale", duration: 7, instruction: "Release all tension" },
        { phase: "rest", duration: 3, instruction: "Feel the peace" },
      ],
      color: "teal",
    },
  ];

  const exercise = exercises[currentExercise];
  const currentPhase = exercise.pattern[currentPhaseIndex];

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Move to next phase
      const nextPhaseIndex = (currentPhaseIndex + 1) % exercise.pattern.length;
      setCurrentPhaseIndex(nextPhaseIndex);
      setTimeLeft(exercise.pattern[nextPhaseIndex].duration);

      // Play sounds
      const nextPhase = exercise.pattern[nextPhaseIndex];
      if (nextPhase.phase === "inhale") {
        playBreathIn();
        if (nextPhaseIndex === 0) {
          setCompletedCycles((prev) => prev + 1);
          if (completedCycles > 0 && completedCycles % 5 === 0) {
            playSuccess();
          }
        }
      } else if (nextPhase.phase === "exhale") {
        playBreathOut();
      }
    }
  }, [isActive, timeLeft, currentPhaseIndex, exercise.pattern, playBreathIn, playBreathOut, playSuccess, completedCycles]);

  const startExercise = () => {
    setIsActive(true);
    setTimeLeft(exercise.pattern[0].duration);
    setCurrentPhaseIndex(0);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhaseIndex(0);
    setTimeLeft(exercise.pattern[0].duration);
    setCompletedCycles(0);
  };

  const getCircleScale = () => {
    const totalDuration = currentPhase.duration;
    const elapsed = currentPhase.duration - timeLeft;
    const progress = elapsed / totalDuration;

    if (currentPhase.phase === "inhale") {
      return 0.5 + progress * 0.5; // Scale from 0.5 to 1
    } else if (currentPhase.phase === "exhale") {
      return 1 - progress * 0.5; // Scale from 1 to 0.5
    }
    return 1;
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-slate-950 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Wind className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Breathing & Meditation
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Guided breathing exercises to calm your mind and regulate your nervous system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meditation Tips - MOVED UP */}
      <section className="py-12 px-4 bg-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-8 text-purple-300 text-center">
            Meditation Tips
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Find a Quiet Space",
                tip: "Minimize distractions. Sit or lie comfortably.",
              },
              {
                title: "Focus on Your Breath",
                tip: "If your mind wanders, gently bring it back to breathing.",
              },
              {
                title: "Don't Judge",
                tip: "There's no 'perfect' meditation. Just be present.",
              },
              {
                title: "Practice Regularly",
                tip: "Even 5 minutes daily makes a difference over time.",
              },
              {
                title: "Be Patient",
                tip: "Benefits accumulate with practice. Don't give up.",
              },
              {
                title: "Use Visualization",
                tip: "Imagine stress leaving your body with each exhale.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6"
              >
                <h3 className="text-lg mb-2 text-blue-300">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Selector */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl mb-6 text-purple-300 text-center">
            Choose Your Exercise
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exercises.map((ex, index) => (
              <motion.button
                key={ex.name}
                onClick={() => {
                  setCurrentExercise(index);
                  resetExercise();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  currentExercise === index
                    ? `border-${ex.color}-500 bg-${ex.color}-900/30`
                    : "border-slate-700 bg-slate-900/30 hover:border-purple-500/50"
                }`}
              >
                <h3 className="text-lg mb-2 text-purple-300">{ex.name}</h3>
                <p className="text-sm text-gray-400">{ex.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Circle Visualization */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full border border-${exercise.color}-500/20`}
                  style={{
                    width: `${(i + 1) * 33}%`,
                    height: `${(i + 1) * 33}%`,
                  }}
                />
              ))}
            </div>

            {/* Main breathing circle */}
            <motion.div
              className={`absolute inset-0 m-auto rounded-full bg-gradient-to-br from-${exercise.color}-500/30 to-${exercise.color}-600/30 border-2 border-${exercise.color}-400 shadow-lg shadow-${exercise.color}-500/50 flex items-center justify-center`}
              animate={{
                scale: isActive ? getCircleScale() : 0.7,
              }}
              transition={{
                duration: isActive ? 1 : 0.5,
                ease: "easeInOut",
              }}
              style={{
                width: "60%",
                height: "60%",
              }}
            >
              <div className="text-center">
                {isActive ? (
                  <>
                    <motion.div
                      key={currentPhase.instruction}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl sm:text-2xl text-white mb-4"
                    >
                      {currentPhase.instruction}
                    </motion.div>
                    <div className="text-5xl sm:text-6xl font-light text-white">
                      {timeLeft}
                    </div>
                  </>
                ) : (
                  <div className="text-2xl text-white">Ready?</div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex gap-4">
              {!isActive ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startExercise}
                  className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-full text-white flex items-center gap-2 shadow-lg"
                >
                  <Play size={20} />
                  Start
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={pauseExercise}
                  className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 rounded-full text-white flex items-center gap-2 shadow-lg"
                >
                  <Pause size={20} />
                  Pause
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetExercise}
                className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-full text-white flex items-center gap-2 shadow-lg"
              >
                <RotateCcw size={20} />
                Reset
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Heart className="text-red-400" size={20} />
                <span>Cycles: {completedCycles}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
