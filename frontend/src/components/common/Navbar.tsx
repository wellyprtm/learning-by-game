import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { MiloCat } from '../mascot/MiloCat';
import { PinModal } from './PinModal';

interface NavbarProps {
  currentView: 'games' | 'map' | 'play' | 'dashboard' | 'profile';
  onNavigate: (view: 'games' | 'dashboard' | 'profile') => void;
  totalStars?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, totalStars = 0 }) => {
  const { activeChild, logout } = useAuth();
  const { isMuted, toggleMute, playPop } = useAudio();
  const [pinTarget, setPinTarget] = useState<'dashboard' | 'profile' | null>(null);

  const handleProtectedNav = (target: 'dashboard' | 'profile') => {
    playPop();
    setPinTarget(target);
  };

  const handlePinSuccess = () => {
    if (pinTarget) {
      onNavigate(pinTarget);
      setPinTarget(null);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-amber-200 px-4 py-2.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Brand & Child Identity */}
          <div
            onClick={() => {
              playPop();
              onNavigate('games');
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-2xl p-1 border-2 border-amber-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <MiloCat mood="idle" size="sm" avatarCat={activeChild?.avatarCat} className="w-10 h-10" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl md:text-2xl font-black text-amber-600 tracking-tight">
                  Milo
                </span>
                <span className="hidden sm:inline-block text-xs bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                  Petualangan
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 truncate max-w-[120px] sm:max-w-[200px]">
                {activeChild ? `Halo, ${activeChild.name}! 🐾` : 'Belajar Ceria'}
              </p>
            </div>
          </div>

          {/* Quick Stats: Stars & Nav Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Stars Counter */}
            <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-300 px-3 py-1.5 rounded-2xl shadow-xs">
              <span className="text-xl">⭐</span>
              <span className="font-black text-amber-700 text-lg md:text-xl">{totalStars}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                playPop();
                toggleMute();
              }}
              title={isMuted ? 'Suara Mati' : 'Suara Aktif'}
              className={`p-2.5 rounded-2xl border-2 transition-all ${
                isMuted
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-600 hover:bg-emerald-100'
              }`}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>

            {/* Parent Zone: Dashboard */}
            <button
              onClick={() => handleProtectedNav('dashboard')}
              title="Dashboard Orang Tua"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-extrabold text-sm border-2 transition-all shadow-xs ${
                currentView === 'dashboard'
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <Shield className="w-5 h-5 text-blue-500 fill-blue-100" />
              <span className="hidden md:inline">Dashboard</span>
            </button>

            {/* Profile Settings */}
            <button
              onClick={() => handleProtectedNav('profile')}
              title="Pengaturan Profil"
              className={`p-2 rounded-2xl border-2 transition-all shadow-xs ${
                currentView === 'profile'
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
              }`}
            >
              <Settings className="w-5 h-5 text-purple-600" />
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                playPop();
                if (window.confirm('Yakin ingin keluar dari akun Orang Tua?')) {
                  logout();
                }
              }}
              title="Keluar"
              className="p-2 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border-2 border-transparent hover:border-rose-200 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Security Gate PIN Modal */}
      <PinModal
        isOpen={pinTarget !== null}
        onSuccess={handlePinSuccess}
        onClose={() => setPinTarget(null)}
        title={pinTarget === 'dashboard' ? 'Buka Dashboard Progres' : 'Buka Pengaturan Profil'}
      />
    </>
  );
};
