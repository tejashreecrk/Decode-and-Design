import { motion } from "motion/react";
import { Link } from "react-router";
import { FloatingThoughts } from "../components/FloatingThoughts";
import { TypewriterText } from "../components/TypewriterText";
import { Brain, Moon, Waves, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAudio } from "../hooks/useAudio";

export function Home() {
  const { playAmbientSound } = useAudio();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(true);

  useEffect(() => {
    // Play ambient sound on mount
    const timer = setTimeout(() => {
      playAmbientSound('tense');
    }, 2000);

    return () => clearTimeout(timer);
  }, [playAmbientSound]);

  useEffect(() => {
    // Update clock every second
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    // Stopwatch timer
    if (isStopwatchRunning) {
      const stopwatchInterval = setInterval(() => {
        setStopwatchSeconds((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(stopwatchInterval);
    }
  }, [isStopwatchRunning]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatStopwatch = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <FloatingThoughts count={20} />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Moon className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              <TypewriterText text="3:47 AM" speed={100} />
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-8">
              <TypewriterText 
                text="When your mind won't let you rest..." 
                delay={1500}
                speed={50}
              />
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1 }}
              className="space-y-4"
            >
              <Link
                to="/the-night-begins"
                className="inline-block px-8 py-4 bg-purple-600/40 border border-purple-400 rounded-lg text-purple-200 hover:bg-purple-600/50 hover:border-purple-300 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-purple-500/30"
              >
                Enter the Mind
              </Link>
            </motion.div>

            {/* Timer Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 1 }}
              className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <div className="bg-slate-900/70 border border-purple-500/40 rounded-xl p-6 backdrop-blur-md shadow-xl min-w-[200px]">
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-purple-300">Current Time</span>
                </div>
                <div className="text-2xl text-purple-100 font-mono text-center">
                  {formatTime(currentTime)}
                </div>
              </div>

              <div className="bg-slate-900/70 border border-pink-500/40 rounded-xl p-6 backdrop-blur-md shadow-xl min-w-[200px]">
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <Clock className="w-5 h-5 text-pink-400" />
                  <span className="text-sm text-pink-300">Time Thinking</span>
                </div>
                <div className="text-2xl text-pink-100 font-mono text-center">
                  {formatStopwatch(stopwatchSeconds)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Ambient Background Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-purple-300">
              The Restless Mind
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A journey through the chaos of overthinking, where thoughts multiply
              in the darkness, and peace seems impossible to find.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-slate-900/70 backdrop-blur-sm border border-purple-500/40 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <Brain className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl mb-3 text-purple-200">Mental Chaos</h3>
              <p className="text-gray-300">
                Thousands of thoughts racing through your mind, each one demanding
                attention, creating an endless spiral of worry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-slate-900/70 backdrop-blur-sm border border-purple-500/40 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <Moon className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl mb-3 text-purple-200">Sleepless Nights</h3>
              <p className="text-gray-300">
                The clock ticks past midnight as your mind refuses to quiet down,
                replaying every moment, every mistake.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-slate-900/70 backdrop-blur-sm border border-purple-500/40 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <Waves className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl mb-3 text-purple-200">Finding Peace</h3>
              <p className="text-gray-300">
                But there is hope—a path to calmness, to quiet the storm and find
                the peace your mind desperately seeks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl mb-12 text-purple-200">
              You Are Not Alone
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl sm:text-5xl md:text-6xl text-purple-300 mb-2">73%</div>
                <p className="text-gray-300">of adults experience overthinking</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl md:text-6xl text-purple-300 mb-2">3AM</div>
                <p className="text-gray-300">the peak hour of racing thoughts</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl md:text-6xl text-purple-300 mb-2">∞</div>
                <p className="text-gray-300">thoughts per sleepless night</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl mb-6 text-purple-300">
            Ready to Explore?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Take a journey through the mind to understand overthinking and discover
            the path to inner peace.
          </p>
          <Link
            to="/inside-the-mind"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/50"
          >
            Begin the Journey
          </Link>
        </motion.div>
      </section>

      {/* Additional Links */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl mb-6 text-purple-300">
            More Resources
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Explore additional tools and techniques to manage your thoughts and find
            peace.
          </p>
          <div className="grid gap-4">
            <Link
              to="/the-night-begins"
              className="block px-8 py-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50 rounded-lg text-purple-300 hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">🌙 The Night Begins</h3>
              <p className="text-sm text-gray-400">
                Experience the transition from rest to restlessness
              </p>
            </Link>

            <Link
              to="/inside-the-mind"
              className="block px-8 py-6 bg-gradient-to-r from-blue-600/20 to-pink-600/20 border border-blue-500/50 rounded-lg text-blue-300 hover:from-blue-600/30 hover:to-pink-600/30 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">🧠 Inside the Mind</h3>
              <p className="text-sm text-gray-400">
                Visualize the chaos of racing thoughts
              </p>
            </Link>

            <Link
              to="/journal"
              className="block px-8 py-6 bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/50 rounded-lg text-pink-300 hover:from-pink-600/30 hover:to-purple-600/30 hover:border-pink-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">📝 Personal Journal</h3>
              <p className="text-sm text-gray-400">
                Write and release your thoughts
              </p>
            </Link>

            <Link
              to="/breathing-meditation"
              className="block px-8 py-6 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/50 rounded-lg text-green-300 hover:from-green-600/30 hover:to-teal-600/30 hover:border-green-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">🧘 Meditation & Breathing</h3>
              <p className="text-sm text-gray-400">
                Guided exercises to find calm
              </p>
            </Link>

            <Link
              to="/thought-catcher"
              className="block px-8 py-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/50 rounded-lg text-yellow-300 hover:from-yellow-600/30 hover:to-orange-600/30 hover:border-yellow-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">🎯 Thought Catcher Game</h3>
              <p className="text-sm text-gray-400">
                Interactive game to practice releasing negative thoughts
              </p>
            </Link>

            <Link
              to="/mood-calendar"
              className="block px-8 py-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/50 rounded-lg text-indigo-300 hover:from-indigo-600/30 hover:to-purple-600/30 hover:border-indigo-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">📅 Mood Calendar</h3>
              <p className="text-sm text-gray-400">
                Track your emotional journey day by day
              </p>
            </Link>

            <Link
              to="/dashboard"
              className="block px-8 py-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/50 rounded-lg text-cyan-300 hover:from-cyan-600/30 hover:to-blue-600/30 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm text-left"
            >
              <h3 className="text-xl mb-2">📊 Your Dashboard</h3>
              <p className="text-sm text-gray-400">
                View your progress, achievements, and stats
              </p>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}