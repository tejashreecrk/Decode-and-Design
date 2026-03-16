import { motion } from "motion/react";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className="relative z-10"
        animate={{
          x: [0, -2, 2, -2, 0],
          y: [0, 1, -1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 text-red-500/50 -z-10"
        animate={{
          x: [-2, 2, -2],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 4,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 text-cyan-500/50 -z-20"
        animate={{
          x: [2, -2, 2],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 4,
          delay: 0.1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
