import { useRef, useCallback, useEffect, useState } from "react";

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  useEffect(() => {
    // Initialize AudioContext on user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        setIsAudioEnabled(true);
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, []);

  const playTone = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
  }, []);

  const playAmbientSound = useCallback((type: 'calm' | 'tense' | 'peaceful') => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    
    if (type === 'calm') {
      // Soft ambient drone
      playTone(110, 2, 0.05);
      setTimeout(() => playTone(165, 2, 0.05), 500);
    } else if (type === 'tense') {
      // Dissonant tones
      playTone(200, 0.5, 0.08);
      setTimeout(() => playTone(205, 0.5, 0.08), 200);
    } else if (type === 'peaceful') {
      // Harmonious tones
      playTone(261.63, 1.5, 0.06); // C
      setTimeout(() => playTone(329.63, 1.5, 0.06), 400); // E
      setTimeout(() => playTone(392, 1.5, 0.06), 800); // G
    }
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(800, 0.1, 0.03);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    playTone(523.25, 0.15, 0.05);
    setTimeout(() => playTone(659.25, 0.15, 0.05), 100);
    setTimeout(() => playTone(783.99, 0.2, 0.05), 200);
  }, [playTone]);

  const playBreathIn = useCallback(() => {
    if (!audioContextRef.current) return;
    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(200, context.currentTime);
    oscillator.frequency.linearRampToValueAtTime(400, context.currentTime + 4);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.02, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, context.currentTime + 4);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 4);
  }, []);

  const playBreathOut = useCallback(() => {
    if (!audioContextRef.current) return;
    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(400, context.currentTime);
    oscillator.frequency.linearRampToValueAtTime(200, context.currentTime + 4);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.06, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02, context.currentTime + 4);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 4);
  }, []);

  return {
    playTone,
    playAmbientSound,
    playClick,
    playSuccess,
    playBreathIn,
    playBreathOut,
    isAudioEnabled,
  };
}
