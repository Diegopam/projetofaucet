import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Faucet from './components/Faucet';
import Shortlinks from './components/Shortlinks';
import Withdraw from './components/Withdraw';
import { ViewState, UserStats } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mock User State
  const [stats, setStats] = useState<UserStats>({
    balance: 1250,
    level: 3,
    xp: 450,
    xpToNextLevel: 1000,
    claimsTotal: 42,
    energy: 25
  });

  // Handle Resize for Mobile Responsive Logic
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update stats helper
  const updateStats = (amount: number, xpGain: number, energyGain: number = 0) => {
    setStats(prev => {
      const newXp = prev.xp + xpGain;
      const leveledUp = newXp >= prev.xpToNextLevel;
      
      return {
        ...prev,
        balance: prev.balance + amount,
        xp: leveledUp ? newXp - prev.xpToNextLevel : newXp,
        level: leveledUp ? prev.level + 1 : prev.level,
        xpToNextLevel: leveledUp ? Math.floor(prev.xpToNextLevel * 1.5) : prev.xpToNextLevel,
        claimsTotal: prev.claimsTotal + 1,
        energy: Math.min(100, prev.energy + energyGain)
      };
    });
  };

  const handleFaucetClaim = (amount: number, xp: number) => {
    updateStats(amount, xp);
  };

  const handleShortlinkComplete = (id: number, reward: number, energy: number) => {
    updateStats(reward, 20, energy);
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'faucet':
        return <Faucet onClaim={handleFaucetClaim} />;
      case 'shortlinks':
        return <Shortlinks onComplete={handleShortlinkComplete} />;
      case 'withdraw':
        return <Withdraw balance={stats.balance} />;
      default:
        return <Dashboard stats={stats} />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-900 font-sans text-gray-200 overflow-hidden selection:bg-bitcoin selection:text-white">
      
      <Sidebar 
        currentView={currentView}
        onChangeView={setCurrentView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Navbar 
          stats={stats} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {/* Background Grid Pattern */}
           <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)',
              backgroundSize: '32px 32px'
           }}></div>

           <div className="relative z-10 max-w-7xl mx-auto w-full">
             {renderView()}
           </div>
        </main>
      </div>
    </div>
  );
}

export default App;