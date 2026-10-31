import React, { useState } from 'react';
import { useAudio } from '../../../context/AudioContext';
import { MiloCat } from '../../../components/mascot/MiloCat';
import { AudioNarratorBubble } from '../../../components/common/AudioNarratorBubble';
import { GameAssetIcon } from '../../../components/common/GameAssetIcon';

interface FeedMascotProps {
  level: any;
  onComplete: (stats: { correct: number; wrong: number; score: number }) => void;
  avatarCat?: string;
}

export const FeedMascotActivity: React.FC<FeedMascotProps> = ({
  level,
  onComplete,
  avatarCat,
}) => {
  const { playPop, playCorrect, playTryAgain, speak, playMeow } = useAudio();
  const questions = level.itemsJson?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [miloMood, setMiloMood] = useState<'idle' | 'happy' | 'cheering' | 'thinking' | 'eating'>('idle');
  const [selectedCorrect, setSelectedCorrect] = useState<number | null>(null);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const numA = currentQ.numA ?? currentQ.targetCount ?? 2;
  const numB = currentQ.numB ?? 1;
  const isSubtraction = currentQ.operation === '-';
  const expectedResult = currentQ.result ?? currentQ.targetCount ?? (isSubtraction ? numA - numB : numA + numB);
  const emoji = currentQ.itemEmoji || 'ikan';

  const handleFeed = (chosenNumber: number) => {
    playPop();
    if (chosenNumber === expectedResult) {
      setSelectedCorrect(chosenNumber);
      setMiloMood('eating');
      playCorrect();
      speak(`Nyam nyam nyam! Lezat sekali! Jawabannya ${expectedResult}!`);

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
      }, 1600);
    } else {
      setMiloMood('thinking');
      playTryAgain();
      speak('Milo masih lapar, ayo hitung lagi!');
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
          Tantangan {currentIndex + 1} dari {questions.length}
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
            speak(currentQ.prompt || 'Bantu Milo menghitung makanannya ya!');
          }}
        />

        <div className="w-full sm:max-w-md">
          <AudioNarratorBubble
            text={currentQ.prompt || `Beri makan Milo dengan jumlah makanan yang pas!`}
          />
        </div>
      </div>

      {/* Visual Food Plates (Addition / Subtraction Equation) */}
      <div className="w-full max-w-2xl bg-white border-4 border-amber-300 rounded-3xl p-5 shadow-md flex items-center justify-around my-4">
        {/* Plate A */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-50 border-4 border-amber-200 rounded-full flex flex-wrap items-center justify-center p-2 shadow-inner gap-1">
            {Array.from({ length: numA }).map((_, i) => (
              <GameAssetIcon key={i} nameOrEmoji={emoji} size="sm" />
            ))}
          </div>
          <span className="mt-2 font-black text-2xl text-slate-700">{numA}</span>
        </div>

        {/* Math Operator (+ or -) */}
        <div className="text-4xl md:text-5xl font-black text-amber-500">
          {isSubtraction ? '➖' : '➕'}
        </div>

        {/* Plate B */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-50 border-4 border-amber-200 rounded-full flex flex-wrap items-center justify-center p-2 shadow-inner gap-1">
            {Array.from({ length: numB }).map((_, i) => (
              <div
                key={i}
                className={isSubtraction ? 'opacity-30 grayscale' : 'animate-float'}
              >
                <GameAssetIcon nameOrEmoji={emoji} size="sm" />
              </div>
            ))}
          </div>
          <span className="mt-2 font-black text-2xl text-slate-700">{numB}</span>
        </div>

        {/* Equals */}
        <div className="text-4xl md:text-5xl font-black text-amber-500">🟰</div>

        {/* Result Plate */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-50 border-4 border-dashed border-emerald-300 rounded-full flex items-center justify-center shadow-inner">
            {selectedCorrect !== null ? (
              <span className="font-black text-3xl md:text-4xl text-emerald-600 animate-pop-in">
                {selectedCorrect}
              </span>
            ) : (
              <span className="text-emerald-300 text-3xl">🥣</span>
            )}
          </div>
          <span className="mt-2 text-xs font-bold text-slate-400">Piring Milo</span>
        </div>
      </div>

      {/* Number Choices to Feed Milo */}
      <div className="w-full max-w-md my-4">
        <p className="text-center font-bold text-slate-600 mb-2 text-sm md:text-base">
          Sentuh angka untuk menyajikan ke Milo:
        </p>

        <div className="flex justify-center gap-4">
          {currentQ.options?.map((optionNum: number, idx: number) => {
            const isThisCorrect = selectedCorrect === optionNum;
            return (
              <button
                key={idx}
                disabled={selectedCorrect !== null}
                onClick={() => handleFeed(optionNum)}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl font-black text-3xl md:text-4xl border-4 transition-all btn-kid flex items-center justify-center ${
                  isThisCorrect
                    ? 'bg-emerald-400 border-emerald-600 text-white scale-110 shadow-xl'
                    : 'bg-white hover:bg-amber-50 border-amber-300 text-slate-800 shadow-md active:scale-95'
                }`}
              >
                {optionNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
