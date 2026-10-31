import React, { useState } from 'react';
import { Lock, X, Delete } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';

interface PinModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onSuccess,
  onClose,
  title = 'Pintu Keamanan Orang Tua',
  description = 'Masukkan 4 digit PIN Orang Tua untuk melanjutkan.',
}) => {
  const { verifyParentPin } = useAuth();
  const { playPop, playCorrect, playTryAgain } = useAudio();
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    playPop();
    setError('');
    if (pin.length < 4) {
      const next = pin + digit;
      setPin(next);
      if (next.length === 4) {
        verify(next);
      }
    }
  };

  const handleBackspace = () => {
    playPop();
    setError('');
    setPin((prev) => prev.slice(0, -1));
  };

  const verify = async (pinToTest: string) => {
    setIsVerifying(true);
    try {
      const isValid = await verifyParentPin(pinToTest);
      if (isValid) {
        playCorrect();
        setPin('');
        setError('');
        onSuccess();
      } else {
        playTryAgain();
        setError('PIN tidak tepat, silakan coba lagi (Default: 1234)');
        setPin('');
      }
    } catch {
      setError('Gagal memverifikasi PIN.');
      setPin('');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative border-4 border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-1">{title}</h3>
        <p className="text-slate-500 text-sm mb-4">{description}</p>

        {/* PIN Dots */}
        <div className="flex justify-center gap-4 my-4">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                idx < pin.length
                  ? 'bg-amber-500 border-amber-600 scale-110 shadow-sm'
                  : 'bg-slate-100 border-slate-300'
              }`}
            />
          ))}
        </div>

        {error && <p className="text-rose-500 text-sm font-bold mb-3">{error}</p>}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 my-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              disabled={isVerifying}
              onClick={() => handleDigit(digit)}
              className="h-14 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-2xl font-black text-slate-700 active:scale-95 transition-all shadow-xs"
            >
              {digit}
            </button>
          ))}
          <div />
          <button
            disabled={isVerifying}
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-2xl font-black text-slate-700 active:scale-95 transition-all shadow-xs"
          >
            0
          </button>
          <button
            disabled={isVerifying || pin.length === 0}
            onClick={handleBackspace}
            className="h-14 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center active:scale-95 transition-all shadow-xs"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-3">Petunjuk bawaan: PIN Orang Tua adalah 1234</p>
      </div>
    </div>
  );
};
