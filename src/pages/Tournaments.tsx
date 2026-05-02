import React from 'react';
import { motion } from 'motion/react';
import { Search, Plus, Trophy } from 'lucide-react';
import { TournamentCard } from '../components/cards/TournamentCard';
import { Tournament } from '../types';
import { EmptyState } from '../components/ui/EmptyState';

interface TournamentsProps {
  tournaments: Tournament[];
  tournamentSearch: string;
  setTournamentSearch: (s: string) => void;
  tournamentStatusFilter: string;
  setTournamentStatusFilter: (s: string) => void;
  onManageTournament: (t: Tournament) => void;
  onDeleteTournament: (id: string) => void;
  onCreateTournament: () => void;
  isSearching: boolean;
}

export function Tournaments({ 
  tournaments, 
  tournamentSearch, 
  setTournamentSearch, 
  tournamentStatusFilter, 
  setTournamentStatusFilter, 
  onManageTournament, 
  onDeleteTournament,
  onCreateTournament,
  isSearching
}: TournamentsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 lg:space-y-8"
    >
      <section>
        <h1 className="font-headline font-extrabold text-2xl lg:text-3xl tracking-tight text-on-surface mb-1 lg:mb-2">Todos los Torneos</h1>
        <p className="text-on-surface-variant/80 text-xs lg:text-sm font-medium mb-6 lg:mb-8 leading-relaxed max-w-2xl">Gestiona tus eventos activos, revisa históricos y crea nuevas competiciones fácilmente.</p>
        <div className="relative group mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
          <input 
            className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
            placeholder="Buscar torneo" 
            type="text"
            value={tournamentSearch}
            onChange={(e) => setTournamentSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <nav className="flex gap-3 overflow-x-auto no-scrollbar pb-1 sm:pb-0 w-full sm:w-auto">
            {['Todos', 'En curso', 'Finalizados'].map(status => (
              <button 
                key={status}
                onClick={() => setTournamentStatusFilter(status)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${tournamentStatusFilter === status ? 'bg-primary text-on-primary' : 'glass-card text-on-surface-variant hover:text-on-surface'}`}
              >
                {status}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {!isSearching && tournaments.length > 0 && (
          <button 
            onClick={onCreateTournament}
            className="glass-card flex flex-col items-center justify-center min-h-[320px] rounded-2xl border border-dashed border-outline-variant hover:border-primary/50 transition-all group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <Plus size={32} strokeWidth={2.5} />
            </div>
            <span className="font-headline font-bold text-lg text-on-surface">Crear Torneo</span>
          </button>
        )}
        
        {tournaments.length > 0 ? (
          tournaments.map(t => (
            <TournamentCard key={t.id} tournament={t} onManage={onManageTournament} onDelete={onDeleteTournament} />
          ))
        ) : (
          <div className="col-span-full py-12">
            <EmptyState 
              icon={Trophy} 
              title="No se encontraron torneos" 
              description="Ajusta los filtros o crea un nuevo torneo para verlo en esta lista."
              action={{
                label: "Crear Torneo",
                onClick: onCreateTournament,
                icon: Plus
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
