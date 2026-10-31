import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Award,
  Lightbulb,
  Heart,
} from 'lucide-react';
import { api } from '../../services/api';
import type { DashboardSummary } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { MiloCat } from '../../components/mascot/MiloCat';

interface DashboardPageProps {
  onBackToGames: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onBackToGames }) => {
  const { activeChild, children, setActiveChild } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeChild) {
      setLoading(true);
      api
        .getDashboardSummary(activeChild.id)
        .then((data) => {
          setSummary(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [activeChild]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGames}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-sm shadow-md transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Mode Main</span>
          </button>

          <div>
            <span className="text-xs font-black uppercase text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">
              Parent Zone
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800">
              Dashboard Progres Belajar
            </h1>
          </div>
        </div>

        {/* Switch child profile dropdown if multiple children */}
        {children.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-500">Pilih Anak:</span>
            <select
              value={activeChild?.id}
              onChange={(e) => {
                const selected = children.find((c) => c.id === e.target.value);
                if (selected) setActiveChild(selected);
              }}
              className="bg-white border-2 border-slate-300 rounded-2xl px-3 py-1.5 font-bold text-slate-700 text-sm focus:outline-none focus:border-blue-500"
            >
              {children.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.age} tahun)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center p-16">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : summary ? (
        <div className="space-y-6">
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Stars */}
            <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                ⭐
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">Total Bintang</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  {summary.totalStars}
                </h3>
              </div>
            </div>

            {/* Levels Completed */}
            <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">Level Tuntas</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  {summary.totalLevelsPassed}
                </h3>
              </div>
            </div>

            {/* Total Play Minutes */}
            <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">Waktu Belajar</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  {summary.totalPlayMinutes} <span className="text-sm font-bold">menit</span>
                </h3>
              </div>
            </div>

            {/* Active Child Profile */}
            <div className="bg-white border-2 border-purple-200 rounded-3xl p-5 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center overflow-hidden">
                <MiloCat mood="idle" size="sm" avatarCat={summary.child.avatarCat} className="w-10 h-10" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">Profil Anak</p>
                <h3 className="text-xl font-black text-slate-800 truncate">
                  {summary.child.name}
                </h3>
                <span className="text-xs font-bold text-purple-600">{summary.child.age} Tahun</span>
              </div>
            </div>
          </div>

          {/* Mastery Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reading Track */}
            <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                  <h3 className="font-black text-lg text-slate-800">Jalur Membaca</h3>
                </div>
                <span className="text-amber-600 font-black text-lg">
                  {summary.readingMasteryPct}%
                </span>
              </div>

              <div className="w-full bg-amber-100 rounded-full h-4 overflow-hidden mb-3">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.max(5, summary.readingMasteryPct)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                Mencakup vokal dasar (a,i,u,e,o), suku kata terbuka (ba, bi, bu), kata 2 suku kata, hingga akhiran kata dan kata berakhiran -ng.
              </p>
            </div>

            {/* Counting Track */}
            <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-6 h-6 text-emerald-500" />
                  <h3 className="font-black text-lg text-slate-800">Jalur Berhitung</h3>
                </div>
                <span className="text-emerald-600 font-black text-lg">
                  {summary.countingMasteryPct}%
                </span>
              </div>

              <div className="w-full bg-emerald-100 rounded-full h-4 overflow-hidden mb-3">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.max(5, summary.countingMasteryPct)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                Mencakup pengenalan angka 1-10, perbandingan lebih banyak/sedikit, berhitung benda, dan penjumlahan & pengurangan sederhana.
              </p>
            </div>
          </div>

          {/* Sticker Album & Badges */}
          <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-xs">
            <h3 className="font-black text-xl text-slate-800 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-600" />
              <span>Album Stiker & Penghargaan yang Diraih</span>
            </h3>

            {summary.recentRewards && summary.recentRewards.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {summary.recentRewards.map((r) => (
                  <div
                    key={r.id}
                    className="bg-purple-50/60 border-2 border-purple-200 rounded-3xl p-4 text-center shadow-xs flex flex-col items-center justify-between"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm mb-2">
                      {r.icon}
                    </div>
                    <h4 className="font-black text-sm text-purple-950 mb-1">{r.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{r.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic text-center py-4">
                Belum ada stiker yang dikumpulkan. Mainkan game untuk membuka stiker pertama!
              </p>
            )}
          </div>

          {/* Activity Logs & Offline Tips (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity Log */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs">
              <h3 className="font-black text-lg text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Riwayat Sesi Belajar Terakhir</span>
              </h3>

              {summary.recentLogs && summary.recentLogs.length > 0 ? (
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {summary.recentLogs.map((log) => (
                    <div key={log.id} className="py-2.5 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-black text-slate-700 capitalize">
                          {log.gameId.replace('-', ' ')}
                        </span>
                        <p className="text-xs text-slate-400">
                          {new Date(log.playedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          • Durasi: {log.durationSeconds} detik
                        </p>
                      </div>

                      <div className="flex items-center gap-3 font-bold text-xs">
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          ✓ {log.correctAnswers} Benar
                        </span>
                        {log.wrongAnswers > 0 && (
                          <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            ↺ {log.wrongAnswers} Ulang
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic py-2">Belum ada riwayat bermain.</p>
              )}
            </div>

            {/* Offline Parent Suggestions */}
            <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 shadow-xs">
              <h3 className="font-black text-lg text-amber-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>Tips Aktivitas Nyata Bersama Anak di Rumah</span>
              </h3>

              <ul className="space-y-3">
                {summary.parentTips?.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-amber-950 font-semibold">
                    <Heart className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5 fill-rose-200" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-500 py-8">Gagal memuat ringkasan data progres.</p>
      )}
    </div>
  );
};
