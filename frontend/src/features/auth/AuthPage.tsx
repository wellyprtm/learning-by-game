import React, { useState } from 'react';
import { Mail, Lock, User, KeyRound, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { MiloCat } from '../../components/mascot/MiloCat';

export const AuthPage: React.FC = () => {
  const { login, register } = useAuth();
  const { playPop, playCorrect, speak } = useAudio();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [parentPin, setParentPin] = useState('1234');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState(5);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playPop();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        playCorrect();
        speak('Selamat datang kembali! Ayo kita mulai petualangan bersama Milo!');
      } else {
        await register({
          email,
          password,
          fullName,
          parentPin,
          childName,
          childAge: Number(childAge),
        });
        playCorrect();
        speak('Selamat bergabung di Milo Adventure! Senang berkenalan denganmu!');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat masuk.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoParentLogin = async () => {
    playPop();
    setError('');
    setLoading(true);
    try {
      await login('bunda.tika@example.com', 'password123');
      playCorrect();
      speak('Selamat datang di Milo Adventure!');
    } catch {
      // If demo user not yet created, register it
      try {
        await register({
          email: 'bunda.tika@example.com',
          password: 'password123',
          fullName: 'Bunda Tika',
          parentPin: '1234',
          childName: 'Azam',
          childAge: 5,
        });
        playCorrect();
        speak('Selamat datang di Milo Adventure!');
      } catch (err: any) {
        setError(err.message || 'Gagal masuk akun demo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EE] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Cute Milo Mascot Banner */}
        <div className="md:w-5/12 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 p-8 text-white flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest font-black bg-white/20 px-3 py-1 rounded-full">
              Khusus Anak Usia 4-7 Tahun
            </span>
            <h1 className="text-3xl md:text-4xl font-black mt-3 mb-1 drop-shadow-md">
              Milo si Kucing 🐾
            </h1>
            <p className="text-white/90 text-sm font-bold">
              Petualangan Seru Belajar Membaca & Berhitung Tanpa Stres!
            </p>
          </div>

          <div className="my-6 relative z-10">
            <MiloCat mood="happy" size="xl" />
          </div>

          <div className="relative z-10 bg-white/15 backdrop-blur-xs rounded-2xl p-3 border border-white/20 text-xs font-bold text-white/95">
            ✨ Dilengkapi Narasi Suara Indonesia, Mode Ramah Anak, dan Pintu Keamanan Orang Tua!
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-center">
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                playPop();
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl font-black text-sm transition-all ${
                mode === 'login'
                  ? 'bg-white text-slate-800 shadow-md scale-100'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              onClick={() => {
                playPop();
                setMode('register');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl font-black text-sm transition-all ${
                mode === 'register'
                  ? 'bg-white text-slate-800 shadow-md scale-100'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Nama Lengkap Orang Tua
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Bunda Maya"
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-400 rounded-2xl font-bold text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Nama Panggilan Anak
                    </label>
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Contoh: Alif"
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-400 rounded-2xl font-bold text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Usia Anak (Tahun)
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="10"
                      required
                      value={childAge}
                      onChange={(e) => setChildAge(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-400 rounded-2xl font-bold text-sm text-slate-800"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Email Orang Tua
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="orangtua@email.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-400 rounded-2xl font-bold text-sm text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-400 rounded-2xl font-bold text-sm text-slate-800"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  4-Digit PIN Pintu Keamanan (Default: 1234)
                </label>
                <div className="relative">
                  <KeyRound className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    maxLength={4}
                    value={parentPin}
                    onChange={(e) => setParentPin(e.target.value)}
                    placeholder="1234"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-400 rounded-2xl font-bold text-sm text-slate-800"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{mode === 'login' ? 'Masuk & Mulai Main' : 'Daftar Sekarang'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Parent Account Helper */}
          <div className="mt-5 pt-4 border-t-2 border-slate-100 text-center">
            <button
              type="button"
              onClick={handleDemoParentLogin}
              className="text-xs font-black text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-all"
            >
              🚀 Masuk Langsung dengan Akun Demo (Bunda Tika & Azam)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
