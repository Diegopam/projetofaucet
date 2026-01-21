import React, { useState, useEffect } from 'react';
import { Timer, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { INITIAL_FAUCET_TIMER, FAUCET_REWARD_MIN, FAUCET_REWARD_MAX } from '../constants';

interface FaucetProps {
  onClaim: (amount: number, xp: number) => void;
}

const Faucet: React.FC<FaucetProps> = ({ onClaim }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(true);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [lastWin, setLastWin] = useState<number | null>(null);

  // Load timer state
  useEffect(() => {
    const savedTime = localStorage.getItem('faucetNextClaim');
    if (savedTime) {
      const nextClaim = parseInt(savedTime, 10);
      const now = Date.now();
      if (nextClaim > now) {
        setTimeLeft(Math.ceil((nextClaim - now) / 1000));
        setIsReady(false);
      } else {
        setIsReady(true);
        setTimeLeft(0);
      }
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsReady(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    if (!isReady) return;

    setIsRolling(true);
    
    // Simulate "rolling" effect
    setTimeout(() => {
      const reward = Math.floor(Math.random() * (FAUCET_REWARD_MAX - FAUCET_REWARD_MIN + 1)) + FAUCET_REWARD_MIN;
      const xp = 10;
      
      onClaim(reward, xp);
      setLastWin(reward);
      setIsRolling(false);
      setIsReady(false);
      
      const newCooldown = Date.now() + (INITIAL_FAUCET_TIMER * 1000);
      localStorage.setItem('faucetNextClaim', newCooldown.toString());
      setTimeLeft(INITIAL_FAUCET_TIMER);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold text-white">Torneira Manual</h2>
        <p className="text-gray-400">Reclame Satoshi grátis a cada 5 minutos!</p>
      </div>

      <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-bitcoin/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          
          {/* Status Icon */}
          <div className={`
            w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-[0_0_30px_rgba(0,0,0,0.3)]
            ${isReady 
              ? 'bg-bitcoin/10 border-bitcoin text-bitcoin animate-pulse' 
              : 'bg-dark-700 border-dark-600 text-gray-500'}
          `}>
            {isReady ? <Zap size={48} fill="currentColor" /> : <Timer size={48} />}
          </div>

          {/* Timer Display */}
          <div className="text-center">
            {isReady ? (
              <div className="text-emerald-400 font-bold text-xl flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>Pronto para coletar!</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-4xl font-mono font-bold text-white tracking-widest">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-500">Aguarde o temporizador</div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleClaim}
            disabled={!isReady || isRolling}
            className={`
              w-full py-4 px-6 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300
              flex items-center justify-center gap-3
              ${isReady && !isRolling
                ? 'bg-gradient-to-r from-bitcoin to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(247,147,26,0.4)] transform hover:-translate-y-1' 
                : 'bg-dark-700 text-gray-500 cursor-not-allowed border border-dark-600'}
            `}
          >
            {isRolling ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processando...
              </>
            ) : isReady ? (
              <>
                <Zap size={24} fill="currentColor" />
                COLETAR RECOMPENSA
              </>
            ) : (
              <>
                <Timer size={24} />
                AGUARDE
              </>
            )}
          </button>

          {/* Last Win Info */}
          {lastWin && !isReady && (
            <div className="animate-fade-in text-center p-4 bg-bitcoin/10 border border-bitcoin/20 rounded-xl w-full">
              <span className="text-gray-300">Você recebeu </span>
              <span className="font-bold text-bitcoin text-lg">{lastWin} Satoshi</span>
              <span className="text-gray-300"> no último claim!</span>
            </div>
          )}

          {/* Info Badge */}
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-dark-900/50 px-4 py-2 rounded-full border border-dark-700">
            <AlertCircle size={14} />
            <span>Recompensa aleatória: {FAUCET_REWARD_MIN} - {FAUCET_REWARD_MAX} Satoshi</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Faucet;