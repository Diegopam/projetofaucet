import { ShortlinkTask, Transaction } from './types';

export const INITIAL_FAUCET_TIMER = 300; // 5 minutes in seconds
export const FAUCET_REWARD_MIN = 50;
export const FAUCET_REWARD_MAX = 200;

export const MOCK_SHORTLINKS: ShortlinkTask[] = [
  { id: 1, title: 'CryptoNews Daily', reward: 120, energy: 10, viewsLeft: 2, totalViews: 2, cooldown: 0 },
  { id: 2, title: 'Top 10 Altcoins', reward: 85, energy: 5, viewsLeft: 1, totalViews: 1, cooldown: 0 },
  { id: 3, title: 'Blockchain Tech', reward: 150, energy: 15, viewsLeft: 3, totalViews: 3, cooldown: 0 },
  { id: 4, title: 'Earn More Bits', reward: 60, energy: 5, viewsLeft: 5, totalViews: 5, cooldown: 0 },
  { id: 5, title: 'Secure Wallet Guide', reward: 100, energy: 10, viewsLeft: 0, totalViews: 2, cooldown: 3600 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx_1', type: 'faucet', amount: 55, date: '2023-10-26 10:30', status: 'completed' },
  { id: 'tx_2', type: 'shortlink', amount: 120, date: '2023-10-26 10:15', status: 'completed' },
  { id: 'tx_3', type: 'withdraw', amount: -5000, date: '2023-10-25 18:00', status: 'completed' },
  { id: 'tx_4', type: 'faucet', amount: 62, date: '2023-10-25 17:50', status: 'completed' },
];