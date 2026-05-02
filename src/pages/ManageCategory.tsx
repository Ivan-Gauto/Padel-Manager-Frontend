import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Users, MapPin, Search, ChevronRight, ArrowRight, Trophy, Layers, UserPlus, DollarSign, PieChart as PieChartIcon, Download, Filter, Edit2, Trash2 } from 'lucide-react';
import { SingleEliminationBracket } from '@g-loot/react-tournament-brackets';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Category, Match, Pair } from '../types';
import { mockPairs, mockZones } from '../utils/mockData';
import { AddPairModal } from '../components/modals/AddPairModal';
import { EditPairModal } from '../components/modals/EditPairModal';
import { MatchResultModal } from '../components/modals/MatchResultModal';
import { EmptyState } from '../components/ui/EmptyState';

export function ManageCategory({ category, onBack }: { category: Category | null, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'zona' | 'eliminatoria' | 'parejas'>('zona');
  const [zoneSearch, setZoneSearch] = useState('');
  const [zoneStatusFilter, setZoneStatusFilter] = useState<'Todos' | 'En Curso' | 'Finalizado'>('Todos');
  const [pairsSearch, setPairsSearch] = useState('');
  const [pairsPaymentFilter, setPairsPaymentFilter] = useState<'Todos' | 'Pagado' | 'Pendiente'>('Todos');
  const [isAddPairModalOpen, setIsAddPairModalOpen] = useState(false);
  const [isEditPairModalOpen, setIsEditPairModalOpen] = useState(false);
  const [pairToEdit, setPairToEdit] = useState<any>(null);
  const [localPairs, setLocalPairs] = useState(mockPairs);
  const [localZones, setLocalZones] = useState(mockZones);

  if (!category) return null;

  const handleAddPair = (newPair: any) => {
    setLocalPairs([newPair, ...localPairs]);
    setIsAddPairModalOpen(false);
  };

  const handleEditPairClick = (pair: any) => {
    setPairToEdit(pair);
    setIsEditPairModalOpen(true);
  };

  const handleEditPair = (updatedPair: any) => {
    setLocalPairs(localPairs.map(p => p.id === updatedPair.id ? updatedPair : p));
    setIsEditPairModalOpen(false);
    setPairToEdit(null);
  };

  const handleDeletePair = (pairId: string) => {
    setLocalPairs(localPairs.filter(p => p.id !== pairId));
  };

  const handleSetWinner = (matchId: string, zoneName: string, clickedPairId: string, currentWinnerId?: string) => {
    const isTogglingOff = currentWinnerId === clickedPairId;
    const newWinnerId = isTogglingOff ? undefined : clickedPairId;
    const newStatus = isTogglingOff ? 'pending' : 'played';

    setLocalZones(prevZones => prevZones.map(zone => {
      if (zone.name === zoneName) {
        return {
          ...zone,
          matches: zone.matches.map(m => 
            m.id === matchId 
              ? { ...m, status: newStatus, winnerId: newWinnerId }
              : m
          )
        };
      }
      return zone;
    }));
  };

  const matches = [
    {
      id: 1,
      name: 'Cuartos 1',
      nextMatchId: 5,
      tournamentRoundText: '1',
      startTime: '2026-04-15T10:00:00',
      state: 'SCHEDULED',
      participants: [
        { id: 1, resultText: null, isWinner: false, status: null, name: 'Pareja A1' },
        { id: 2, resultText: null, isWinner: false, status: null, name: 'Pareja B1' },
      ],
    },
    {
      id: 2,
      name: 'Cuartos 2',
      nextMatchId: 5,
      tournamentRoundText: '1',
      startTime: '2026-04-15T11:00:00',
      state: 'SCHEDULED',
      participants: [
        { id: 3, resultText: null, isWinner: false, status: null, name: 'Pareja A2' },
        { id: 4, resultText: null, isWinner: false, status: null, name: 'Pareja B2' },
      ],
    },
    {
      id: 5,
      name: 'Semifinal 1',
      nextMatchId: 7,
      tournamentRoundText: '2',
      startTime: '2026-04-16T10:00:00',
      state: 'SCHEDULED',
      participants: [
        { id: 1, resultText: null, isWinner: false, status: null, name: 'Ganador Q1' },
        { id: 2, resultText: null, isWinner: false, status: null, name: 'Ganador Q2' },
      ],
    },
    {
      id: 7,
      name: 'Final',
      nextMatchId: null,
      tournamentRoundText: '3',
      startTime: '2026-04-17T10:00:00',
      state: 'SCHEDULED',
      participants: [
        { id: 1, resultText: null, isWinner: false, status: null, name: 'Ganador S1' },
        { id: 2, resultText: null, isWinner: false, status: null, name: 'Ganador S2' },
      ],
    },
  ];

  const allZonesFinished = localZones.length > 0 && localZones.every(zone => zone.matches.every(m => m.status === 'played'));

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-primary font-bold text-sm mb-2 hover:underline group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver a Categorías
          </button>
          <h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface">
            Categoría {category.name}
          </h1>
          <div className="flex items-center gap-4 text-on-surface-variant mt-1">
            <div className="flex items-center gap-1.5">
              <Users size={16} />
              <span className="text-sm font-medium">{category.pairs} Parejas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span className="text-sm font-medium">{category.court}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant/60 w-full">
        <button 
          onClick={() => setActiveTab('zona')}
          className={`flex-1 px-2 sm:px-6 py-4 text-xs sm:text-sm font-bold tracking-tight transition-all relative ${activeTab === 'zona' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <span className="truncate block">Cuadro de Zona</span>
          {activeTab === 'zona' && <motion.div layoutId="active-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('eliminatoria')}
          className={`flex-1 px-2 sm:px-6 py-4 text-xs sm:text-sm font-bold tracking-tight transition-all relative ${activeTab === 'eliminatoria' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <span className="truncate block">Eliminatoria</span>
          {activeTab === 'eliminatoria' && <motion.div layoutId="active-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('parejas')}
          className={`flex-1 px-2 sm:px-6 py-4 text-xs sm:text-sm font-bold tracking-tight transition-all relative ${activeTab === 'parejas' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <span className="truncate block">Parejas</span>
          {activeTab === 'parejas' && <motion.div layoutId="active-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] pb-10 space-y-6">
        {activeTab === 'zona' && (
          <div className="space-y-6">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative group flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                    <input 
                      className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                      placeholder="Buscar por zona o jugador" 
                      type="text"
                      value={zoneSearch}
                      onChange={(e) => setZoneSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    {['Todos', 'En Curso', 'Finalizado'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setZoneStatusFilter(status as any)}
                        className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                          zoneStatusFilter === status 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-surface/50 text-on-surface-variant border-outline-variant hover:border-primary/40'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {localZones
                .filter(zone => {
                  const searchLower = zoneSearch.toLowerCase();
                  const matchesName = zone.name.toLowerCase().includes(searchLower);
                  const matchesPlayer = zoneSearch === '' || zone.pairs.some(p => 
                    p.player1.toLowerCase().includes(searchLower) || 
                    p.player2.toLowerCase().includes(searchLower)
                  );
                  
                  // Derive status
                  const allPlayed = zone.matches.every(m => m.status === 'played');
                  const zoneStatus = allPlayed ? 'Finalizado' : 'En Curso';
                  const matchesStatus = zoneStatusFilter === 'Todos' || zoneStatus === zoneStatusFilter;

                  return (matchesName || matchesPlayer) && matchesStatus;
                })
                .map((zone, idx) => {
                  // Derive status for display
                  const allPlayed = zone.matches.every(m => m.status === 'played');
                  const zoneStatus = allPlayed ? 'Finalizado' : 'En Curso';
                  
                  return (
              <div key={idx} className="glass-card rounded-xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-5 border-b border-outline-variant flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-headline font-bold text-lg text-on-surface">Zona</span>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-headline font-black text-xl">
                      {zone.name.split(' ')[1]}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {zoneStatus === 'En Curso' && <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />}
                    {zoneStatus === 'Finalizado' && <span className="flex h-2 w-2 rounded-full bg-tertiary" />}
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">{zoneStatus}</span>
                  </div>
                </div>
                
                <div className="p-5 space-y-8">
                  {/* Standings */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-2">
                      <div className="w-1 h-3 bg-primary rounded-full" /> Posiciones
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-outline-variant/30">
                            <th className="py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center w-8">Pos</th>
                            <th className="py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Pareja</th>
                            <th className="py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">PJ</th>
                            <th className="py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">G</th>
                            <th className="py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">P</th>
                            <th className="py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">Pts</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                          {zone.standings.map((standing, i) => {
                            const pair = zone.pairs.find(p => p.id === standing.pairId);
                            return (
                              <tr key={standing.pairId} className={i < 2 ? 'bg-primary/5' : ''}>
                                <td className="py-2 text-center text-xs font-bold text-on-surface-variant">{i + 1}</td>
                                <td className="py-2">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-xs text-on-surface truncate max-w-[120px]">{pair?.player1.split(' ')[0]} / {pair?.player2.split(' ')[0]}</span>
                                  </div>
                                </td>
                                <td className="py-2 text-center text-xs font-medium">{standing.played}</td>
                                <td className="py-2 text-center text-xs font-medium text-tertiary">{standing.won}</td>
                                <td className="py-2 text-center text-xs font-medium text-primary">{standing.lost}</td>
                                <td className="py-2 text-center text-xs font-bold">{standing.points}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Matches - Minimalist List */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-2">
                      <div className="w-1 h-3 bg-secondary rounded-full" /> Partidos
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {zone.matches.map((match) => {
                        const p1 = zone.pairs.find(p => p.id === match.pair1Id);
                        const p2 = zone.pairs.find(p => p.id === match.pair2Id);
                        const isP1Winner = match.winnerId === match.pair1Id;
                        const isP2Winner = match.winnerId === match.pair2Id;

                        return (
                          <div 
                            key={match.id} 
                            className="flex flex-col border border-outline-variant/30 rounded-xl overflow-hidden transition-all"
                          >
                            <div 
                              onClick={() => handleSetWinner(match.id, zone.name, match.pair1Id, match.winnerId)}
                              className={`flex justify-between items-center p-3 cursor-pointer transition-colors ${isP1Winner ? 'bg-primary/10' : 'bg-surface/50 hover:bg-surface-container-low'}`}
                            >
                              <span className={`text-xs ${isP1Winner ? 'font-bold text-primary flex items-center gap-2' : 'font-medium text-on-surface'}`}>
                                {p1?.player1.split(' ')[0]} / {p1?.player2.split(' ')[0]}
                                {isP1Winner && <Trophy size={12} />}
                              </span>
                            </div>
                            <div className="h-px bg-outline-variant/30" />
                            <div 
                              onClick={() => handleSetWinner(match.id, zone.name, match.pair2Id, match.winnerId)}
                              className={`flex justify-between items-center p-3 cursor-pointer transition-colors ${isP2Winner ? 'bg-primary/10' : 'bg-surface/50 hover:bg-surface-container-low'}`}
                            >
                              <span className={`text-xs ${isP2Winner ? 'font-bold text-primary flex items-center gap-2' : 'font-medium text-on-surface'}`}>
                                {p2?.player1.split(' ')[0]} / {p2?.player2.split(' ')[0]}
                                {isP2Winner && <Trophy size={12} />}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
                  );
                })}
              {localZones.length === 0 && (
                <div className="col-span-full py-12">
                  <EmptyState 
                    icon={Layers} 
                    title="No hay zonas generadas" 
                    description="Las zonas y sus partidos aparecerán aquí una vez que las generes para esta categoría."
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'eliminatoria' && (
          <div className="glass-card rounded-xl p-8">
            {allZonesFinished ? (
              <SingleEliminationBracket
                matches={matches}
                bracketClassName="w-full"
              />
            ) : (
              <EmptyState 
                icon={Trophy} 
                title="Cuadro no generado" 
                description="El cuadro de eliminatoria se generará automáticamente cuando finalicen todos los partidos de todas las zonas."
              />
            )}
          </div>
        )}

        {activeTab === 'parejas' && (
          <div className="space-y-6">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="relative group flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                    <input 
                      className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                      placeholder="Buscar por jugador..." 
                      type="text"
                      value={pairsSearch}
                      onChange={(e) => setPairsSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    {['Todos', 'Pagado', 'Pendiente'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setPairsPaymentFilter(status as any)}
                        className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                          pairsPaymentFilter === status 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-surface/50 text-on-surface-variant border-outline-variant hover:border-primary/40'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setIsAddPairModalOpen(true)}
                    className="w-full md:w-auto px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 btn-primary-glow shrink-0"
                  >
                    <UserPlus size={18} />
                    Agregar Pareja
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Mobile/Tablet List View */}
              <div className="grid grid-cols-1 gap-4 lg:hidden">
                {localPairs
                  .filter(pair => {
                    const matchesSearch = pair.player1.toLowerCase().includes(pairsSearch.toLowerCase()) || 
                                        pair.player2.toLowerCase().includes(pairsSearch.toLowerCase());
                    const matchesPayment = pairsPaymentFilter === 'Todos' || 
                                         (pairsPaymentFilter === 'Pagado' ? pair.isPaid : !pair.isPaid);
                    return matchesSearch && matchesPayment;
                  })
                  .map((pair) => (
                    <div key={pair.id} className="glass-card rounded-xl p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary" />
                            <p className="font-bold text-sm">{pair.player1} / {pair.player2}</p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${pair.paymentStatus === 'paid' || pair.isPaid ? 'bg-tertiary/10 text-tertiary' : pair.paymentStatus === 'partial' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                          {pair.paymentStatus === 'paid' || pair.isPaid ? 'Pagado' : pair.paymentStatus === 'partial' ? 'Señado' : 'Pendiente'}
                        </span>
                      </div>
                      <div className="flex justify-end gap-4 pt-3 border-t border-outline-variant/40">
                        <button 
                          onClick={() => handleEditPairClick(pair)}
                          className="text-on-surface-variant hover:text-primary transition-colors p-1"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeletePair(pair.id)}
                          className="text-on-surface-variant hover:text-primary transition-colors p-1"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                {localPairs.length === 0 && (
                  <div className="py-8">
                    <EmptyState 
                      icon={Users} 
                      title="No hay parejas inscriptas" 
                      description="Comienza agregando parejas a esta categoría para organizar el torneo."
                    />
                  </div>
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block glass-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Pareja</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Estado</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {localPairs
                        .filter(pair => {
                          const matchesSearch = pair.player1.toLowerCase().includes(pairsSearch.toLowerCase()) || 
                                              pair.player2.toLowerCase().includes(pairsSearch.toLowerCase());
                          const matchesPayment = pairsPaymentFilter === 'Todos' || 
                                               (pairsPaymentFilter === 'Pagado' ? pair.isPaid : !pair.isPaid);
                          return matchesSearch && matchesPayment;
                        })
                        .map((pair) => (
                          <tr key={pair.id} className="hover:bg-surface-container-low transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="font-bold text-sm">{pair.player1}</span>
                                <span className="font-bold text-sm">{pair.player2}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${pair.paymentStatus === 'paid' || pair.isPaid ? 'bg-tertiary/10 text-tertiary' : pair.paymentStatus === 'partial' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                                {pair.paymentStatus === 'paid' || pair.isPaid ? 'Pagado' : pair.paymentStatus === 'partial' ? 'Señado' : 'Pendiente'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-4">
                                <button 
                                  onClick={() => handleEditPairClick(pair)}
                                  className="text-on-surface-variant hover:text-primary transition-colors p-1"
                                  title="Editar"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button 
                                  onClick={() => handleDeletePair(pair.id)}
                                  className="text-on-surface-variant hover:text-primary transition-colors p-1"
                                  title="Eliminar"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {localPairs.length === 0 && (
                    <div className="py-12">
                      <EmptyState 
                        icon={Users} 
                        title="No hay parejas inscriptas" 
                        description="Comienza agregando parejas a esta categoría para organizar el torneo."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AddPairModal 
        isOpen={isAddPairModalOpen}
        onClose={() => setIsAddPairModalOpen(false)}
        onAdd={handleAddPair}
      />

      <EditPairModal 
        isOpen={isEditPairModalOpen}
        onClose={() => {
          setIsEditPairModalOpen(false);
          setPairToEdit(null);
        }}
        onEdit={handleEditPair}
        initialPair={pairToEdit}
      />
    </motion.div>
  );
}
