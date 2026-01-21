export type ViewState = 'dashboard' | 'faucet' | 'shortlinks' | 'withdraw';

export interface UserStats {
  balance: number; // In Satoshi
  level: number;
  xp: number;
  xpToNextLevel: number;
  claimsTotal: number;
  energy: number;
}

export interface ShortlinkTask {
  id: number;
  title: string;
  reward: number; // Satoshi
  energy: number;
  viewsLeft: number;
  totalViews: number;
  cooldown: number; // Seconds
}

export interface Transaction {
  id: string;
  type: 'faucet' | 'shortlink' | 'withdraw';
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}