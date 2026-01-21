import React from 'react';
import { Menu, Bell, Zap, ChevronDown, User } from 'lucide-react';
import { UserStats } from '../types';

interface NavbarProps {
  stats: UserStats;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ stats, toggleSidebar }) => {
  return (
    <header className="bg-dark-800/80 backdrop-blur-md border-b border-dark-700 h-20 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Level Progress (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400">NÍVEL {stats.level}</span>
            <div className="w-32 h-2 bg-dark-900 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-bitcoin rounded-full transition-all duration-500" 
                style={{ width: `${(stats.xp / stats.xpToNextLevel) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded text-xs font-bold">
            <Zap size={12} fill="currentColor" />
            <span>{stats.energy}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Balance Display */}
        <div className="bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400">Seu Saldo</p>
            <p className="text-bitcoin font-bold font-mono">{stats.balance.toLocaleString()} Sat</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-bitcoin flex items-center justify-center text-white font-bold">
            ₿
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-dark-800"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-dark-700">
           <div className="hidden md:block text-right">
             <p className="text-sm font-medium text-white">CryptoUser</p>
             <p className="text-xs text-gray-500">ID: #83921</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px] cursor-pointer">
             <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
               <User size={20} className="text-gray-300" />
             </div>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;