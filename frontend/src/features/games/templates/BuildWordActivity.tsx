import React, { useState } from 'react';
import { useAudio } from '../../../context/AudioContext';
import { MiloCat } from '../../../components/mascot/MiloCat';
import { AudioNarratorBubble } from '../../../components/common/AudioNarratorBubble';
import { GameAssetIcon } from '../../../components/common/GameAssetIcon';
import { RotateCcw } from 'lucide-react';

interface BuildWordProps {
  level: any;
  onComplete: (stats: { correct: number; wrong: number; score: number }) => void;
  avatarCat?: string;
}

export const BuildWordActivity: React.FC<BuildWordProps> = ({
  level,
  onComplete,
  avatarCat,
}) => {
  const { playPop, playCorrect, playTryAgain, speak, playMeow } = useAudio();
  const questions = level.itemsJson?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedSyllables, setPlacedSyllables] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [miloMood, setMiloMood] = useState<'idle' | 'happy' | 'cheering' | 'thinking'>('idle');

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const targetSyllables: string[] = currentQ.syllables || [];

  const handleSyllableTap = (syllable: string) => {
    playPop();
    if (placedSyllables.length >= targetSyllables.length) return;

    const nextPlaced = [...placedSyllables, syllable];
    setPlacedSyllables(nextPlaced);

    // If all slots are filled, check if correct
    if (nextPlaced.length === targetSyllables.length) {
      const isWordCorrect = nextPlaced.every((s, i) => s === targetSyllables[i]);

      if (isWordCorrect) {
        setMiloMood('cheering');
        playCorrect();
        speak(`Pintar sekali! ${currentQ.word}!`);

        const nextCorrect = correctCount + 1;
        setCorrectCount(nextCorrect);

        setTimeout(() => {
          setPlacedSyllables([]);
          setMiloMood('idle');

          if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
          } else {
            onComplete({
              correct: nextCorrect,
              wrong: wrongCount,
              score: Math.round((nextCorrect / questions.length) * 100),
            });
          }
        }, 1600);
      } else {
        setMiloMood('thinking');
        playTryAgain();
        speak('Belum pas, ayo coba susun lagi!');
        setWrongCount((prev) => prev + 1);

        setTimeout(() => {
          setPlacedSyllables([]);
          setMiloMood('idle');
        }, 1000);
      }
    }
  };

  const handleResetSlots = () => {
    playPop();
    setPlacedSyllables([]);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[70vh] max-w-4xl mx-auto p-4">
      {/* Progress */}
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Kata {currentIndex + 1} dari {questions.length}
        </span>
        <div className="flex gap-1.5">
          {questions.map((_: any, idx: number) => (
            <div
              key={idx}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-amber-500'
                  : idx < currentIndex
                  ? 'w-4 bg-emerald-400'
                  : 'w-4 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mascot & Prompt */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center my-2">
        <MiloCat
          mood={miloMood}
          size="lg"
          avatarCat={avatarCat}
          onClick={() => {
            playMeow();
            speak(currentQ.prompt || `Ayo susun kata ${currentQ.word}!`);
          }}
        />

        <div className="w-full sm:max-w-md">
          <AudioNarratorBubble
            text={currentQ.prompt || `Ayo susun suku kata menjadi kata: ${currentQ.word}!`}
          />
        </div>
      </div>

      {/* Visual Target Word Card */}
      <div className="bg-white border-4 border-amber-300 rounded-3xl p-4 shadow-md flex items-center gap-4 my-3">
        <GameAssetIcon nameOrEmoji={currentQ.icon || currentQ.word} size="lg" />
        <div>
          <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider">
            Petunjuk Gambar
          </span>
          <p className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide">
            {currentQ.hint || currentQ.word}
          </p>
        </div>
      </div>

      {/* Word Slots */}
      <div className="flex items-center gap-3 md:gap-4 my-4">
        {targetSyllables.map((_, idx) => {
          const filled = placedSyllables[idx];
          return (
            <div
              key={idx}
              className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl border-4 flex flex-col items-center justify-center font-black text-3xl md:text-4xl transition-all shadow-inner ${
                filled
                  ? 'bg-amber-100 border-amber-500 text-amber-900 scale-105 shadow-md'
                  : 'bg-slate-50 border-dashed border-amber-300 text-slate-300'
              }`}
            >
              {filled ? (
                <span>{filled}</span>
              ) : (
                <span className="text-amber-200 text-2xl select-none">🐾</span>
              )}
            </div>
          );
        })}

        {placedSyllables.length > 0 && (
          <button
            onClick={handleResetSlots}
            title="Ulangi susunan"
            className="w-12 h-12 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center active:scale-95 transition-all shadow-sm"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Syllable Options Bank */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-5 my-6 max-w-xl">
        {currentQ.options?.map((syllable: string, idx: number) => {
          const isUsed = placedSyllables.includes(syllable);
          return (
            <button
              key={idx}
              disabled={isUsed}
              onClick={() => handleSyllableTap(syllable)}
              className={`min-w-[90px] md:min-w-[120px] py-4 px-6 rounded-3xl font-black text-2xl md:text-4xl border-4 transition-all btn-kid ${
                isUsed
                  ? 'opacity-30 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white hover:bg-amber-50 border-amber-300 hover:border-amber-400 text-slate-800 shadow-lg active:scale-95'
              }`}
            >
              {syllable}
            </button>
          );
        })}
      </div>
    </div>
  );
};
