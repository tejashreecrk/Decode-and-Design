import { motion } from "motion/react";
import { Link } from "react-router";
import { Lightbulb, Heart, Hand } from "lucide-react";
import { useEffect } from "react";
import { useAudio } from "../hooks/useAudio";

export function BreakingPoint() {
  const { playAmbientSound } = useAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      playAmbientSound('calm');
    }, 2000);

    return () => clearTimeout(timer);
  }, [playAmbientSound]);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Lightbulb className="w-24 h-24 text-yellow-400 mx-auto mb-8" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
              The Moment of Clarity
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
              Sometimes, hitting rock bottom is where the breakthrough begins
            </p>
          </motion.div>
        </div>

        {/* Light breaking through darkness */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        />
      </section>

      {/* The Realization */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-yellow-300">
              You Realize Something Important
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              After all the chaos, all the spiraling, all the pain...
              <br />
              You realize:
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-yellow-900/20 to-transparent border-l-4 border-yellow-500 rounded-r-xl p-8"
            >
              <h3 className="text-2xl mb-4 text-yellow-300">
                "I can't keep living like this"
              </h3>
              <p className="text-gray-400">
                The exhaustion, the anxiety, the endless mental torture—it's not
                sustainable. Something has to change. You have to change.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-l from-orange-900/20 to-transparent border-r-4 border-orange-500 rounded-l-xl p-8"
            >
              <h3 className="text-2xl mb-4 text-orange-300">
                "These are just thoughts"
              </h3>
              <p className="text-gray-400">
                They're not facts. They're not prophecies. They're just thoughts—
                electrical impulses in your brain. They can't hurt you unless you
                let them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-red-900/20 to-transparent border-l-4 border-red-500 rounded-r-xl p-8"
            >
              <h3 className="text-2xl mb-4 text-red-300">
                "I deserve peace"
              </h3>
              <p className="text-gray-400">
                You deserve rest. You deserve a quiet mind. You deserve to feel
                calm and safe in your own thoughts. This is not too much to ask.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-l from-purple-900/20 to-transparent border-r-4 border-purple-500 rounded-l-xl p-8"
            >
              <h3 className="text-2xl mb-4 text-purple-300">
                "I'm ready to try something different"
              </h3>
              <p className="text-gray-400">
                The old patterns aren't working. It's time to learn new ways of
                relating to your thoughts, new ways of finding calm.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Choice */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <Hand className="w-20 h-20 text-blue-400 mx-auto mb-8" />
            
            <h2 className="text-3xl sm:text-4xl mb-6 text-blue-300">
              You Have a Choice
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              This breaking point isn't the end—it's a beginning.
              The moment when you choose to take back control of your mind.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-slate-900 to-purple-900/30 border border-purple-500/30 rounded-xl p-8 cursor-pointer"
              >
                <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl mb-3 text-purple-300">Stay Stuck</h3>
                <p className="text-gray-400 text-sm">
                  Continue the same patterns, the same spirals, the same suffering.
                  It's familiar, but it's destroying you.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-900/50 to-green-900/30 border-2 border-green-500/50 rounded-xl p-8 cursor-pointer shadow-lg shadow-green-500/20"
              >
                <Lightbulb className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl mb-3 text-green-300">Choose Healing</h3>
                <p className="text-gray-400 text-sm">
                  Start the journey toward peace. Learn new tools, practice
                  mindfulness, reclaim your mental freedom.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The First Steps */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl mb-6 text-green-300">
            Your Journey Starts Here
          </h2>
          
          <p className="text-lg text-gray-400 mb-8">
            Breaking free from overthinking isn't easy, but it's possible.
            These tools can help you begin:
          </p>

          <div className="grid gap-4">
            <Link
              to="/journal"
              className="block px-8 py-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50 rounded-lg text-purple-300 hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">📝 Journal Your Thoughts</h3>
              <p className="text-sm text-gray-400">
                Get thoughts out of your head and onto paper. Create distance and clarity.
              </p>
            </Link>

            <Link
              to="/breathing-meditation"
              className="block px-8 py-6 bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-500/50 rounded-lg text-blue-300 hover:from-blue-600/30 hover:to-green-600/30 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">🧘 Practice Meditation</h3>
              <p className="text-sm text-gray-400">
                Calm your nervous system with guided breathing and mindfulness exercises.
              </p>
            </Link>

            <Link
              to="/finding-calm"
              className="block px-8 py-6 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/50 rounded-lg text-green-300 hover:from-green-600/30 hover:to-teal-600/30 hover:border-green-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">✨ Learn Coping Strategies</h3>
              <p className="text-sm text-gray-400">
                Discover practical techniques to break the overthinking cycle.
              </p>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
