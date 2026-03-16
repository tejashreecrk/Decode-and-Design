import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Sparkles, Wind, Sun, Flower2, Heart, Check, Activity, Eye, Hand, Lightbulb } from "lucide-react";
import { useAudio } from "../hooks/useAudio";

type Exercise = "none" | "muscle" | "body-scan" | "grounding" | "visualization";

export function FindingCalm() {
  const [currentExercise, setCurrentExercise] = useState<Exercise>("none");
  const [exerciseStep, setExerciseStep] = useState(0);
  const { playAmbientSound, playSuccess } = useAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      playAmbientSound('peaceful');
    }, 1000);

    return () => clearTimeout(timer);
  }, [playAmbientSound]);

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setExerciseStep(0);
  };

  const nextStep = () => {
    const maxSteps = currentExercise === "muscle" ? 5 :
                     currentExercise === "body-scan" ? 6 :
                     currentExercise === "grounding" ? 5 :
                     currentExercise === "visualization" ? 4 : 0;

    if (exerciseStep < maxSteps - 1) {
      setExerciseStep((prev) => prev + 1);
    } else {
      playSuccess();
      setCurrentExercise("none");
      setExerciseStep(0);
    }
  };

  const exercises = {
    muscle: {
      name: "Progressive Muscle Relaxation",
      icon: Activity,
      color: "green",
      steps: [
        "Tense your fists tightly for 5 seconds, then release completely",
        "Tense your shoulders up to your ears, hold, then drop and relax",
        "Tighten your facial muscles, squeeze your eyes shut, then release",
        "Tense your stomach muscles, hold for 5 seconds, then let go",
        "Curl your toes tightly, hold the tension, then release and relax"
      ]
    },
    "body-scan": {
      name: "Body Scan Meditation",
      icon: Eye,
      color: "blue",
      steps: [
        "Focus your attention on your feet. Notice any sensations without judgment",
        "Move awareness up to your legs. Feel the weight and any tension",
        "Bring attention to your torso and chest. Notice your heartbeat and breathing",
        "Focus on your arms and hands. Feel the temperature and any tingling",
        "Notice your neck and shoulders. Release any tension you find",
        "Finally, scan your face and head. Relax your jaw, eyes, and forehead"
      ]
    },
    grounding: {
      name: "5-4-3-2-1 Grounding",
      icon: Hand,
      color: "purple",
      steps: [
        "Name 5 things you can SEE around you right now",
        "Name 4 things you can TOUCH or feel (texture, temperature)",
        "Name 3 things you can HEAR in this moment",
        "Name 2 things you can SMELL (or imagine pleasant smells)",
        "Name 1 thing you can TASTE or one thing you're grateful for"
      ]
    },
    visualization: {
      name: "Peaceful Visualization",
      icon: Lightbulb,
      color: "pink",
      steps: [
        "Close your eyes and imagine a peaceful place - a beach, forest, or mountain",
        "Notice the colors, the light, the landscape. Make it vivid in your mind",
        "Add sounds - gentle waves, rustling leaves, or birds singing",
        "Feel yourself there completely. You are safe, calm, and at peace"
      ]
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - Lighter, peaceful ambiance */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/30 to-purple-900/20">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Sparkles className="w-20 h-20 text-blue-300 mx-auto mb-8" />
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
              Finding Calm
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12">
              A journey from chaos to clarity, from noise to peace
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Explore different calming techniques to find what works best for you
            </motion.p>
          </motion.div>
        </div>

        {/* Peaceful floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Soft glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </section>

      {/* Calming Exercises Section */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-blue-300">
              Calming Exercises
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Try these guided exercises to find peace and center yourself
            </p>
          </motion.div>

          {currentExercise === "none" ? (
            <div className="grid md:grid-cols-2 gap-6">
              {(Object.keys(exercises) as Exercise[]).filter(key => key !== "none").map((key, index) => {
                const exercise = exercises[key];
                const Icon = exercise.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => startExercise(key)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-br from-${exercise.color}-900/20 to-slate-900/50 border border-${exercise.color}-500/30 rounded-xl p-8 text-left hover:border-${exercise.color}-400/50 transition-all duration-300`}
                  >
                    <Icon className={`w-12 h-12 text-${exercise.color}-400 mb-4`} />
                    <h3 className={`text-2xl mb-3 text-${exercise.color}-300`}>{exercise.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {exercise.steps.length} steps · {exercise.steps.length * 30} seconds
                    </p>
                    <div className={`text-${exercise.color}-400 font-medium`}>
                      Start Exercise →
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-slate-900/90 to-purple-900/30 border border-purple-500/30 rounded-2xl p-12"
              >
                <h3 className="text-3xl mb-8 text-center text-purple-200">
                  {exercises[currentExercise].name}
                </h3>

                <div className="mb-8">
                  <div className="flex justify-center gap-2 mb-6">
                    {exercises[currentExercise].steps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-12 rounded-full transition-all duration-300 ${
                          index === exerciseStep
                            ? "bg-purple-400"
                            : index < exerciseStep
                            ? "bg-purple-600"
                            : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>

                  <motion.div
                    key={exerciseStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <p className="text-sm text-gray-400 mb-2">
                      Step {exerciseStep + 1} of {exercises[currentExercise].steps.length}
                    </p>
                    <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed">
                      {exercises[currentExercise].steps[exerciseStep]}
                    </p>
                  </motion.div>
                </div>

                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full text-white shadow-lg"
                  >
                    {exerciseStep === exercises[currentExercise].steps.length - 1
                      ? "Complete"
                      : "Next Step"}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentExercise("none");
                      setExerciseStep(0);
                    }}
                    className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-full text-white shadow-lg"
                  >
                    Exit
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Path to Peace */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-blue-300">
              The Path to Inner Peace
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Breaking free from overthinking requires patience, practice, and
              compassion for yourself. Here are the steps to reclaim your peace.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-900/20 to-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 hover:border-blue-400/50 transition-all duration-300"
            >
              <Wind className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl mb-4 text-blue-300">Mindful Breathing</h3>
              <p className="text-gray-400 mb-4">
                Focus on your breath. Inhale for 4 seconds, hold for 4, exhale for 4.
                This simple practice anchors you to the present moment.
              </p>
              <div className="text-sm text-gray-500 italic">
                "Breath is the bridge between mind and body."
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-900/20 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 hover:border-purple-400/50 transition-all duration-300"
            >
              <Sun className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl mb-4 text-purple-300">Present Moment</h3>
              <p className="text-gray-400 mb-4">
                Stop living in the past or future. Ground yourself in now. Notice your
                surroundings, your senses, your existence in this moment.
              </p>
              <div className="text-sm text-gray-500 italic">
                "The present is all we truly have."
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-pink-900/20 to-slate-900/50 backdrop-blur-sm border border-pink-500/20 rounded-xl p-8 hover:border-pink-400/50 transition-all duration-300"
            >
              <Flower2 className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-2xl mb-4 text-pink-300">Self-Compassion</h3>
              <p className="text-gray-400 mb-4">
                Be kind to yourself. Your thoughts don't define you. Treat yourself
                with the same compassion you'd offer a dear friend.
              </p>
              <div className="text-sm text-gray-500 italic">
                "You deserve your own kindness."
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-green-900/20 to-slate-900/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 hover:border-green-400/50 transition-all duration-300"
            >
              <Heart className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl mb-4 text-green-300">Journaling</h3>
              <p className="text-gray-400 mb-4">
                Write down your thoughts. Transferring them from mind to paper
                creates distance and clarity, helping you see them objectively.
              </p>
              <div className="text-sm text-gray-500 italic">
                "Writing sets thoughts free."
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-indigo-900/20 to-slate-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-8 hover:border-indigo-400/50 transition-all duration-300"
            >
              <Check className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-2xl mb-4 text-indigo-300">Acceptance</h3>
              <p className="text-gray-400 mb-4">
                Accept that you can't control everything. Some thoughts will come,
                and that's okay. Observe them without judgment and let them pass.
              </p>
              <div className="text-sm text-gray-500 italic">
                "Acceptance is the first step to peace."
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-cyan-900/20 to-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300"
            >
              <Sparkles className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl mb-4 text-cyan-300">Daily Practice</h3>
              <p className="text-gray-400 mb-4">
                Consistency is key. Dedicate 10 minutes each day to mindfulness,
                meditation, or simply sitting in silence with yourself.
              </p>
              <div className="text-sm text-gray-500 italic">
                "Small steps lead to great journeys."
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Affirmations Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-blue-300">
              Peaceful Affirmations
            </h2>
            <p className="text-gray-400">
              Repeat these to yourself when overwhelm strikes
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              "My thoughts do not control me",
              "I am allowed to rest my mind",
              "This too shall pass",
              "I am safe in this moment",
              "I choose peace over worry",
              "I am enough, just as I am",
            ].map((affirmation, index) => (
              <motion.div
                key={affirmation}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 text-center"
              >
                <p className="text-xl sm:text-2xl text-blue-200">{affirmation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Visualization */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl mb-12 text-blue-300">
              The Journey of Healing
            </h2>
            
            <div className="relative h-64 bg-slate-900/50 rounded-xl border border-blue-500/20 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/50 to-blue-500/10"
                initial={{ height: "10%" }}
                whileInView={{ height: "90%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl text-blue-300 mb-2">Inner Peace</p>
                  <p className="text-sm text-gray-400">Growing every day</p>
                </div>
              </div>
            </div>

            <p className="text-gray-400 mt-6">
              Recovery isn't linear, but every small step forward is progress.
              Be patient with yourself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950/50 to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          
          <h2 className="text-3xl sm:text-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            You Are Not Your Thoughts
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Overthinking doesn't define you. It's a pattern that can be changed,
            a storm that can be calmed. You have the power to find peace within yourself.
          </p>

          <p className="text-lg text-gray-400 mb-8">
            The journey from chaos to calm is not about eliminating all thoughts—it's
            about changing your relationship with them. It's about finding stillness
            in the midst of the storm.
          </p>

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/50 rounded-full text-blue-200"
          >
            Peace is possible. Peace is within you.
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}