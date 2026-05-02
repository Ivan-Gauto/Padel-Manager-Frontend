import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Users, Swords, CheckCircle, MapPin, ChevronRight, ArrowRight, Settings, UserPlus, FileText, Clock, Calendar, Plus, Layers, Zap, Activity, CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { Tournament } from '../types';
import { EmptyState } from '../components/ui/EmptyState';

interface DashboardProps {
  tournaments: Tournament[];
  onManageTournament: (t: Tournament) => void;
  onViewAllTournaments: () => void;
  setScreen: (screen: any) => void;
  onCreateTournament: () => void;
  onQuickInscribe: () => void;
  onQuickCategory: () => void;
}

export function Dashboard({ 
  tournaments, 
  onManageTournament, 
  onViewAllTournaments, 
  setScreen, 
  onCreateTournament,
  onQuickInscribe,
  onQuickCategory
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'played'>('live');
  const [isMatchesExpanded, setIsMatchesExpanded] = useState(true);
  const [isActivityExpanded, setIsActivityExpanded] = useState(true);

  const tabs = [
    { id: 'live', label: 'En Juego', icon: Swords, color: 'text-secondary' },
    { id: 'upcoming', label: 'Próximos', icon: Clock, color: 'text-primary' },
    { id: 'played', label: 'Jugados', icon: CheckCircle, color: 'text-tertiary' },
  ];

  const liveMatches = [
    { tournament: 'Open Verano 2024', court: 'Cancha 1', cat: '4ta Caballeros', phase: 'Zona A', p1: 'Gauto / Benitez', p2: 'Lopez / Martinez' },
    { tournament: 'Open Verano 2024', court: 'Cancha 2', cat: '5ta Damas', phase: 'Octavos', p1: 'Sosa / Ramirez', p2: 'Duarte / Gimenez' },
    { tournament: 'Copa Master', court: 'Cancha Central', cat: '3ra Caballeros', phase: 'Final', p1: 'Alvarez / Ruiz', p2: 'Torres / Medina' },
    { tournament: 'Open Verano 2024', court: 'Cancha 3', cat: '6ta Caballeros', phase: 'Zona C', p1: 'Perez / Garcia', p2: 'Rodriguez / Fernandez' },
    { tournament: 'Open Verano 2024', court: 'Cancha 4', cat: '4ta Caballeros', phase: 'Zona B', p1: 'Villalba / Ortiz', p2: 'Nuñez / Galeano' },
    { tournament: 'Open Verano 2024', court: 'Cancha 5', cat: '5ta Caballeros', phase: 'Zona D', p1: 'Rojas / Benitez', p2: 'Silva / Ferreira' },
    { tournament: 'Copa Master', court: 'Cancha 6', cat: '3ra Caballeros', phase: 'Semifinal', p1: 'Gonzalez / Vera', p2: 'Acosta / Meza' },
    { tournament: 'Open Verano 2024', court: 'Cancha 1', cat: '2da Caballeros', phase: 'Cuartos', p1: 'Irala / Cardozo', p2: 'Bogado / Espinola' }
  ];

  const upcomingMatches = [
    { tournament: 'Open Verano 2024', time: '18:30', court: 'Cancha 1', cat: '4ta Caballeros', phase: 'Zona B', p1: 'Villalba / Ortiz', p2: 'Nuñez / Galeano' },
    { tournament: 'Open Verano 2024', time: '19:15', court: 'Cancha 2', cat: '5ta Damas', phase: 'Cuartos', p1: 'Rojas / Benitez', p2: 'Silva / Ferreira' },
    { tournament: 'Copa Master', time: '20:00', court: 'Cancha Central', cat: '3ra Caballeros', phase: 'Semifinal', p1: 'Gonzalez / Vera', p2: 'Acosta / Meza' },
    { tournament: 'Open Verano 2024', time: '20:30', court: 'Cancha 3', cat: '6ta Caballeros', phase: 'Zona A', p1: 'Paredes / Diaz', p2: 'Mendez / Vera' },
    { tournament: 'Open Verano 2024', time: '21:15', court: 'Cancha 4', cat: '4ta Caballeros', phase: 'Zona C', p1: 'Gomez / Sanchez', p2: 'Torres / Ruiz' },
    { tournament: 'Copa Master', time: '22:00', court: 'Cancha 5', cat: '2da Caballeros', phase: 'Final', p1: 'Vidal / Sosa', p2: 'Benitez / Lopez' }
  ];

  const playedMatches = [
    { tournament: 'Open Verano 2024', court: 'Cancha 1', cat: '4ta Caballeros', phase: 'Zona A', p1: 'Gauto / Benitez', p2: 'Lopez / Martinez' },
    { tournament: 'Open Verano 2024', court: 'Cancha 2', cat: '5ta Damas', phase: 'Octavos', p1: 'Sosa / Ramirez', p2: 'Duarte / Gimenez' },
    { tournament: 'Copa Master', court: 'Cancha Central', cat: '3ra Caballeros', phase: 'Cuartos', p1: 'Alvarez / Ruiz', p2: 'Torres / Medina' },
    { tournament: 'Open Verano 2024', court: 'Cancha 3', cat: '6ta Caballeros', phase: 'Zona C', p1: 'Perez / Garcia', p2: 'Rodriguez / Fernandez' },
    { tournament: 'Open Verano 2024', court: 'Cancha 4', cat: '4ta Caballeros', phase: 'Zona B', p1: 'Villalba / Ortiz', p2: 'Nuñez / Galeano' },
    { tournament: 'Open Verano 2024', court: 'Cancha 5', cat: '5ta Caballeros', phase: 'Zona D', p1: 'Rojas / Benitez', p2: 'Silva / Ferreira' },
    { tournament: 'Copa Master', court: 'Cancha 6', cat: '3ra Caballeros', phase: 'Semifinal', p1: 'Gonzalez / Vera', p2: 'Acosta / Meza' }
  ];

  const recentActivity = [
    { title: 'Torneo Finalizado', desc: 'Open Verano 2024 ha concluido exitosamente.', time: 'HACE 2 HORAS', icon: Trophy, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Nueva Inscripción', desc: 'Gauto / Benitez se inscribieron a 4ta Caballeros.', time: 'HACE 3 HORAS', icon: UserPlus, color: 'text-secondary', bg: 'bg-secondary/10' },
    { title: 'Resultado Cargado', desc: 'Lopez / Martinez ganaron 6-2 / 6-1 en Cancha 3.', time: 'HACE 5 HORAS', icon: FileText, color: 'text-tertiary', bg: 'bg-tertiary/10' },
    { title: 'Cancha Asignada', desc: 'Cancha 2 asignada para Semifinal 5ta Damas.', time: 'HACE 6 HORAS', icon: MapPin, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const quickActions = [
    { 
      label: 'Crear Torneo', 
      icon: Trophy, 
      onClick: onCreateTournament,
      color: 'text-primary',
      bg: 'bg-primary/10',
      desc: 'Inicia una nueva competencia'
    },
    { 
      label: 'Inscribir Pareja', 
      icon: UserPlus, 
      onClick: onQuickInscribe,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
      desc: 'Registra nuevos competidores'
    },
    { 
      label: 'Nueva Categoría', 
      icon: Layers, 
      onClick: onQuickCategory,
      color: 'text-tertiary',
      bg: 'bg-tertiary/10',
      desc: 'Agrega niveles a tus torneos'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <button 
            onClick={() => setIsMatchesExpanded(!isMatchesExpanded)}
            className="flex items-center justify-between w-full lg:cursor-default lg:pointer-events-none text-left"
          >
            <h2 className="font-headline font-bold text-xl tracking-tight">Partidos</h2>
            <div className="lg:hidden p-2 rounded-full bg-surface-container-low text-on-surface-variant">
              {isMatchesExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {(isMatchesExpanded || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden space-y-6"
              >
                {/* Tab Navigation */}
                <div className="flex border-b border-outline-variant/60 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-2 sm:px-6 py-4 text-xs sm:text-sm font-bold tracking-tight transition-all relative ${
                  activeTab === tab.id 
                    ? 'text-primary' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <span className="truncate block">{tab.label}</span>
                  {tab.id === 'live' && liveMatches.length > 0 && (
                    <span className="flex shrink-0 h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  )}
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-dashboard-tab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[240px] max-h-[420px] overflow-y-auto glass-scrollbar pr-2">
            <AnimatePresence mode="wait">
              {activeTab === 'live' && (
                <motion.div
                  key="live"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {liveMatches.map((match, i) => (
                      <div key={i} className="glass-card p-4 rounded-2xl hover:border-secondary/50 transition-all group cursor-pointer relative overflow-hidden">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{match.tournament}</span>
                            <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{match.court}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">{match.cat}</span>
                            <span className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{match.phase}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-bold text-on-surface truncate flex-1">{match.p1}</p>
                            <span className="text-[10px] font-bold text-on-surface-variant/40 italic mx-4">vs</span>
                            <p className="text-sm font-bold text-on-surface truncate flex-1 text-right">{match.p2}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {liveMatches.length === 0 && (
                      <div className="col-span-full py-4">
                        <EmptyState 
                          icon={Swords} 
                          title="Sin partidos en juego" 
                          description="Los partidos activos aparecerán aquí en tiempo real."
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'upcoming' && (
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingMatches.map((match, i) => (
                      <div key={i} className="glass-card p-4 rounded-2xl hover:border-primary/50 transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2 px-2 py-1 bg-primary/5 rounded-lg">
                            <Clock size={12} className="text-primary" />
                            <span className="text-[10px] font-black text-primary">{match.time}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{match.tournament}</span>
                            <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{match.court}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-on-surface truncate">{match.p1}</p>
                              <span className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">{match.cat}</span>
                            </div>
                            <span className="text-[10px] font-bold text-on-surface-variant/40 italic mx-4">vs</span>
                            <div className="flex-1 text-right">
                              <p className="text-sm font-bold text-on-surface truncate">{match.p2}</p>
                              <span className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{match.phase}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {upcomingMatches.length === 0 && (
                      <div className="col-span-full py-4">
                        <EmptyState 
                          icon={Clock} 
                          title="Sin próximos partidos" 
                          description="Programa nuevos encuentros para verlos en esta sección."
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'played' && (
                <motion.div
                  key="played"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playedMatches.map((match, i) => (
                      <div key={i} className="glass-card p-4 rounded-2xl hover:border-tertiary/50 transition-all group cursor-pointer">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{match.tournament}</span>
                            <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">Finalizado</span>
                          </div>
                          <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{match.phase}</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="text-sm font-bold truncate text-on-surface">{match.p1}</p>
                              <span className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{match.cat}</span>
                            </div>
                            <span className="text-[10px] font-bold text-on-surface-variant/40 italic mx-4">vs</span>
                            <div className="flex-1 text-right">
                              <p className="text-sm font-bold truncate text-on-surface">{match.p2}</p>
                              <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{match.court}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {playedMatches.length === 0 && (
                      <div className="col-span-full py-4">
                        <EmptyState 
                          icon={CheckCircle} 
                          title="Sin partidos finalizados" 
                          description="Aquí verás el historial de encuentros completados."
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

        {/* Actividad Reciente */}
        <div className="space-y-6">
          <button 
            onClick={() => setIsActivityExpanded(!isActivityExpanded)}
            className="flex items-center justify-between w-full lg:cursor-default lg:pointer-events-none text-left"
          >
            <h2 className="font-headline font-bold text-xl tracking-tight">Actividad Reciente</h2>
            <div className="lg:hidden p-2 rounded-full bg-surface-container-low text-on-surface-variant">
              {isActivityExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {(isActivityExpanded || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden space-y-4"
              >
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.bg} ${act.color}`}>
                      {React.createElement(act.icon, { size: 18 })}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{act.title}</p>
                      <p className="text-xs text-on-surface-variant">{act.desc}</p>
                      <p className="text-[10px] text-on-surface-variant/60 mt-0.5 font-bold uppercase tracking-widest">{act.time}</p>
                    </div>
                  </div>
                ))}
                {recentActivity.length === 0 && (
                  <div className="py-4">
                    <EmptyState 
                      icon={Activity} 
                      title="Sin actividad" 
                      description="Las actualizaciones recientes se mostrarán en este panel."
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Acciones Rápidas */}
      <section className="space-y-6 hidden lg:block">
        <h2 className="font-headline font-bold text-xl tracking-tight">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className="glass-card flex flex-col items-start p-5 rounded-2xl hover:border-primary/50 hover:bg-surface-container-low/30 transition-all group text-left"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon size={24} />
              </div>
              <h3 className="font-bold text-on-surface">{action.label}</h3>
              <p className="text-xs text-on-surface-variant mt-1">{action.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-headline font-bold text-xl tracking-tight">Torneos Activos</h2>
          <button onClick={onViewAllTournaments} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            Ver todos <ChevronRight size={16} />
          </button>
        </div>
        {tournaments.length > 0 ? (
          <div className="glass-card rounded-xl overflow-hidden group">
            <div className="h-40 lg:h-48 w-full relative">
              <img 
                src={tournaments[0].image} 
                alt="Tournament" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 lg:top-4 left-3 lg:left-4 flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 text-secondary px-2.5 lg:px-3 py-1 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="flex h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                En curso
              </div>
            </div>
            <div className="p-4 lg:p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg lg:text-xl font-headline font-bold">{tournaments[0].title}</h3>
                  <p className="text-on-surface-variant text-xs lg:text-sm mt-1 flex items-center gap-1">
                    <MapPin size={14} className="text-primary" />
                    {tournaments[0].court}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base lg:text-lg text-white font-black">75%</span>
                  <p className="text-[7px] lg:text-[8px] text-on-surface-variant uppercase tracking-widest font-bold">COMPLETADO</p>
                </div>
              </div>
              <div className="w-full h-1 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-end pt-1.5 lg:pt-2">
                <button 
                  onClick={() => onManageTournament(tournaments[0])}
                  className="px-4 lg:px-6 py-2 lg:py-2.5 btn-primary-glow rounded-xl text-xs lg:text-sm flex items-center gap-2 group"
                >
                  Gestionar
                  <ArrowRight size={14} className="lg:size-[16px] arrow-icon group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <EmptyState 
              icon={CalendarDays} 
              title="No hay torneos activos" 
              description="Crea tu primer torneo para comenzar a gestionar la competencia."
            />
          </div>
        )}
      </section>
    </motion.div>
  );
}
