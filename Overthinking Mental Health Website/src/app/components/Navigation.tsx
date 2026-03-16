import { NavLink } from "react-router";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudio } from "../hooks/useAudio";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playClick, isAudioEnabled } = useAudio();

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/the-night-begins", label: "Night Begins" },
    { to: "/inside-the-mind", label: "Inside the Mind" },
    { to: "/the-spiral", label: "The Spiral" },
    { to: "/effects", label: "Effects" },
    { to: "/breaking-point", label: "Breaking Point" },
    { to: "/journal", label: "Journal" },
    { to: "/breathing-meditation", label: "Meditation" },
    { to: "/finding-calm", label: "Finding Calm" },
    { to: "/new-beginning", label: "New Beginning" },
    { to: "/thought-catcher", label: "Thought Catcher" },
    { to: "/mood-calendar", label: "Mood Calendar" },
  ];

  const handleLinkClick = () => {
    if (soundEnabled && isAudioEnabled) {
      playClick();
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/50 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-purple-400 tracking-wider">OVERTHINKING</div>

          <div className="flex items-center gap-4">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {/* Desktop Navigation - Scrollable */}
            <div className="hidden lg:flex space-x-4 max-w-2xl overflow-x-auto">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `transition-colors duration-300 whitespace-nowrap text-sm ${
                      isActive
                        ? "text-purple-400"
                        : "text-gray-400 hover:text-purple-300"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-purple-400 hover:text-purple-300 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 border-t border-purple-500/20 max-h-96 overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `block py-2 transition-colors duration-300 ${
                      isActive
                        ? "text-purple-400"
                        : "text-gray-400 hover:text-purple-300"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}