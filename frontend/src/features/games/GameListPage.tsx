import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles, Fish, Play, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import type { Game } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { MiloCat } from '../../components/mascot/MiloCat';
import { AudioNarratorBubble } from '../../components/common/AudioNarratorBubble';

interface GameListPageProps {
  onSelectGame: (gameId: string) => void;
  onOpenDashboard: () => void;
}

export const GameListPage: React.FC<GameListPageProps> = ({
  onSelectGame,
  onOpenDashboard,
}) => {
  const { activeChild } = useAuth();
  const { playPop, speak, playMeow } = useAudio();
  const [games, setGames] = useState<Game[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api
      .listGames()
      .then((data) => {
        if (isMounted) {
          setGames(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setLoading(false);
      });

    if (activeChild) {
      api.getRewards(activeChild.id).then((r) => {
        if (isMounted) setRewards(r || []);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [activeChild]);

  const getGameIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-amber-500" />;
      case 'Sparkles':
        return <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />;
      case 'Fish':
        return <Fish className="w-10 h-10 md:w-12 md:h-12 text-pink-500" />;
      default:
        return <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Friendly Mascot Welcome Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <MiloCat
          mood="happy"
          size="lg"
          avatarCat={activeChild?.avatarCat}
          onClick={() => {
            playMeow();
            speak(
              activeChild
                ? `Halo ${activeChild.name}! Mau main apa hari ini bersama Milo?`
                : 'Halo teman kecil! Pilih game kesukaanmu yuk!'
            );
          }}
        />

        <div className="w-full sm:max-w-md">
          <AudioNarratorBubble
            text={
              activeChild
                ? `Halo ${activeChild.name}! Ayo pilih pulau petualangan yang ingin kamu jelajahi bersama Milo!`
                : 'Pilih permainan yang kamu suka dan kumpulkan semua bintang emasnya!'
            }
          />
        </div>
      </div>

      {/* Game Catalog Grid */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <span>🏝️</span>
          <span>Pilih Pulau Permainan</span>
        </h2>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => {
                  playPop();
                  onSelectGame(game.id);
                }}
                className="bg-white rounded-3xl border-4 border-amber-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between btn-card group"
              >
                {/* Header card with game banner */}
                <div className={`p-6 bg-gradient-to-r ${game.themeColor} text-white relative`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
                    {getGameIcon(game.icon)}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight drop-shadow-xs">
                    {game.title}
                  </h3>
                  <p className="text-xs text-white/90 font-bold mt-1 line-clamp-1">
                    {game.subtitle}
                  </p>
                </div>

                {/* Description & Action */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-sm font-semibold text-slate-600 mb-4 leading-relaxed">
                    {game.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t-2 border-slate-100">
                    <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                      Usia {game.minAge}-{game.maxAge} Tahun
                    </span>

                    <button className="flex items-center gap-1 bg-amber-500 group-hover:bg-amber-600 text-white font-extrabold px-4 py-2 rounded-2xl text-sm shadow-md transition-colors">
                      <Play className="w-4 h-4 fill-white" />
                      <span>Mulai</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rewards / Sticker Showcase Bar */}
      {rewards.length > 0 && (
        <div className="bg-white border-4 border-purple-200 rounded-3xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              🏆
            </div>
            <div>
              <h4 className="font-black text-lg text-purple-900">
                Koleksi Stiker & Hadiah {activeChild?.name}
              </h4>
              <p className="text-xs font-bold text-slate-500">
                Sudah mengumpulkan {rewards.length} lencana penghargaan petualangan!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            {rewards.slice(0, 5).map((r) => (
              <div
                key={r.id}
                title={r.name}
                className="w-12 h-12 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-center justify-center text-2xl shadow-xs animate-pop-in"
              >
                {r.icon}
              </div>
            ))}

            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-1 text-purple-700 font-extrabold text-sm ml-2 hover:underline"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
