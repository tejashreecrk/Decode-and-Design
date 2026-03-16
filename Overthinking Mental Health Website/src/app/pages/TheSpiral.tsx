import { motion } from "motion/react";
import { Link } from "react-router";
import { TrendingDown, AlertTriangle, Flame } from "lucide-react";
import { useState, useEffect } from "react";

export function TheSpiral() {
  const [spiralDepth, setSpiralDepth] = useState(0);

  const spiralThoughts = [
    "What if I'm not good enough?",
    "Everyone must think I'm weird",
    "I always mess everything up",
    "Why can't I be normal?",
    "I'll never succeed",
    "I'm wasting my life",
    "What's the point of anything?",
    "I'm so far behind everyone else",
    "I don't belong anywhere",
    "I'm a disappointment",
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, rotateZ: 0 }}
            animate={{ opacity: 1, rotateZ: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-8"
          >
            <TrendingDown className="w-20 h-20 text-red-400 mx-auto" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400"
          >
            Spiraling Down
          </motion.h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12">
            When one negative thought leads to another, and another...
          </p>
        </div>

        {/* Spiral Background Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-red-500/10 rounded-full"
              style={{
                width: `${(i + 1) * 20}%`,
                height: `${(i + 1) * 20}%`,
                left: `${50 - (i + 1) * 10}%`,
                top: `${50 - (i + 1) * 10}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: {
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/20 to-slate-950" />
      </section>

      {/* The Negative Spiral Visualization */}
      <section className="py-20 px-4 bg-slate-950/80">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-red-300">
              The Downward Spiral
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Each negative thought triggers more negative thoughts.
              You're falling deeper into the rabbit hole.
            </p>
          </motion.div>

          {/* Interactive Spiral Depth */}
          <div className="mb-12 text-center">
            <button
              onClick={() => setSpiralDepth(Math.min(spiralDepth + 1, spiralThoughts.length))}
              className="px-8 py-4 bg-red-600/20 border border-red-500/50 rounded-lg text-red-300 hover:bg-red-600/30 hover:border-red-400 transition-all duration-300 backdrop-blur-sm mb-6"
            >
              Spiral Deeper
            </button>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {spiralThoughts.slice(0, spiralDepth).map((thought, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -100, rotateZ: -5 }}
                  animate={{ opacity: 1, x: index * 10, rotateZ: index * 2 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-lg p-4"
                  style={{ marginLeft: `${index * 20}px` }}
                >
                  <p className="text-red-200 italic">"{thought}"</p>
                </motion.div>
              ))}
            </div>

            {spiralDepth === spiralThoughts.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 bg-red-900/30 border border-red-500/50 rounded-xl"
              >
                <Flame className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-xl text-red-300 mb-4">Rock Bottom</p>
                <p className="text-gray-400 mb-6">
                  You've spiraled all the way down. The thoughts feel overwhelming,
                  suffocating. But this is also where change can begin...
                </p>
                <button
                  onClick={() => setSpiralDepth(0)}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-all duration-300"
                >
                  Reset Spiral
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Pattern Recognition */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-orange-300">
              Common Spiral Patterns
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Recognizing these patterns is the first step to breaking free
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-red-900/20 to-slate-900/50 border border-red-500/20 rounded-xl p-8"
            >
              <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl mb-4 text-red-300">Catastrophizing</h3>
              <p className="text-gray-400 mb-4">
                A small problem becomes a disaster. You jump to the worst possible outcome.
              </p>
              <div className="text-sm text-red-200/60 italic space-y-2">
                <p>"I made one mistake" →</p>
                <p>"I'm going to get fired" →</p>
                <p>"I'll lose everything" →</p>
                <p>"My life is over"</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-orange-900/20 to-slate-900/50 border border-orange-500/20 rounded-xl p-8"
            >
              <TrendingDown className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-2xl mb-4 text-orange-300">Generalization</h3>
              <p className="text-gray-400 mb-4">
                One bad experience becomes "always" or "never". Your brain makes sweeping conclusions.
              </p>
              <div className="text-sm text-orange-200/60 italic space-y-2">
                <p>"This didn't work out" →</p>
                <p>"Nothing ever works" →</p>
                <p>"I always fail" →</p>
                <p>"I'm a failure"</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-900/20 to-slate-900/50 border border-yellow-500/20 rounded-xl p-8"
            >
              <Flame className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl mb-4 text-yellow-300">Personalization</h3>
              <p className="text-gray-400 mb-4">
                Everything becomes about you. You take responsibility for things beyond your control.
              </p>
              <div className="text-sm text-yellow-200/60 italic space-y-2">
                <p>"They seem upset" →</p>
                <p>"It must be because of me" →</p>
                <p>"I did something wrong" →</p>
                <p>"I ruin everything"</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breaking the Spiral */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl mb-6 text-purple-300">
            But Spirals Can Be Broken
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Understanding these patterns is powerful. Once you see the spiral for what
            it is—just a pattern, not reality—you can begin to step out of it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/effects"
              className="inline-block px-8 py-4 bg-red-600/20 border border-red-500/50 rounded-lg text-red-300 hover:bg-red-600/30 hover:border-red-400 transition-all duration-300 backdrop-blur-sm"
            >
              See the Damage
            </Link>
            <Link
              to="/journal"
              className="inline-block px-8 py-4 bg-purple-600/20 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-600/30 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
            >
              Start Healing
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
