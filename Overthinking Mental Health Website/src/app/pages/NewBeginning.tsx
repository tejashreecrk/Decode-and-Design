import { motion } from "motion/react";
import { Link } from "react-router";
import { Sunrise, Star, Compass, TreePine, Smile, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useAudio } from "../hooks/useAudio";

export function NewBeginning() {
  const { playAmbientSound, playSuccess } = useAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      playAmbientSound('peaceful');
    }, 1000);

    const successTimer = setTimeout(() => {
      playSuccess();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(successTimer);
    };
  }, [playAmbientSound, playSuccess]);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950/30 to-blue-900/20">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sunrise className="w-24 h-24 text-yellow-400 mx-auto mb-8" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
              A New Beginning
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8">
              You've made it through the darkness. Now, the dawn is breaking.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-blue-200"
            >
              Welcome to the rest of your journey.
            </motion.div>
          </motion.div>
        </div>

        {/* Sunrise effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-yellow-500/10 via-orange-500/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        />

        {/* Floating stars */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              <Star className="w-2 h-2 text-yellow-300" fill="currentColor" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* What You've Learned */}
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
              What You've Discovered
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Through this journey, you've gained insights and tools that will
              serve you for life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TreePine,
                title: "Awareness",
                description: "You can now recognize when overthinking begins, catching it early before it spirals.",
                color: "green",
              },
              {
                icon: Compass,
                title: "Tools",
                description: "You have breathing exercises, journaling, and meditation to navigate difficult moments.",
                color: "blue",
              },
              {
                icon: Smile,
                title: "Self-Compassion",
                description: "You've learned to be kinder to yourself, treating your mind with gentleness.",
                color: "pink",
              },
              {
                icon: Star,
                title: "Perspective",
                description: "You understand that thoughts are just thoughts—they don't define your reality.",
                color: "yellow",
              },
              {
                icon: Sunrise,
                title: "Hope",
                description: "You know that even the darkest nights end, and peace is always possible.",
                color: "orange",
              },
              {
                icon: ArrowRight,
                title: "Resilience",
                description: "You've proven to yourself that you can face mental chaos and come out stronger.",
                color: "purple",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`bg-gradient-to-br from-${item.color}-900/20 to-slate-900/50 border border-${item.color}-500/30 rounded-xl p-8 hover:border-${item.color}-400/50 transition-all duration-300`}
              >
                <item.icon className={`w-12 h-12 text-${item.color}-400 mb-4`} />
                <h3 className="text-xl mb-3 text-purple-300">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Moving Forward */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl mb-12 text-blue-300">
              Your Path Forward
            </h2>
            
            <div className="space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-blue-900/30 to-transparent border-l-4 border-blue-500 rounded-r-xl p-8"
              >
                <h3 className="text-2xl mb-4 text-blue-300">
                  💫 This Isn't the End
                </h3>
                <p className="text-gray-400">
                  Healing is not a destination—it's a continuous journey. There will be
                  setbacks, difficult nights, moments when old patterns return. That's
                  normal. What matters is that you now have the tools to navigate them.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-l from-green-900/30 to-transparent border-r-4 border-green-500 rounded-l-xl p-8"
              >
                <h3 className="text-2xl mb-4 text-green-300">
                  🌱 Keep Practicing
                </h3>
                <p className="text-gray-400">
                  Return to the journal when thoughts feel overwhelming. Use the breathing
                  exercises when anxiety rises. These aren't one-time solutions—they're
                  lifelong practices that get easier and more effective with time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-purple-900/30 to-transparent border-l-4 border-purple-500 rounded-r-xl p-8"
              >
                <h3 className="text-2xl mb-4 text-purple-300">
                  🤝 Seek Support
                </h3>
                <p className="text-gray-400">
                  You don't have to do this alone. Talk to friends, family, or a
                  therapist. Professional help is a sign of strength, not weakness.
                  Community and connection are powerful healers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-l from-yellow-900/30 to-transparent border-r-4 border-yellow-500 rounded-l-xl p-8"
              >
                <h3 className="text-2xl mb-4 text-yellow-300">
                  ✨ Celebrate Progress
                </h3>
                <p className="text-gray-400">
                  Every moment you choose awareness over autopilot, every breath you take
                  mindfully, every journal entry—these are victories. Celebrate them.
                  You're doing better than you think.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Daily Practices */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-purple-300">
              Daily Practices for Peace
            </h2>
            <p className="text-lg text-gray-400">
              Small daily habits that compound into lasting change
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Morning: 5 minutes of breathing exercises upon waking",
              "Daytime: Pause and check in with yourself every few hours",
              "Evening: Journal for 10 minutes before bed",
              "Weekly: Review your journal entries to spot patterns",
              "Monthly: Reflect on your growth and adjust practices",
              "Always: Be gentle with yourself on difficult days",
            ].map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-300">{index + 1}</span>
                </div>
                <p className="text-gray-300">{practice}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-950/20 to-purple-950/30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Sunrise className="w-20 h-20 text-yellow-400 mx-auto mb-8" />
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
            You Are Not Your Thoughts
          </h2>
          
          <div className="space-y-6 text-lg text-gray-300 mb-12">
            <p>
              You are the sky, and thoughts are just passing clouds.
            </p>
            <p>
              You are the ocean, and overthinking is just waves on the surface.
            </p>
            <p>
              You are whole, worthy, and capable of peace—
              <br />
              <span className="text-blue-300">right here, right now.</span>
            </p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-2 border-blue-400/50 rounded-full text-blue-200 text-xl mb-8"
          >
            The journey continues. You've got this. 💙
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              to="/journal"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-all duration-300 shadow-lg shadow-purple-500/30"
            >
              Continue Journaling
            </Link>
            <Link
              to="/breathing-meditation"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-all duration-300 shadow-lg shadow-blue-500/30"
            >
              Practice Meditation
            </Link>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Resources */}
      <section className="py-12 px-4 bg-slate-950/50 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">
            If you're struggling with severe anxiety or depression, please reach out for professional help.
          </p>
          <p className="text-sm text-gray-500">
            Crisis resources: National Suicide Prevention Lifeline: 988 | Crisis Text Line: Text HOME to 741741
          </p>
        </div>
      </section>
    </div>
  );
}
