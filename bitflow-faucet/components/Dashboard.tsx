import React from 'react';
import { TrendingUp, Users, History, Award } from 'lucide-react';
import { UserStats, Transaction } from '../types';
import { MOCK_TRANSACTIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
  stats: UserStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  
  // Mock data for the chart
  const chartData = [
    { name: 'Seg', sat: 120 },
    { name: 'Ter', sat: 200 },
    { name: 'Qua', sat: 150 },
    { name: 'Qui', sat: 320 },
    { name: 'Sex', sat: 250 },
    { name: 'Sab', sat: 400 },
    { name: 'Dom', sat: stats.claimsTotal * 10 }, // Dynamic just to show movement
  ];

  const StatCard = ({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) => (
    <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-dark-600 transition-all">
       <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity`}></div>
       <div>
         <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
         <h3 className="text-2xl font-bold text-white font-display">{value}</h3>
       </div>
       <div className={`w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-dark-600 transition-colors`}>
         {icon}
       </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-2">
        <div>
           <h2 className="text-3xl font-display font-bold text-white">Painel de Controle</h2>
           <p className="text-gray-400">Bem-vindo de volta, Caçador de Crypto!</p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-bitcoin/10 border border-bitcoin/20 rounded-full text-bitcoin font-bold text-sm">
          Nível {stats.level}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Saldo Total" 
          value={`${stats.balance.toLocaleString()} Sat`} 
          icon={<TrendingUp size={24} />}
          color="bg-bitcoin"
        />
        <StatCard 
          label="Reivindicações" 
          value={stats.claimsTotal.toString()} 
          icon={<Award size={24} />}
          color="bg-purple-500"
        />
        <StatCard 
          label="Energia" 
          value={`${stats.energy} / 100`} 
          icon={<Users size={24} />} // Using Users as a placeholder icon for energy if Zap isn't imported, but usually Zap
          color="bg-yellow-500"
        />
        <StatCard 
          label="Referenciados" 
          value="12" 
          icon={<Users size={24} />}
          color="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-dark-800 border border-dark-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Atividade de Ganhos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e242e" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  cursor={{ fill: '#1e242e' }}
                  contentStyle={{ backgroundColor: '#151a21', borderColor: '#2a3241', color: '#fff' }}
                />
                <Bar dataKey="sat" fill="#F7931A" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <History size={18} className="text-gray-400" />
            Transações Recentes
          </h3>
          <div className="space-y-4">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between pb-4 border-b border-dark-700 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.amount > 0 ? '+' : '-'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white capitalize">{tx.type}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-mono font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
            Ver Todo Histórico
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;