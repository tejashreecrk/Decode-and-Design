import { motion } from "motion/react";
import { Link } from "react-router";
import { Clock, Moon, CloudRain, Zap } from "lucide-react";
import { useEffect } from "react";
import { useAudio } from "../hooks/useAudio";

export function TheNightBegins() {
  const { playAmbientSound } = useAudio();

  useEffect(() => {
    // Play tense ambient on mount
    const timer = setTimeout(() => {
      playAmbientSound('tense');
    }, 1000);

    return () => clearTimeout(timer);
  }, [playAmbientSound]);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-20 h-20 text-purple-400 mx-auto mb-8" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl sm:text-6xl md:text-8xl mb-6 text-purple-300"
            >
              11:47 PM
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-xl sm:text-2xl text-gray-300 mb-8"
            >
              The day is ending, but your mind is just waking up...
            </motion.p>
          </motion.div>
        </div>

        {/* Darkening background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        />
      </section>

      {/* The Transition Moments */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Common Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl mb-8 text-purple-300">
              After 11:47 PM
            </h2>
          </motion.div>

          {/* Moment 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <Moon className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl mb-4 text-blue-300">
              You Lie Down to Rest
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The lights are off. The room is quiet. Everything seems perfect for sleep.
              But as soon as your head hits the pillow, something shifts...
            </p>
          </motion.div>

          {/* Moment 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl mb-4 text-yellow-300">
              The First Thought Arrives
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              A small worry. An unanswered question. A memory from earlier today.
              It seems innocent at first...
            </p>
            <div className="bg-slate-900/50 border border-yellow-500/30 rounded-lg p-6 max-w-xl mx-auto">
              <p className="text-yellow-200 italic">
                "Did I say the right thing in that meeting?"
              </p>
            </div>
          </motion.div>

          {/* Moment 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <CloudRain className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl mb-4 text-purple-300">
              Then Comes Another...
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              And another. And another. Like rain starting to fall, the thoughts
              begin to multiply.
            </p>
            <div className="grid gap-4 max-w-xl mx-auto">
              {[
                "What about tomorrow's deadline?",
                "Why did they look at me that way?",
                "Am I doing enough with my life?",
                "What if everything goes wrong?",
              ].map((thought, index) => (
                <motion.div
                  key={thought}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-slate-900/50 border border-purple-500/30 rounded-lg p-4 text-left"
                >
                  <p className="text-purple-200 italic text-sm">{thought}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Time Progression */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl mb-12 text-purple-300">
              As the Night Deepens
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { time: "12:00 AM", state: "Still awake" },
                { time: "1:00 AM", state: "Mind racing" },
                { time: "2:00 AM", state: "Can't stop" },
                { time: "3:47 AM", state: "Exhausted" },
              ].map((moment, index) => (
                <motion.div
                  key={moment.time}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-gradient-to-br from-slate-900 to-purple-900/30 rounded-xl p-6 border border-purple-500/30"
                >
                  <div className="text-3xl text-purple-400 mb-2">{moment.time}</div>
                  <div className="text-gray-400">{moment.state}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Realization */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl mb-6 text-red-300">
            You Try to Fight It
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            "Just stop thinking," you tell yourself. "Just sleep."
            <br />
            But the harder you try, the louder the thoughts become.
          </p>

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-2xl text-purple-300 mb-12"
          >
            The night has just begun...
          </motion.div>

          <Link
            to="/inside-the-mind"
            className="inline-block px-8 py-4 bg-purple-600/20 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-600/30 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
          >
            Enter the Chaos
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
