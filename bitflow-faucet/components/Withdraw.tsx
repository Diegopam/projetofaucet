import React, { useState } from 'react';
import { Wallet, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';

interface WithdrawProps {
  balance: number;
}

const Withdraw: React.FC<WithdrawProps> = ({ balance }) => {
  const [method, setMethod] = useState('faucetpay');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const minWithdraw = 1000;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-white">Carteira & Saque</h2>
        <p className="text-gray-400">Transfira seus ganhos para sua carteira pessoal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-bitcoin to-orange-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-orange-100 font-medium mb-1">Saldo Atual</p>
            <h3 className="text-3xl font-bold font-mono">{balance.toLocaleString()} <span className="text-lg opacity-80">Sat</span></h3>
            <div className="mt-6 flex items-center gap-2 text-sm text-orange-100 bg-black/20 p-2 rounded-lg">
              <ShieldCheck size={16} />
              <span>Fundos Seguros</span>
            </div>
          </div>
          <Wallet className="absolute bottom-[-20px] right-[-20px] w-32 h-32 opacity-20 transform rotate-12" />
        </div>

        {/* Withdraw Form */}
        <div className="md:col-span-2 bg-dark-800 border border-dark-700 rounded-2xl p-6 md:p-8">
           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
             
             {/* Method Selection */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-gray-300">Método de Saque</label>
               <div className="grid grid-cols-2 gap-3">
                 <button
                   type="button"
                   onClick={() => setMethod('faucetpay')}
                   className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all
                     ${method === 'faucetpay' 
                       ? 'bg-blue-600/10 border-blue-500 text-blue-400' 
                       : 'bg-dark-700 border-dark-600 text-gray-400 hover:border-gray-500'}`}
                 >
                   <span className="font-bold">FaucetPay</span>
                   <span className="text-xs">Taxa: 0%</span>
                 </button>
                 <button
                   type="button"
                   onClick={() => setMethod('direct')}
                   className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all
                     ${method === 'direct' 
                       ? 'bg-bitcoin/10 border-bitcoin text-bitcoin' 
                       : 'bg-dark-700 border-dark-600 text-gray-400 hover:border-gray-500'}`}
                 >
                   <span className="font-bold">Direto</span>
                   <span className="text-xs">Taxa: 500 Sat</span>
                 </button>
               </div>
             </div>

             {/* Address Input */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-gray-300">Endereço da Carteira ({method === 'faucetpay' ? 'Email ou BTC Addr' : 'Bitcoin Addr'})</label>
               <input 
                 type="text" 
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 placeholder={method === 'faucetpay' ? "user@example.com" : "bc1qxy..."}
                 className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 text-white focus:outline-none focus:border-bitcoin transition-colors"
               />
             </div>

             {/* Amount Input */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-gray-300">Quantidade (Satoshi)</label>
               <div className="relative">
                 <input 
                   type="number" 
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 pr-16 text-white focus:outline-none focus:border-bitcoin transition-colors"
                 />
                 <button 
                   type="button"
                   onClick={() => setAmount(balance.toString())}
                   className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-bitcoin hover:text-white px-2 py-1 rounded hover:bg-bitcoin/20 transition-colors"
                 >
                   MÁX
                 </button>
               </div>
               <div className="flex justify-between text-xs mt-1">
                 <span className="text-gray-500">Min: {minWithdraw} Sat</span>
                 <span className={`${balance >= parseInt(amount || '0') ? 'text-emerald-500' : 'text-red-500'}`}>
                   {balance >= parseInt(amount || '0') ? 'Saldo Suficiente' : 'Saldo Insuficiente'}
                 </span>
               </div>
             </div>

             {/* Info Box */}
             <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 text-yellow-200/80 text-sm">
               <AlertTriangle className="shrink-0" size={20} />
               <p>Os saques são processados manualmente e podem levar até 24 horas. Verifique seu endereço cuidadosamente.</p>
             </div>

             <button 
               className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
               disabled={balance < minWithdraw || !address || parseInt(amount) < minWithdraw || parseInt(amount) > balance}
             >
               <Wallet size={20} />
               SOLICITAR SAQUE
             </button>

           </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;