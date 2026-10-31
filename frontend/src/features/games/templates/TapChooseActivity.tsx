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

      {/* Question Visual & Learning Card */}
      {(() => {
        const syllableFormulaMatch = currentQ.hint?.match(/^([A-Z])\s+bertemu\s+([A-Z])\s+dibaca\s+([a-zA-Z]+)!?$/i);

        if (syllableFormulaMatch) {
          return (
            <div className="w-full max-w-xl mx-auto my-3 bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 border-3 border-amber-300 rounded-3xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Rumus Penggabungan: C + O -> co */}
              <div className="flex flex-col items-center sm:items-start gap-1.5">
                <span className="text-[11px] uppercase font-black tracking-wider text-amber-800 bg-amber-200/90 px-3 py-0.5 rounded-full">
                  ✨ Rumus Suku Kata
                </span>
                <div className="flex items-center gap-2 sm:gap-2.5 bg-white px-3.5 py-2 rounded-2xl border-2 border-amber-200 shadow-sm">
                  <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500 text-white font-black text-xl sm:text-2xl flex items-center justify-center shadow">
                    {syllableFormulaMatch[1].toUpperCase()}
                  </span>
                  <span className="text-amber-700 font-black text-lg sm:text-xl">+</span>
                  <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-500 text-white font-black text-xl sm:text-2xl flex items-center justify-center shadow">
                    {syllableFormulaMatch[2].toUpperCase()}
                  </span>
                  <span className="text-amber-700 font-black text-lg sm:text-xl">➔</span>
                  <span className="px-3.5 py-1 rounded-xl bg-emerald-500 text-white font-black text-xl sm:text-2xl flex items-center justify-center shadow-md animate-pulse">
                    {syllableFormulaMatch[3].toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Contoh Kata Bergambar (misal Cokelat) */}
              {currentQ.icon && (
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border-2 border-amber-200 shadow-sm">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <GameAssetIcon nameOrEmoji={currentQ.icon} size="md" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-black text-amber-600 tracking-wider">
                      Contoh Kata
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-800 capitalize">
                      {currentQ.icon}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        }

        if (currentQ.itemEmoji && currentQ.targetCount) {
          return (
            <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-white/90 rounded-3xl border-3 border-amber-300 my-3 shadow-md max-w-xl mx-auto">
              {Array.from({ length: currentQ.targetCount }).map((_, i) => (
                <div key={i} className="transform transition hover:scale-110">
                  <GameAssetIcon nameOrEmoji={currentQ.itemEmoji} size="lg" />
                </div>
              ))}
            </div>
          );
        }

        if (currentQ.hint || currentQ.icon) {
          return (
            <div className="w-full max-w-xl mx-auto my-3 bg-gradient-to-r from-amber-50 via-white to-amber-50 border-3 border-amber-300 rounded-3xl p-3.5 shadow-md flex items-center justify-center gap-4">
              {currentQ.icon && (
                <div className="flex items-center gap-2.5 bg-amber-100/90 border border-amber-300 px-3.5 py-1.5 rounded-2xl flex-shrink-0 shadow-sm">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <GameAssetIcon nameOrEmoji={currentQ.icon} size="sm" />
                  </div>
                  <span className="text-sm sm:text-base font-black text-amber-950 capitalize">
                    {currentQ.icon}
                  </span>
                </div>
              )}
              {currentQ.hint && (
                <div className="flex items-center gap-2 text-left">
                  <span className="text-amber-950 font-black text-base sm:text-lg">
                    💡 {currentQ.hint}
                  </span>
                </div>
              )}
            </div>
          );
        }

        return null;
      })()}

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
