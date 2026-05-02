import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import { Tournament } from '../../types';

interface TournamentCardProps {
  tournament: Tournament;
  onManage: (t: Tournament) => void;
  onDelete?: (id: string) => void;
  key?: string | number;
}

export function TournamentCard({ tournament, onManage, onDelete }: TournamentCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 group flex flex-col h-full relative">
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete?.(tournament.id); }}
        className="absolute top-3 right-3 z-20 p-2 text-primary hover:text-primary-dim hover:scale-110 transition-all"
        title="Eliminar torneo"
      >
        <Trash2 size={16} />
      </button>
      <div className="h-40 lg:h-48 relative overflow-hidden flex-shrink-0">
        <img 
          src={tournament.image} 
          alt={tournament.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
        <div className="absolute top-3 lg:top-4 left-3 lg:left-4 flex flex-wrap gap-2 pr-4">
          {tournament.categories?.map((cat: string) => (
            <span key={cat} className="bg-secondary-container text-on-secondary-container px-2.5 lg:px-3 py-1 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-wider">
              {cat}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 lg:bottom-4 left-4 lg:left-6">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${tournament.status === 'EN CURSO' ? 'bg-secondary/10 border-secondary/20 text-secondary' : 'bg-primary/10 border-primary/20 text-primary'} mb-2 backdrop-blur-md`}>
            {tournament.status === 'EN CURSO' && (
              <span className="flex h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            )}
            <span className="text-[8px] lg:text-[9px] font-black tracking-[0.1em] uppercase">
              {tournament.status === 'EN CURSO' ? 'En curso' : tournament.status} {tournament.points && `• ${tournament.points} PTS`}
            </span>
          </div>
          <h3 className="text-xl lg:text-2xl font-headline font-extrabold text-on-surface leading-tight">{tournament.title}</h3>
        </div>
      </div>
      <div className="p-4 lg:p-6 bg-surface-container-low/50 flex flex-col flex-grow">
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <MapPin size={16} className="text-primary" />
            <div>
              <p className="text-[9px] lg:text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Cancha</p>
              <p className="text-xs lg:text-sm font-bold text-on-surface">{tournament.court}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <Calendar size={16} className="text-primary" />
            <div>
              <p className="text-[9px] lg:text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Fechas</p>
              <p className="text-xs lg:text-sm font-bold text-on-surface">{tournament.dates}</p>
            </div>
          </div>
        </div>
        <div className="space-y-1.5 lg:space-y-2 mb-6 lg:mb-8">
          <div className="flex justify-between items-end">
            <span className="text-[10px] lg:text-[11px] text-on-surface-variant font-bold uppercase tracking-wide">Progreso</span>
            <span className="text-[10px] lg:text-[11px] text-white font-bold uppercase tracking-wide">
              {tournament.progress === 'Cuartos de Final' ? '66%' : 
               tournament.progress === 'Fase de Zonas' ? '25%' : '0%'}
            </span>
          </div>
          <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: tournament.progress === 'Cuartos de Final' ? '66%' : tournament.progress === 'Fase de Zonas' ? '25%' : '0%' }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
        <button 
          onClick={() => onManage(tournament)}
          className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 group text-sm lg:text-base mt-auto hover:bg-primary/90 transition-colors"
        >
          Ver Detalles
          <ArrowRight size={16} className="arrow-icon group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
