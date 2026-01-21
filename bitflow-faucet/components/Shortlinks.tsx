import React, { useState } from 'react';
import { ExternalLink, Eye, Clock, Zap } from 'lucide-react';
import { ShortlinkTask } from '../types';
import { MOCK_SHORTLINKS } from '../constants';

interface ShortlinksProps {
  onComplete: (id: number, reward: number, energy: number) => void;
}

const Shortlinks: React.FC<ShortlinksProps> = ({ onComplete }) => {
  const [tasks, setTasks] = useState<ShortlinkTask[]>(MOCK_SHORTLINKS);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const handleVisit = (task: ShortlinkTask) => {
    if (task.viewsLeft <= 0) return;
    
    setProcessingId(task.id);

    // Simulate visiting the link (in a real app, this would redirect)
    // We simulate a 2 second delay then success
    setTimeout(() => {
      onComplete(task.id, task.reward, task.energy);
      
      setTasks(current => current.map(t => {
        if (t.id === task.id) {
          return {
            ...t,
            viewsLeft: t.viewsLeft - 1,
            cooldown: t.viewsLeft - 1 === 0 ? 3600 : 0
          };
        }
        return t;
      }));
      
      setProcessingId(null);
    }, 2000);
  };

  const totalAvailableReward = tasks.reduce((acc, curr) => acc + (curr.reward * curr.viewsLeft), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white">Shortlinks</h2>
          <p className="text-gray-400 mt-1">Visite sites parceiros para ganhar grandes recompensas.</p>
        </div>
        <div className="bg-dark-800 px-4 py-2 rounded-lg border border-dark-700 flex items-center gap-2">
          <span className="text-sm text-gray-400">Total Disponível:</span>
          <span className="text-bitcoin font-bold">{totalAvailableReward} Sat</span>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`
              relative bg-dark-800 border rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-200
              ${task.viewsLeft > 0 
                ? 'border-dark-700 hover:border-bitcoin/30 hover:bg-dark-700/50' 
                : 'border-dark-700 opacity-60 bg-dark-800/50'}
            `}
          >
            {/* Left Info */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center shrink-0
                ${task.viewsLeft > 0 ? 'bg-indigo-500/10 text-indigo-400' : 'bg-gray-800 text-gray-600'}
              `}>
                <ExternalLink size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{task.title}</h3>
                <div className="flex items-center gap-3 text-sm mt-1">
                   <div className="flex items-center gap-1 text-gray-400">
                     <Eye size={14} />
                     <span>{task.viewsLeft}/{task.totalViews}</span>
                   </div>
                   {task.cooldown > 0 && (
                     <div className="flex items-center gap-1 text-orange-400">
                       <Clock size={14} />
                       <span>Cooldown</span>
                     </div>
                   )}
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="flex flex-col items-end">
                 <span className="text-bitcoin font-bold text-xl">{task.reward} Sat</span>
                 <div className="flex items-center gap-1 text-xs text-yellow-400">
                   <Zap size={12} fill="currentColor" />
                   <span>+{task.energy} Energia</span>
                 </div>
              </div>

              <button
                onClick={() => handleVisit(task)}
                disabled={task.viewsLeft <= 0 || processingId === task.id}
                className={`
                  px-6 py-2.5 rounded-lg font-bold text-sm min-w-[100px] transition-all
                  ${task.viewsLeft > 0
                    ? processingId === task.id 
                      ? 'bg-bitcoin/50 text-white cursor-wait'
                      : 'bg-bitcoin hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                    : 'bg-dark-700 text-gray-500 cursor-not-allowed'}
                `}
              >
                {processingId === task.id ? '...' : task.viewsLeft > 0 ? 'VISITAR' : 'FEITO'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shortlinks;