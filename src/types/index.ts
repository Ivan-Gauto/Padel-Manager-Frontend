export type Screen = 'login' | 'register' | 'dashboard' | 'tournaments' | 'categories' | 'settings' | 'manage-category' | 'players';

export interface TournamentHistory {
  tournamentId: string;
  tournamentName: string;
  category: string;
  stage: string;
  date: string;
  result?: 'won' | 'lost';
}

export interface PartnerHistory {
  partnerId: string;
  partnerName: string;
  count: number;
}

export interface Player {
  id: string;
  name: string;
  surname: string;
  dni: string;
  phone: string;
  photoUrl?: string;
  level: string;
  financialStatus: 'paid' | 'debtor';
  isBlocked: boolean;
  timeRestrictions?: string;
  stats: {
    played: number;
    won: number;
    lost: number;
  };
  tournamentHistory: TournamentHistory[];
  partnerHistory: PartnerHistory[];
}

export interface Tournament {
  id: string;
  title: string;
  court: string;
  dates: string;
  progress: string;
  status: string;
  points: string;
  categories: string[];
  image: string;
}

export interface Category {
  id: string;
  name: string;
  court: string;
  pairs: number;
  progress: string;
  status: string;
}

export interface Pair {
  id: string;
  player1: string;
  player2: string;
  isPaid: boolean;
}

export interface Match {
  id: string;
  pair1Id: string;
  pair2Id: string;
  score1: string;
  score2: string;
  status: 'played' | 'pending';
  winnerId?: string;
}

export interface Standing {
  pairId: string;
  played: number;
  won: number;
  lost: number;
  sets: string;
  points: number;
}

export interface Zone {
  name: string;
  pairs: Pair[];
  standings: Standing[];
  matches: Match[];
}
