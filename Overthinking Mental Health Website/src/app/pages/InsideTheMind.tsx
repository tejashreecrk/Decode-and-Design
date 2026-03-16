import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { FloatingThoughts } from "../components/FloatingThoughts";
import { GlitchText } from "../components/GlitchText";
import { Brain, Zap, AlertCircle, Repeat } from "lucide-react";
import { useAudio } from "../hooks/useAudio";

export function InsideTheMind() {
  const [thoughtsCleared, setThoughtsCleared] = useState(false);
  const { playSuccess, playAmbientSound } = useAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      playAmbientSound('tense');
    }, 1000);

    return () => clearTimeout(timer);
  }, [playAmbientSound]);

  const handleClearThoughts = () => {
    setThoughtsCleared(true);
    playSuccess();
    setTimeout(() => setThoughtsCleared(false), 3000);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {!thoughtsCleared && <FloatingThoughts count={30} />}
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Brain className="w-20 h-20 text-purple-400 mx-auto mb-8 animate-pulse" />
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6">
              <GlitchText className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Inside the Mind
              </GlitchText>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8">
              Where thoughts multiply and chaos reigns
            </p>

            <motion.button
              onClick={handleClearThoughts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-purple-600/20 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-600/30 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
            >
              {thoughtsCleared ? "Thoughts Cleared... Temporarily" : "Clear My Thoughts"}
            </motion.button>
          </motion.div>
        </div>

        {/* Pulsing background */}
        <motion.div
          className="absolute inset-0 bg-purple-600/5"
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </section>

      {/* Visualization Section - The Weight of Thoughts (MOVED TO TOP) */}
      <section className="py-20 px-4 relative bg-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl mb-8 text-purple-300">
              The Weight of Thoughts
            </h2>

            <div className="relative h-64 bg-slate-900/50 rounded-xl border border-purple-500/20 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600/50 to-purple-600/10"
                animate={{
                  height: ["20%", "80%", "20%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl text-purple-300">Mental Load</p>
              </div>
            </div>

            <p className="text-gray-400 mt-6">
              As thoughts accumulate, the mental burden grows heavier,
              making it harder to function and find clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Thought Patterns Section - The Thought Spiral */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-purple-300">
              The Thought Spiral
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Once a thought enters, it multiplies, creating an endless cascade
              of worries, doubts, and fears.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
            >
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl mb-4 text-purple-300">Racing Thoughts</h3>
              <p className="text-gray-400 mb-4">
                Your mind jumps from one thought to another at lightning speed.
                No time to process, no time to rest.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="italic">"What if I'm not good enough?"</p>
                <p className="italic">"Did I make the right choice?"</p>
                <p className="italic">"Everyone must think I'm a failure..."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-slate-900/50 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
            >
              <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl mb-4 text-purple-300">Catastrophic Thinking</h3>
              <p className="text-gray-400 mb-4">
                Every small problem becomes a disaster. Your mind creates worst-case
                scenarios that feel impossibly real.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="italic">"Everything is going to fall apart..."</p>
                <p className="italic">"I'll never recover from this..."</p>
                <p className="italic">"This is the end of everything..."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
            >
              <Repeat className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl mb-4 text-purple-300">Rumination Loop</h3>
              <p className="text-gray-400 mb-4">
                The same thoughts, over and over again. You can't escape the cycle
                of replaying past events and imagining future failures.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="italic">"Why did I say that?"</p>
                <p className="italic">"I should have done it differently..."</p>
                <p className="italic">"If only I had..."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900/50 to-indigo-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
            >
              <Brain className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl mb-4 text-purple-300">Mental Exhaustion</h3>
              <p className="text-gray-400 mb-4">
                The constant thinking drains your energy. You're tired but can't rest.
                Exhausted but can't sleep.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="italic">"I'm so tired of thinking..."</p>
                <p className="italic">"Why can't my brain just stop?"</p>
                <p className="italic">"I just want peace..."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Where Thoughts Multiply and Chaos Region */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-purple-300">
              Where Thoughts Multiply
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              In the chaos region of the mind, a single worry branches into countless fears,
              each one feeding the others in an overwhelming cascade.
            </p>
          </motion.div>

          <div className="relative">
            <FloatingThoughts count={15} />
          </div>
        </div>
      </section>

      {/* Transition Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            This constant mental chaos doesn't just affect your thoughts...
            <br />
            <span className="text-purple-400">It affects your entire life.</span>
          </p>
        </motion.div>
      </section>
    </div>
  );
}