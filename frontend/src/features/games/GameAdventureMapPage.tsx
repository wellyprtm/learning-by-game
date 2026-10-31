import React, { useEffect, useState } from 'react';
import { ArrowLeft, Lock, Star, Play } from 'lucide-react';
import { api } from '../../services/api';
import type { Game, GameLevel } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { MiloCat } from '../../components/mascot/MiloCat';

interface GameAdventureMapPageProps {
  gameId: string;
  onSelectLevel: (levelId: string) => void;
  onBack: () => void;
}

export const GameAdventureMapPage: React.FC<GameAdventureMapPageProps> = ({
  gameId,
  onSelectLevel,
  onBack,
}) => {
  const { activeChild } = useAuth();
  const { playPop, speak } = useAudio();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api
      .getGameWithLevels(gameId, activeChild?.id)
      .then((data) => {
        if (isMounted) {
          setGame(data);
          setLoading(false);
          // Greet on entry
          speak(`Selamat datang di ${data.title}! Ayo kita berpetualang!`);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [gameId, activeChild]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xl font-black text-amber-700">Membuka peta pulau ajaib...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="text-center p-8">
        <p className="text-xl font-bold">Game tidak ditemukan.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 bg-amber-500 text-white rounded-2xl font-bold"
        >
          Kembali
        </button>
      </div>
    );
  }

  const levels = game.levels || [];
  // Find current active level (first unlocked level that is not yet completed, or level 1)
  const currentActiveLevel = levels.find((l) => l.isUnlocked && !l.isCompleted) || levels[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            playPop();
            onBack();
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-slate-200 hover:border-amber-400 rounded-2xl text-slate-700 font-extrabold text-sm md:text-base shadow-xs active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-amber-600" />
          <span>Pilih Game Lain</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-black uppercase text-amber-700 tracking-wider">
            Petualangan
          </span>
          <h1 className="text-xl md:text-2xl font-black text-slate-800">{game.title}</h1>
        </div>
      </div>

      {/* Island Banner with Milo */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 mb-8 text-white shadow-lg bg-gradient-to-r ${game.themeColor}`}
      >
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-black mb-1 drop-shadow-xs">{game.subtitle}</h2>
          <p className="text-white/90 text-sm md:text-base font-bold drop-shadow-xs">
            {game.description}
          </p>
        </div>

        <div className="absolute -bottom-4 right-4 pointer-events-none">
          <MiloCat mood="happy" size="lg" avatarCat={activeChild?.avatarCat} />
        </div>
      </div>

      {/* Adventure Trail Path */}
      <div className="relative py-6 max-w-xl mx-auto">
        <h3 className="text-center font-black text-xl text-slate-700 mb-8">
          🐾 Jalur Stasiun Petualangan Milo
        </h3>

        <div className="flex flex-col items-center gap-8 relative">
          {levels.map((lvl: GameLevel, index: number) => {
            const isUnlocked = lvl.isUnlocked;
            const isCurrent = currentActiveLevel?.id === lvl.id;
            // Alternating zigzag offset for trail map aesthetic
            const offsetClass =
              index % 2 === 0 ? 'sm:-translate-x-16' : 'sm:translate-x-16';

            return (
              <div
                key={lvl.id}
                className={`flex items-center gap-4 transition-all duration-300 ${offsetClass}`}
              >
                {/* Station Node Button */}
                <div className="relative">
                  {/* Milo Standing on Current Station */}
                  {isCurrent && (
                    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none animate-float">
                      <MiloCat
                        mood="happy"
                        size="sm"
                        avatarCat={activeChild?.avatarCat}
                        className="w-14 h-14"
                      />
                    </div>
                  )}

                  <button
                    disabled={!isUnlocked}
                    onClick={() => {
                      playPop();
                      speak(`Membuka level ${lvl.title}!`);
                      onSelectLevel(lvl.id);
                    }}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl border-4 flex flex-col items-center justify-center font-black transition-all transform shadow-lg relative ${
                      isCurrent
                        ? 'bg-amber-400 border-white text-white ring-4 ring-amber-400/60 scale-110 animate-bounce'
                        : isUnlocked
                        ? lvl.isCompleted
                          ? 'bg-emerald-400 border-white text-white active:scale-95'
                          : 'bg-white border-amber-300 text-slate-800 hover:border-amber-400 active:scale-95'
                        : 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-75'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <span className="text-xl md:text-2xl font-black">{lvl.levelCode}</span>
                        {lvl.isCompleted ? (
                          <div className="flex text-yellow-300 mt-0.5">
                            {Array.from({ length: lvl.stars || 1 }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-yellow-300" />
                            ))}
                          </div>
                        ) : (
                          <Play className="w-5 h-5 text-amber-600 fill-amber-500 mt-1" />
                        )}
                      </>
                    ) : (
                      <Lock className="w-7 h-7 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Level Title Label */}
                <div
                  className={`bg-white border-2 rounded-2xl p-3 shadow-xs max-w-[200px] md:max-w-[240px] ${
                    isUnlocked
                      ? 'border-amber-300 text-slate-800'
                      : 'border-slate-200 text-slate-400'
                  }`}
                >
                  <p className="font-black text-sm md:text-base leading-tight">{lvl.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {lvl.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
