import React, { useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface AudioNarratorBubbleProps {
  text: string;
  autoSpeak?: boolean;
  className?: string;
}

export const AudioNarratorBubble: React.FC<AudioNarratorBubbleProps> = ({
  text,
  autoSpeak = true,
  className = '',
}) => {
  const { speak, isMuted } = useAudio();

  useEffect(() => {
    if (autoSpeak && text) {
      // Short delay for natural pacing
      const timer = setTimeout(() => {
        speak(text);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [text, autoSpeak]);

  return (
    <div
      className={`relative bg-white border-4 border-amber-300 rounded-3xl p-4 md:p-5 shadow-lg max-w-xl mx-auto flex items-center gap-3 transition-all ${className}`}
    >
      <div className="flex-1 text-slate-800 text-lg md:text-2xl font-bold leading-snug">
        {text}
      </div>

      <button
        onClick={() => speak(text, true)}
        aria-label="Dengarkan suara Milo"
        className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-amber-400 hover:bg-amber-500 active:scale-90 text-amber-950 rounded-2xl flex items-center justify-center shadow-md transition-transform"
      >
        <Volume2 className={`w-8 h-8 md:w-9 md:h-9 ${isMuted ? 'opacity-40' : 'animate-pulse'}`} />
      </button>

      {/* Speech bubble tail pointing left/down */}
      <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white border-b-4 border-r-4 border-amber-300 transform rotate-45"></div>
    </div>
  );
};
