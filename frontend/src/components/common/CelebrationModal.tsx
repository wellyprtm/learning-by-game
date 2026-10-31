import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, ArrowRight, Star } from 'lucide-react';
import { MiloCat } from '../mascot/MiloCat';
import { useAudio } from '../../context/AudioContext';

interface CelebrationModalProps {
  isOpen: boolean;
  stars: number;
  levelTitle: string;
  onNext: () => void;
  onReplay: () => void;
  avatarCat?: string;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  stars,
  levelTitle,
  onNext,
  onReplay,
  avatarCat,
}) => {
  const { playFanfare, playStar, speak } = useAudio();

  useEffect(() => {
    if (isOpen) {
      playFanfare();
      speak(
        stars === 3
          ? 'Luar biasa! Tiga bintang emas untukmu! Kamu sangat hebat!'
          : 'Hore! Kamu berhasil menyelesaikan tantangan!'
      );

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
        });
      } catch (e) {
        console.error(e);
      }

      // Star chimes in sequence
      const timers = [1, 2, 3].slice(0, stars).map((_, i) =>
        setTimeout(() => {
          playStar();
        }, 300 + i * 400)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [isOpen, stars]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white border-4 border-amber-400 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Festive Background Ribbon */}
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-yellow-200 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-pink-200 rounded-full blur-xl pointer-events-none" />

        <MiloCat mood="cheering" size="lg" avatarCat={avatarCat} className="mx-auto -mt-2 mb-2" />

        <h2 className="text-3xl md:text-4xl font-extrabold text-amber-600 mb-1">
          Hore! Kamu Berhasil! 🎉
        </h2>
        <p className="text-slate-600 text-lg font-bold mb-4">{levelTitle}</p>

        {/* 3 Stars display */}
        <div className="flex justify-center items-center gap-3 my-4">
          {[1, 2, 3].map((starIdx) => {
            const hasStar = starIdx <= stars;
            return (
              <div
                key={starIdx}
                className={`transform transition-all duration-500 ${
                  hasStar ? 'scale-110 text-amber-400 fill-amber-400' : 'text-slate-300'
                }`}
              >
                <Star
                  className={`w-14 h-14 md:w-16 md:h-16 ${
                    hasStar ? 'fill-amber-400 drop-shadow-md animate-glow' : 'fill-slate-200'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={onReplay}
            className="flex-1 py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-lg rounded-2xl flex items-center justify-center gap-2 border-2 border-slate-300 btn-kid active:scale-95 transition-all"
          >
            <RotateCcw className="w-6 h-6" />
            <span>Main Lagi</span>
          </button>

          <button
            onClick={onNext}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xl rounded-2xl flex items-center justify-center gap-2 shadow-lg btn-kid active:scale-95 transition-all"
          >
            <span>Lanjut</span>
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};
