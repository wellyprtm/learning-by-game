import React, { useState } from 'react';
import { useAudio } from '../../../context/AudioContext';
import { MiloCat } from '../../../components/mascot/MiloCat';
import { AudioNarratorBubble } from '../../../components/common/AudioNarratorBubble';
import { GameAssetIcon } from '../../../components/common/GameAssetIcon';

interface CountTapProps {
  level: any;
  onComplete: (stats: { correct: number; wrong: number; score: number }) => void;
  avatarCat?: string;
}

export const CountTapActivity: React.FC<CountTapProps> = ({
  level,
  onComplete,
  avatarCat,
}) => {
  const { playPop, playCorrect, playTryAgain, speak, playMeow } = useAudio();
  const questions = level.itemsJson?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [miloMood, setMiloMood] = useState<'idle' | 'happy' | 'cheering' | 'thinking'>('idle');
  const [selectedCorrect, setSelectedCorrect] = useState<number | null>(null);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const targetCount: number = currentQ.targetCount || 1;
  const itemsArray = Array.from({ length: targetCount }, (_, i) => i);

  const numberWords: Record<number, string> = {
    1: 'Satu',
    2: 'Dua',
    3: 'Tiga',
    4: 'Empat',
    5: 'Lima',
    6: 'Enam',
    7: 'Tujuh',
    8: 'Delapan',
    9: 'Sembilan',
    10: 'Sepuluh',
  };

  const handleItemTap = (idx: number) => {
    if (tappedIndices.includes(idx)) return;

    playPop();
    const nextTapped = [...tappedIndices, idx];
    setTappedIndices(nextTapped);

    // Speak count
    const countNumber = nextTapped.length;
    speak(numberWords[countNumber] || String(countNumber));

    if (nextTapped.length === targetCount) {
      setMiloMood('happy');
    }
  };

  const handleAnswerPick = (answer: number) => {
    playPop();
    if (answer === targetCount) {
      setSelectedCorrect(answer);
      setMiloMood('cheering');
      playCorrect();
      speak(`Benar sekali! Ada ${targetCount} ${currentQ.audioText || ''}!`);

      const nextCorrect = correctCount + 1;
      setCorrectCount(nextCorrect);

      setTimeout(() => {
        setSelectedCorrect(null);
        setTappedIndices([]);
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
      }, 1400);
    } else {
      setMiloMood('thinking');
      playTryAgain();
      speak('Coba hitung lagi bersama-sama ya!');
      setWrongCount((prev) => prev + 1);

      setTimeout(() => {
        setMiloMood('idle');
      }, 800);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[70vh] max-w-4xl mx-auto p-4">
      {/* Progress */}
      <div className="w-full max-w-md flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Hitung {currentIndex + 1} dari {questions.length}
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
            speak(currentQ.prompt || 'Ketuk benda untuk menghitung!');
          }}
        />

        <div className="w-full sm:max-w-md">
          <AudioNarratorBubble
            text={currentQ.prompt || `Ada berapa benda di layar? Sentuh dan hitung yuk!`}
          />
        </div>
      </div>

      {/* Interactive Counting Playground */}
      <div className="w-full max-w-2xl bg-white border-4 border-amber-300 rounded-3xl p-6 shadow-md min-h-[170px] flex flex-wrap items-center justify-center gap-4 md:gap-6 my-4">
        {itemsArray.map((itemIdx) => {
          const isTapped = tappedIndices.includes(itemIdx);
          const tapOrder = tappedIndices.indexOf(itemIdx) + 1;

          return (
            <button
              key={itemIdx}
              onClick={() => handleItemTap(itemIdx)}
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center transition-all transform active:scale-90 select-none ${
                isTapped
                  ? 'bg-amber-100 border-4 border-amber-400 scale-105 shadow-md'
                  : 'bg-slate-50 border-2 border-slate-200 hover:scale-105 shadow-sm cursor-pointer'
              }`}
            >
              <GameAssetIcon nameOrEmoji={currentQ.itemEmoji || currentQ.audioText || 'apel'} size="lg" />

              {isTapped && (
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-md animate-pop-in">
                  {tapOrder}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Number Answer Buttons */}
      <div className="w-full max-w-md my-4">
        <p className="text-center font-bold text-slate-600 mb-2 text-sm md:text-base">
          Pilih angka yang sesuai jumlah benda di atas:
        </p>

        <div className="flex justify-center gap-4">
          {currentQ.options?.map((num: number, idx: number) => {
            const isThisCorrect = selectedCorrect === num;
            return (
              <button
                key={idx}
                disabled={selectedCorrect !== null}
                onClick={() => handleAnswerPick(num)}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl font-black text-3xl md:text-4xl border-4 transition-all btn-kid flex items-center justify-center ${
                  isThisCorrect
                    ? 'bg-emerald-400 border-emerald-600 text-white scale-110 shadow-xl'
                    : 'bg-white hover:bg-amber-50 border-amber-300 text-slate-800 shadow-md active:scale-95'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
