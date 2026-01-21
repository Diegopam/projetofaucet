import React from 'react';
import { LayoutDashboard, MousePointerClick, Link as LinkIcon, Wallet, LogOut, Menu, X, Zap } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, setIsOpen, isMobile }) => {
  
  const menuItems = [
    { id: 'dashboard', label: 'Painel', icon: <LayoutDashboard size={20} /> },
    { id: 'faucet', label: 'Torneira Manual', icon: <MousePointerClick size={20} /> },
    { id: 'shortlinks', label: 'Shortlinks', icon: <LinkIcon size={20} /> },
    { id: 'withdraw', label: 'Carteira & Saque', icon: <Wallet size={20} /> },
  ];

  const handleNavClick = (view: string) => {
    onChangeView(view as ViewState);
    if (isMobile) setIsOpen(false);
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-dark-800 border-r border-dark-700 transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static lg:inset-0
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-bitcoin flex items-center justify-center">
              <Zap className="text-white" size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-wider">BIT<span className="text-bitcoin">FLOW</span></span>
          </div>
          {isMobile && (
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${currentView === item.id 
                  ? 'bg-bitcoin/10 text-bitcoin border border-bitcoin/20 shadow-[0_0_15px_rgba(247,147,26,0.1)]' 
                  : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                }`}
            >
              <div className={`${currentView === item.id ? 'text-bitcoin' : 'text-gray-500 group-hover:text-white'}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-dark-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;