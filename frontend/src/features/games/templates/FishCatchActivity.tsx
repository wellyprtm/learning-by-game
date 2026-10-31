import React, { useEffect, useState } from 'react';
import { useAudio } from '../../../context/AudioContext';
import { MiloCat } from '../../../components/mascot/MiloCat';
import { AudioNarratorBubble } from '../../../components/common/AudioNarratorBubble';

interface FishCatchProps {
  level: any;
  onComplete: (stats: { correct: number; wrong: number; score: number }) => void;
  avatarCat?: string;
}

interface FishItem {
  id: number;
  emoji: string;
  type: string;
  top: number;
  left: number;
  speed: number;
  direction: 1 | -1;
}

export const FishCatchActivity: React.FC<FishCatchProps> = ({
  level,
  onComplete,
  avatarCat,
}) => {
  const { playPop, playCorrect, playTryAgain, speak, playMeow } = useAudio();
  const rounds = level.itemsJson?.rounds || [
    { targetColor: 'merah', targetEmoji: '🐟', label: 'Ikan Merah', count: 3, prompt: 'Milo ingin 3 Ikan Merah yang manis!' },
    { targetColor: 'emas', targetEmoji: '🐠', label: 'Ikan Emas', count: 4, prompt: 'Bagus! Sekarang tangkap 4 Ikan Emas!' },
  ];

  const [roundIdx, setRoundIdx] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [fishes, setFishes] = useState<FishItem[]>([]);
  const [miloMood, setMiloMood] = useState<'idle' | 'happy' | 'cheering' | 'eating'>('idle');

  const currentRound = rounds[roundIdx] || rounds[0];

  // Spawn swimming fishes
  useEffect(() => {
    const spawned: FishItem[] = [];
    const fishTypes = [
      { emoji: '🐟', type: 'merah' },
      { emoji: '🐠', type: 'emas' },
      { emoji: '🐡', type: 'biru' },
    ];

    for (let i = 0; i < 8; i++) {
      const randomType = fishTypes[Math.floor(Math.random() * fishTypes.length)];
      spawned.push({
        id: i,
        emoji: randomType.emoji,
        type: randomType.type,
        top: 15 + Math.random() * 65,
        left: 5 + Math.random() * 85,
        speed: 0.4 + Math.random() * 0.5,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }
    setFishes(spawned);
  }, [roundIdx]);

  // Fish swimming movement ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setFishes((prev) =>
        prev.map((fish) => {
          let newLeft = fish.left + fish.speed * fish.direction;
          let newDir = fish.direction;
          if (newLeft > 88) {
            newLeft = 88;
            newDir = -1;
          } else if (newLeft < 4) {
            newLeft = 4;
            newDir = 1;
          }
          return { ...fish, left: newLeft, direction: newDir };
        })
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleCatchFish = (fish: FishItem) => {
    playPop();

    if (fish.type === currentRound.targetColor) {
      setMiloMood('eating');
      playMeow();
      const nextCount = caughtCount + 1;
      setCaughtCount(nextCount);

      // Remove caught fish and replace
      setFishes((prev) =>
        prev.map((f) =>
          f.id === fish.id
            ? { ...f, left: Math.random() * 80, top: 15 + Math.random() * 65 }
            : f
        )
      );

      if (nextCount >= currentRound.count) {
        setMiloMood('cheering');
        playCorrect();
        speak('Hebat sekali! Ikan berhasil ditangkap semua!');

        setTimeout(() => {
          setCaughtCount(0);
          setMiloMood('idle');

          if (roundIdx + 1 < rounds.length) {
            setRoundIdx(roundIdx + 1);
          } else {
            onComplete({ correct: 3, wrong: 0, score: 100 });
          }
        }, 1500);
      }
    } else {
      setMiloMood('idle');
      playTryAgain();
      speak(`Bukan yang ini, cari yang ${currentRound.label} ya!`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[70vh] max-w-4xl mx-auto p-4">
      {/* Progress & Target Score */}
      <div className="w-full max-w-md flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Ronde {roundIdx + 1} dari {rounds.length}
        </span>
        <div className="flex items-center gap-2 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          <span className="text-emerald-800 font-black text-sm">
            Ikan Tertangkap: {caughtCount} / {currentRound.count}
          </span>
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
            speak(currentRound.prompt);
          }}
        />

        <div className="w-full sm:max-w-md">
          <AudioNarratorBubble text={currentRound.prompt} />
        </div>
      </div>

      {/* Interactive Water Pond */}
      <div className="relative w-full max-w-3xl h-[360px] bg-gradient-to-b from-sky-200 to-blue-400 rounded-3xl border-6 border-sky-300 shadow-xl overflow-hidden my-4 select-none">
        {/* Water wave decoration */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-blue-500/20 rounded-t-3xl backdrop-blur-2xs pointer-events-none" />

        {/* Swimming fishes */}
        {fishes.map((fish) => (
          <button
            key={fish.id}
            onClick={() => handleCatchFish(fish)}
            style={{
              top: `${fish.top}%`,
              left: `${fish.left}%`,
              transform: `scaleX(${fish.direction})`,
            }}
            className="absolute p-2 cursor-pointer transition-transform duration-75 active:scale-125 focus:outline-none"
          >
            <span className="text-5xl md:text-6xl drop-shadow-md select-none inline-block">
              {fish.emoji}
            </span>
          </button>
        ))}

        {/* Bottom Sea floor rocks & weeds */}
        <div className="absolute bottom-2 left-6 text-2xl opacity-60">🌿</div>
        <div className="absolute bottom-2 right-10 text-2xl opacity-60">🪨</div>
        <div className="absolute bottom-4 left-1/3 text-2xl opacity-60">🪸</div>
      </div>

      <p className="text-slate-600 font-bold text-center text-sm md:text-base">
        Ketuk ikan yang sesuai permintaan Milo di kolam renang!
      </p>
    </div>
  );
};
