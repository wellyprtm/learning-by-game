import React, { useState } from 'react';
import { useAudio } from '../../../context/AudioContext';
import { MiloCat } from '../../../components/mascot/MiloCat';
import { AudioNarratorBubble } from '../../../components/common/AudioNarratorBubble';
import { GameAssetIcon } from '../../../components/common/GameAssetIcon';

interface TapChooseProps {
  level: any;
  onComplete: (stats: { correct: number; wrong: number; score: number }) => void;
  avatarCat?: string;
}

export const TapChooseActivity: React.FC<TapChooseProps> = ({
  level,
  onComplete,
  avatarCat,
}) => {
  const { playPop, playCorrect, playTryAgain, speak, playMeow } = useAudio();
  const questions = level.itemsJson?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [miloMood, setMiloMood] = useState<'idle' | 'happy' | 'cheering' | 'thinking'>('idle');
  const [selectedWrong, setSelectedWrong] = useState<string | null>(null);
  const [selectedCorrect, setSelectedCorrect] = useState<string | null>(null);

  const currentQ = questions[currentIndex];

  if (!currentQ) {
    return (
      <div className="text-center p-8">
        <p className="text-xl font-bold">Memuat pertanyaan...</p>
      </div>
    );
  }

  const handleSelect = (option: string) => {
    playPop();
    const isCorrect = option === currentQ.target;

    if (isCorrect) {
      setSelectedCorrect(option);
      setMiloMood('cheering');
      playCorrect();
      speak('Hebat! Jawabanmu benar sekali!');

      const nextCorrect = correctCount + 1;
      setCorrectCount(nextCorrect);

      setTimeout(() => {
        setSelectedCorrect(null);
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
      }, 1200);
    } else {
      setSelectedWrong(option);
      setMiloMood('thinking');
      playTryAgain();
      speak('Ayo coba lagi, kamu pasti bisa!');
      setWrongCount((prev) => prev + 1);

      setTimeout(() => {
        setSelectedWrong(null);
        setMiloMood('idle');
      }, 900);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[70vh] max-w-4xl mx-auto p-4">
      {/* Progress Indicator */}
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Soal {currentIndex + 1} dari {questions.length}
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

      {/* Mascot & Speech Bubble */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center my-3">
        <MiloCat
          mood={miloMood}
          size="lg"
          avatarCat={avatarCat}
          onClick={() => {
            playMeow();
            speak(currentQ.prompt || currentQ.audioText || 'Ayo pilih yang benar!');
          }}
        />

        <div className="w-full sm:max-w-md">
          <AudioNarratorBubble
            text={currentQ.prompt || `Ayo cari huruf atau suku kata: ${currentQ.target}!`}
          />
        </div>
      </div>

      {/* Question Visual Card */}
      {currentQ.icon && (
        <div className="my-2 bg-amber-100/70 border-2 border-amber-300 px-6 py-2.5 rounded-3xl flex items-center gap-3 shadow-inner">
          <GameAssetIcon nameOrEmoji={currentQ.icon || currentQ.target} size="md" />
          {currentQ.hint && (
            <span className="text-amber-900 font-extrabold text-base md:text-lg">
              {currentQ.hint}
            </span>
          )}
        </div>
      )}

      {/* Tap Target Options */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 my-6">
        {currentQ.options?.map((opt: string, idx: number) => {
          const isThisCorrect = selectedCorrect === opt;
          const isThisWrong = selectedWrong === opt;

          return (
            <button
              key={idx}
              disabled={selectedCorrect !== null}
              onClick={() => handleSelect(opt)}
              className={`min-h-[100px] md:min-h-[120px] rounded-3xl font-black text-2xl md:text-4xl flex items-center justify-center p-4 border-4 transition-all transform active:scale-95 btn-kid ${
                isThisCorrect
                  ? 'bg-emerald-400 border-emerald-600 text-white scale-105 shadow-xl animate-glow'
                  : isThisWrong
                  ? 'bg-rose-200 border-rose-400 text-rose-800'
                  : 'bg-white hover:bg-amber-50 border-amber-300 text-slate-800 hover:border-amber-400 shadow-md'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
