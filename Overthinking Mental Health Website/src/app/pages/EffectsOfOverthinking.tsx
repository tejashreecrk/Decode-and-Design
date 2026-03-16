import { motion } from "motion/react";
import { Heart, Moon, Users, Skull, Coffee, Calendar } from "lucide-react";

export function EffectsOfOverthinking() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-pink-400">
              The Cost of Overthinking
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
              When thoughts become chains that bind your life
            </p>
          </motion.div>
        </div>

        {/* Darker ambiance */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950" />
      </section>

      {/* The Cycle Section - MOVED TO TOP */}
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
              The Vicious Cycle
            </h2>

            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {["Overthinking", "Anxiety", "Exhaustion", "More Overthinking"].map(
                  (stage, index) => (
                    <motion.div
                      key={stage}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="relative"
                    >
                      <div className="bg-purple-600/20 border border-purple-500/50 rounded-full w-32 h-32 flex items-center justify-center">
                        <span className="text-center text-sm text-purple-300 px-2">
                          {stage}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 -right-8 text-purple-500 text-2xl">
                          →
                        </div>
                      )}
                      {index < 3 && (
                        <div className="md:hidden text-purple-500 text-2xl text-center my-2">
                          ↓
                        </div>
                      )}
                    </motion.div>
                  )
                )}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 }}
                className="text-gray-400 mt-12"
              >
                Each effect feeds into the next, creating an endless loop that feels
                impossible to escape. But there is a way out...
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Effects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-purple-300">
              How It Affects Your Life
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Overthinking doesn't stay in your mind—it seeps into every aspect
              of your existence, leaving lasting scars.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Physical Health */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-900/80 to-red-900/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 h-full hover:border-red-500/50 transition-all duration-300">
                <Heart className="w-12 h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl mb-4 text-red-300">Physical Health</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Chronic headaches and migraines</li>
                  <li>• Increased blood pressure</li>
                  <li>• Weakened immune system</li>
                  <li>• Digestive problems</li>
                  <li>• Muscle tension and pain</li>
                </ul>
              </div>
            </motion.div>

            {/* Sleep Disruption */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-900/80 to-indigo-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-8 h-full hover:border-indigo-500/50 transition-all duration-300">
                <Moon className="w-12 h-12 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl mb-4 text-indigo-300">Insomnia</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Difficulty falling asleep</li>
                  <li>• Waking up multiple times</li>
                  <li>• Racing thoughts at night</li>
                  <li>• Exhaustion despite rest</li>
                  <li>• Disrupted sleep cycles</li>
                </ul>
              </div>
            </motion.div>

            {/* Social Impact */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 h-full hover:border-purple-500/50 transition-all duration-300">
                <Users className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl mb-4 text-purple-300">Relationships</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Social withdrawal and isolation</li>
                  <li>• Difficulty trusting others</li>
                  <li>• Overanalyzing interactions</li>
                  <li>• Communication breakdowns</li>
                  <li>• Emotional distance</li>
                </ul>
              </div>
            </motion.div>

            {/* Mental Health */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-900/80 to-pink-900/30 backdrop-blur-sm border border-pink-500/20 rounded-xl p-8 h-full hover:border-pink-500/50 transition-all duration-300">
                <Skull className="w-12 h-12 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl mb-4 text-pink-300">Mental Health</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Anxiety and panic attacks</li>
                  <li>• Depression and hopelessness</li>
                  <li>• Brain fog and confusion</li>
                  <li>• Emotional instability</li>
                  <li>• Loss of self-confidence</li>
                </ul>
              </div>
            </motion.div>

            {/* Productivity */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-900/80 to-orange-900/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 h-full hover:border-orange-500/50 transition-all duration-300">
                <Coffee className="w-12 h-12 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl mb-4 text-orange-300">Work & Productivity</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Inability to focus</li>
                  <li>• Decision paralysis</li>
                  <li>• Procrastination cycles</li>
                  <li>• Decreased performance</li>
                  <li>• Burnout and fatigue</li>
                </ul>
              </div>
            </motion.div>

            {/* Daily Life */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-900/80 to-cyan-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 h-full hover:border-cyan-500/50 transition-all duration-300">
                <Calendar className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl mb-4 text-cyan-300">Daily Life</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Missing out on experiences</li>
                  <li>• Constant second-guessing</li>
                  <li>• Fear of making choices</li>
                  <li>• Living in the past/future</li>
                  <li>• Loss of present moment</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Stories */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6 text-purple-300">
              Real Experiences
            </h2>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-900/50 backdrop-blur-sm border-l-4 border-purple-500 rounded-r-xl p-6"
            >
              <p className="text-gray-300 italic mb-2">
                "I couldn't sleep for weeks. Every night, the same thoughts would
                replay in my mind. I was exhausted but my brain wouldn't stop."
              </p>
              <p className="text-gray-500 text-sm">— Anonymous, 28</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-900/50 backdrop-blur-sm border-l-4 border-pink-500 rounded-r-xl p-6"
            >
              <p className="text-gray-300 italic mb-2">
                "I pushed everyone away because I couldn't stop analyzing their
                every word. My relationships suffered because I lived in my head."
              </p>
              <p className="text-gray-500 text-sm">— Anonymous, 34</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-900/50 backdrop-blur-sm border-l-4 border-indigo-500 rounded-r-xl p-6"
            >
              <p className="text-gray-300 italic mb-2">
                "My work performance dropped because I couldn't make decisions.
                I would overthink every choice until the deadline passed."
              </p>
              <p className="text-gray-500 text-sm">— Anonymous, 31</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hope Transition */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-purple-950/30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl mb-6 text-purple-300">
            But There Is Hope
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            While the effects of overthinking are profound, the journey to peace
            and mental clarity is possible. It starts with understanding,
            acceptance, and taking the first step toward healing.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
