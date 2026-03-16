import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;

    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev, newParticle].slice(-15));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isEnabled]);

  return (
    <>
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed top-20 right-4 z-50 px-3 py-2 bg-purple-600/30 border border-purple-400/50 rounded-lg text-xs text-purple-200 hover:bg-purple-600/40 transition-all backdrop-blur-sm"
      >
        Trail: {isEnabled ? 'ON' : 'OFF'}
      </button>
      
      <div className="fixed inset-0 pointer-events-none z-40">
        <AnimatePresence>
          {particles.map((particle, index) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
              style={{
                left: particle.x - 4,
                top: particle.y - 4,
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
