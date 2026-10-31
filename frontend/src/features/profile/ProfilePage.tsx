import React, { useState } from 'react';
import { ArrowLeft, User, Shield, Plus } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { MiloCat } from '../../components/mascot/MiloCat';

interface ProfilePageProps {
  onBackToGames: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBackToGames }) => {
  const { user, activeChild, setActiveChild, refreshUser } = useAuth();
  const { playPop, playCorrect, speak } = useAudio();

  const [childName, setChildName] = useState(activeChild?.name || '');
  const [childAge, setChildAge] = useState(activeChild?.age || 5);
  const [avatarCat, setAvatarCat] = useState(activeChild?.avatarCat || 'milo-orange');

  const [parentName, setParentName] = useState(user?.fullName || '');
  const [parentPin, setParentPin] = useState(user?.parentPin || '');

  const [isSavingChild, setIsSavingChild] = useState(false);
  const [isSavingParent, setIsSavingParent] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(5);
  const [statusMsg, setStatusMsg] = useState('');

  const catOptions = [
    { id: 'milo-orange', label: 'Milo Petualang', desc: 'Kucing oranye dengan topi petualang' },
    { id: 'milo-calico', label: 'Milo Belang Tiga', desc: 'Kucing belang tiga manis' },
    { id: 'milo-white', label: 'Milo Putih Salju', desc: 'Kucing putih lembut' },
    { id: 'milo-blue-cap', label: 'Milo Topi Biru', desc: 'Kucing ceria bertopi biru' },
  ];

  const handleSaveChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChild) return;

    setIsSavingChild(true);
    setStatusMsg('');
    try {
      await api.updateChild(activeChild.id, {
        name: childName,
        age: Number(childAge),
        avatarCat: avatarCat,
      });
      await refreshUser();
      playCorrect();
      speak('Profil anak berhasil disimpan!');
      setStatusMsg('Profil anak berhasil diperbarui!');
    } catch {
      setStatusMsg('Gagal menyimpan profil anak.');
    } finally {
      setIsSavingChild(false);
    }
  };

  const handleSaveParent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingParent(true);
    setStatusMsg('');
    try {
      await api.updateProfile({
        fullName: parentName,
        parentPin: parentPin,
      });
      await refreshUser();
      playCorrect();
      setStatusMsg('Pengaturan orang tua berhasil disimpan!');
    } catch {
      setStatusMsg('Gagal menyimpan pengaturan.');
    } finally {
      setIsSavingParent(false);
    }
  };

  const handleCreateNewChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    try {
      const created = await api.createChild({
        name: newChildName,
        age: Number(newChildAge),
        avatarCat: 'milo-orange',
      });
      await refreshUser();
      setActiveChild(created);
      setShowAddChild(false);
      setNewChildName('');
      playCorrect();
      setStatusMsg(`Profil ${created.name} berhasil dibuat!`);
    } catch {
      setStatusMsg('Gagal membuat profil anak baru.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGames}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-sm shadow-md transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Mode Main</span>
          </button>

          <div>
            <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
              Pengaturan
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-0.5">
              Profil Anak & Orang Tua
            </h1>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-100 text-emerald-900 font-black border border-emerald-300 text-center animate-pop-in shadow-sm">
          {statusMsg}
        </div>
      )}

      {/* Child Profile Section */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <User className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-black text-slate-900">Profil Anak Aktif</h2>
          </div>

          <button
            onClick={() => setShowAddChild(!showAddChild)}
            className="flex items-center gap-1 text-xs font-black bg-amber-100 text-amber-900 px-3.5 py-2 rounded-full hover:bg-amber-200 border border-amber-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Anak Lain</span>
          </button>
        </div>

        {/* Add Child Form */}
        {showAddChild && (
          <form
            onSubmit={handleCreateNewChild}
            className="mb-6 p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 flex flex-col sm:flex-row gap-3 items-end shadow-inner"
          >
            <div className="flex-1 w-full">
              <label className="block text-xs font-black text-amber-950 mb-1">Nama Anak Baru</label>
              <input
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder="Contoh: Budi"
                className="w-full bg-white border-2 border-slate-300 focus:border-amber-400 rounded-xl px-3 py-2 text-sm font-bold text-slate-800"
                required
              />
            </div>
            <div className="w-28">
              <label className="block text-xs font-black text-amber-950 mb-1">Usia</label>
              <input
                type="number"
                min="3"
                max="10"
                value={newChildAge}
                onChange={(e) => setNewChildAge(Number(e.target.value))}
                className="w-full bg-white border-2 border-slate-300 focus:border-amber-400 rounded-xl px-3 py-2 text-sm font-bold text-slate-800"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              Simpan Anak
            </button>
          </form>
        )}

        <form onSubmit={handleSaveChild} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black text-slate-800 mb-1.5">Nama Anak</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-amber-400 rounded-2xl px-4 py-2.5 font-black text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-800 mb-1.5">Usia Anak (Tahun)</label>
              <input
                type="number"
                min="3"
                max="10"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-amber-400 rounded-2xl px-4 py-2.5 font-black text-slate-900"
                required
              />
            </div>
          </div>

          {/* Maskot Avatar Costume Selector */}
          <div>
            <label className="block text-sm font-black text-slate-900 mb-3">
              Pilih Maskot Kucing Kesukaan Anak:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {catOptions.map((opt) => {
                const isSelected = avatarCat === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      playPop();
                      setAvatarCat(opt.id);
                    }}
                    className={`p-3.5 rounded-2xl border-4 text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 shadow-md scale-105 ring-2 ring-amber-300'
                        : 'border-slate-200 hover:border-amber-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-center mb-1">
                      <MiloCat mood="idle" size="sm" avatarCat={opt.id} className="w-16 h-16" />
                    </div>
                    <p className="font-black text-sm text-slate-900">{opt.label}</p>
                    <p className="text-xs text-slate-500 font-bold leading-tight mt-0.5">{opt.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={isSavingChild}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-md transition-all active:scale-95"
            >
              {isSavingChild ? 'Menyimpan...' : 'Simpan Profil Anak'}
            </button>
          </div>
        </form>
      </div>

      {/* Parent Account & Security PIN */}
      <div className="bg-white border-2 border-blue-300 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-black text-slate-900">Pengaturan Orang Tua & PIN Keamanan</h2>
        </div>

        <form onSubmit={handleSaveParent} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black text-slate-800 mb-1.5">Nama Orang Tua</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-blue-400 rounded-2xl px-4 py-2.5 font-black text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-800 mb-1.5">
                4-Digit PIN Pintu Keamanan
              </label>
              <input
                type="password"
                maxLength={4}
                value={parentPin}
                onChange={(e) => setParentPin(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-blue-400 rounded-2xl px-4 py-2.5 font-black text-slate-900"
                required
              />
              <p className="text-xs text-slate-500 font-bold mt-1">
                PIN ini mencegah anak keluar dari mode permainan atau mengubah setelan.
              </p>
            </div>
          </div>

          <div className="text-right pt-2">
            <button
              type="submit"
              disabled={isSavingParent}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-md transition-all active:scale-95"
            >
              {isSavingParent ? 'Menyimpan...' : 'Simpan Pengaturan Orang Tua'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
