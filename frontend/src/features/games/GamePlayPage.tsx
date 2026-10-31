import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';
import type { GameLevel } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { CelebrationModal } from '../../components/common/CelebrationModal';
import { TapChooseActivity } from './templates/TapChooseActivity';
import { BuildWordActivity } from './templates/BuildWordActivity';
import { CountTapActivity } from './templates/CountTapActivity';
import { FeedMascotActivity } from './templates/FeedMascotActivity';
import { FishCatchActivity } from './templates/FishCatchActivity';

interface GamePlayPageProps {
  levelId: string;
  gameId: string;
  onBack: () => void;
  onNextLevel?: () => void;
  onRefreshData?: () => void;
}

export const GamePlayPage: React.FC<GamePlayPageProps> = ({
  levelId,
  gameId,
  onBack,
  onNextLevel,
  onRefreshData,
}) => {
  const { activeChild } = useAuth();
  const { playPop } = useAudio();

  const [level, setLevel] = useState<GameLevel | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState<number>(Date.now());
  const [celebration, setCelebration] = useState<{
    isOpen: boolean;
    stars: number;
  }>({ isOpen: false, stars: 0 });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api
      .getLevelDetail(levelId)
      .then((data) => {
        if (isMounted) {
          setLevel(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [levelId]);

  const handleComplete = async (stats: { correct: number; wrong: number; score: number }) => {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const score = stats.score;
    const stars = score >= 85 ? 3 : score >= 60 ? 2 : 1;

    // Save progress to PostgreSQL backend
    if (activeChild) {
      try {
        await api.saveProgress({
          childId: activeChild.id,
          gameId: gameId,
          levelId: levelId,
          stars: stars,
          score: score,
          mastery: score,
          durationSeconds: elapsedSeconds,
          correctAnswers: stats.correct,
          wrongAnswers: stats.wrong,
        });
        if (onRefreshData) onRefreshData();
      } catch (e) {
        console.error('Failed to save progress:', e);
      }
    }

    setCelebration({
      isOpen: true,
      stars: stars,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xl font-black text-amber-700">Milo sedang menyiapkan permainan...</p>
      </div>
    );
  }

  if (!level) {
    return (
      <div className="text-center p-8">
        <p className="text-xl font-bold text-slate-700">Level tidak ditemukan.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 bg-amber-500 text-white rounded-2xl font-bold"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-3">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => {
            playPop();
            onBack();
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-slate-200 hover:border-amber-400 rounded-2xl text-slate-700 font-extrabold text-sm md:text-base shadow-xs active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-amber-600" />
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-black uppercase text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full">
            Level {level.levelCode}
          </span>
          <h1 className="text-lg md:text-xl font-black text-slate-800">{level.title}</h1>
        </div>

        <div className="w-24" /> {/* Placeholder for balance */}
      </div>

      {/* Activity Templates */}
      <div className="bg-amber-50/60 border-2 border-amber-200/80 rounded-3xl p-2 md:p-4 shadow-sm">
        {level.activityType === 'tap-choose' && (
          <TapChooseActivity
            level={level}
            onComplete={handleComplete}
            avatarCat={activeChild?.avatarCat}
          />
        )}

        {level.activityType === 'build-word' && (
          <BuildWordActivity
            level={level}
            onComplete={handleComplete}
            avatarCat={activeChild?.avatarCat}
          />
        )}

        {level.activityType === 'count-tap' && (
          <CountTapActivity
            level={level}
            onComplete={handleComplete}
            avatarCat={activeChild?.avatarCat}
          />
        )}

        {level.activityType === 'feed-mascot' && (
          <FeedMascotActivity
            level={level}
            onComplete={handleComplete}
            avatarCat={activeChild?.avatarCat}
          />
        )}

        {level.activityType === 'drag-drop' && (
          <FishCatchActivity
            level={level}
            onComplete={handleComplete}
            avatarCat={activeChild?.avatarCat}
          />
        )}
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={celebration.isOpen}
        stars={celebration.stars}
        levelTitle={level.title}
        avatarCat={activeChild?.avatarCat}
        onNext={() => {
          setCelebration({ isOpen: false, stars: 0 });
          if (onNextLevel) {
            onNextLevel();
          } else {
            onBack();
          }
        }}
        onReplay={() => {
          setCelebration({ isOpen: false, stars: 0 });
          // re-trigger load
          setLevel({ ...level });
        }}
      />
    </div>
  );
};
