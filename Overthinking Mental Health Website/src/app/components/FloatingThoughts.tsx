import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Thought {
  id: number;
  text: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

const thoughtTexts = [
  "What if I fail?",
  "Am I good enough?",
  "Did I say the wrong thing?",
  "Everyone is judging me",
  "I can't sleep",
  "Too many tasks",
  "What's wrong with me?",
  "I should have done better",
  "Why can't I stop thinking?",
  "Tomorrow will be worse",
  "I'm not prepared",
  "What if...",
  "I can't do this",
  "Nobody understands",
  "I'm so tired",
  "My mind won't stop",
];

export function FloatingThoughts({ count = 15 }: { count?: number }) {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    const generatedThoughts = Array.from({ length: count }, (_, i) => ({
      id: i,
      text: thoughtTexts[i % thoughtTexts.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 5,
    }));
    setThoughts(generatedThoughts);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {thoughts.map((thought) => (
        <motion.div
          key={thought.id}
          className="absolute text-purple-200 text-xs sm:text-sm md:text-base whitespace-nowrap font-medium"
          style={{
            textShadow: '0 0 20px rgba(192, 132, 252, 0.5), 0 0 40px rgba(192, 132, 252, 0.3)',
          }}
          initial={{
            x: `${thought.x}vw`,
            y: `${thought.y}vh`,
            opacity: 0,
          }}
          animate={{
            y: [`${thought.y}vh`, `${thought.y - 30}vh`, `${thought.y}vh`],
            opacity: [0, 0.9, 0],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: thought.duration,
            delay: thought.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {thought.text}
        </motion.div>
      ))}
    </div>
  );
}
