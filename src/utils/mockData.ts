import { Pair, Zone, Tournament, Category } from '../types';

export const mockTournaments: Tournament[] = [
  {
    id: 't1',
    title: 'Torneo: Los Tilos',
    court: 'Club Padel Central',
    dates: '15 Abr - 20 Abr',
    progress: '75%',
    status: 'En curso',
    points: '1000',
    categories: ['Suma 10', '6ta', '7ma'],
    image: 'https://picsum.photos/seed/padel-court/800/400'
  }
];

export const mockCategories: Category[] = [
  {
    id: 'c1',
    name: 'Suma 10',
    court: 'Cancha 1',
    pairs: 8,
    progress: '50%',
    status: 'En curso'
  }
];

export const mockPairs: Pair[] = [
  { id: 'p1', player1: 'Juan Pérez', player2: 'Carlos López', isPaid: true },
  { id: 'p2', player1: 'Ana García', player2: 'María Rodríguez', isPaid: false },
  { id: 'p3', player1: 'Luis Martínez', player2: 'Pedro Sánchez', isPaid: true },
  { id: 'p4', player1: 'Sofía Fernández', player2: 'Lucía Gómez', isPaid: true },
  { id: 'p5', player1: 'Jorge Ruiz', player2: 'Elena Torres', isPaid: true },
  { id: 'p6', player1: 'Diego Silva', player2: 'Laura Castro', isPaid: true },
  { id: 'p7', player1: 'Marta Ríos', player2: 'Pablo Vega', isPaid: true },
];

export const mockZones: Zone[] = [
  {
    name: 'Zona A',
    pairs: mockPairs.slice(0, 3),
    standings: [
      { pairId: 'p1', played: 1, won: 1, lost: 0, sets: '2-0', points: 3 },
      { pairId: 'p2', played: 1, won: 0, lost: 1, sets: '0-2', points: 0 },
      { pairId: 'p3', played: 0, won: 0, lost: 0, sets: '0-0', points: 0 },
    ],
    matches: [
      { id: 'm1', pair1Id: 'p1', pair2Id: 'p2', score1: '6', score2: '2', status: 'played', winnerId: 'p1' },
      { id: 'm2', pair1Id: 'p1', pair2Id: 'p3', score1: '0', score2: '0', status: 'pending' },
    ],
  },
  {
    name: 'Zona B',
    pairs: mockPairs.slice(3, 7),
    standings: [
      { pairId: 'p4', played: 1, won: 1, lost: 0, sets: '2-1', points: 3 },
      { pairId: 'p5', played: 1, won: 0, lost: 1, sets: '1-2', points: 0 },
      { pairId: 'p6', played: 0, won: 0, lost: 0, sets: '0-0', points: 0 },
      { pairId: 'p7', played: 0, won: 0, lost: 0, sets: '0-0', points: 0 },
    ],
    matches: [
      { id: 'm3', pair1Id: 'p4', pair2Id: 'p5', score1: '6', score2: '4', status: 'played', winnerId: 'p4' },
      { id: 'm4', pair1Id: 'p6', pair2Id: 'p7', score1: '0', score2: '0', status: 'pending' },
    ],
  },
];
