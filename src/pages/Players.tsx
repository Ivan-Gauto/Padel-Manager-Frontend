import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MessageCircle, User, Calendar, Users, Clock, BarChart2, Ban, Download, ChevronRight, X, AlertTriangle, CheckCircle2, Phone, Trophy, UserX } from 'lucide-react';
import { Player } from '../types';
import { EmptyState } from '../components/ui/EmptyState';

const mockPlayers: Player[] = [];

export function Players() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>(mockPlayers);

  const filteredPlayers = useMemo(() => {
    return players.filter(p => 
      `${p.name} ${p.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.dni.includes(searchTerm) ||
      p.phone.includes(searchTerm)
    );
  }, [players, searchTerm]);

  const toggleBlock = (id: string) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, isBlocked: !p.isBlocked } : p));
    if (selectedPlayer?.id === id) {
      setSelectedPlayer(prev => prev ? { ...prev, isBlocked: !prev.isBlocked } : null);
    }
  };

  const handleExport = () => {
    // In a real app, this would generate a CSV or PDF
    alert('Exportando lista de jugadores...');
  };

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 md:p-8 space-y-6 relative min-h-[calc(100vh-64px)]">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Jugadores</h1>
          <p className="text-on-surface-variant">Gestiona tu base de datos deportiva.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Buscar por nombre, DNI o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
            />
          </div>
          <button 
            onClick={handleExport}
            className="p-2 bg-surface/50 border border-outline-variant rounded-xl hover:bg-surface-container-high transition-colors text-on-surface-variant"
            title="Exportar lista"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/30 border-b border-outline-variant">
                <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Jugador</th>
                <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Nivel / Categoría</th>
                <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant uppercase tracking-wider">WhatsApp</th>
                <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Estado Financiero</th>
                <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredPlayers.map((player) => (
                <tr 
                  key={player.id} 
                  onClick={() => setSelectedPlayer(player)}
                  className="hover:bg-surface-container-low transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {player.name[0]}{player.surname[0]}
                      </div>
                      <div>
                        <p className="font-medium text-on-surface">{player.name} {player.surname}</p>
                        <p className="text-xs text-on-surface-variant">DNI: {player.dni}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-sm rounded-full font-medium">
                      {player.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openWhatsApp(player.phone); }}
                      className="flex items-center gap-2 text-tertiary hover:text-tertiary-dim font-medium text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {player.financialStatus === 'paid' ? (
                      <span className="flex items-center gap-1.5 text-tertiary text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Al día
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-primary text-sm font-medium">
                        <AlertTriangle className="w-4 h-4" />
                        Deudor Habitual
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {player.isBlocked ? (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md font-bold uppercase">Suspendido</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-xs rounded-md font-bold uppercase">Activo</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight className="w-5 h-5 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPlayers.length === 0 && (
          <div className="py-12">
            <EmptyState 
              icon={Users} 
              title="No se encontraron jugadores" 
              description="Intenta con otros términos de búsqueda o agrega nuevos jugadores a tu base de datos."
            />
          </div>
        )}
      </div>

      {/* Player Detail Drawer */}
      <AnimatePresence>
        {selectedPlayer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-surface/95 backdrop-blur-xl z-50 shadow-2xl overflow-y-auto border-l border-outline-variant"
            >
              <div className="p-6 space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-on-surface">Perfil del Jugador</h2>
                  <button onClick={() => setSelectedPlayer(null)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                    {selectedPlayer.name[0]}{selectedPlayer.surname[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-on-surface">{selectedPlayer.name} {selectedPlayer.surname}</h3>
                    <p className="text-on-surface-variant">DNI: {selectedPlayer.dni}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs rounded-full font-bold uppercase">
                        {selectedPlayer.level}
                      </span>
                      {selectedPlayer.isBlocked && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-bold uppercase">
                          Suspendido
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={() => openWhatsApp(selectedPlayer.phone)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-tertiary text-white rounded-xl font-medium hover:bg-tertiary/90 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </button>
                    <button 
                      onClick={() => toggleBlock(selectedPlayer.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 border rounded-xl font-medium transition-colors ${
                        selectedPlayer.isBlocked 
                        ? 'border-tertiary text-tertiary hover:bg-tertiary/5' 
                        : 'border-primary text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Ban className="w-4 h-4" />
                      {selectedPlayer.isBlocked ? 'Habilitar' : 'Suspender'}
                    </button>
                  </div>
                </div>

                {/* Time Restrictions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Clock className="w-5 h-5" />
                    <h4 className="font-bold uppercase text-xs tracking-wider">Restricciones Horarias</h4>
                  </div>
                  <div className="bg-surface/50 border border-outline-variant p-4 rounded-2xl italic text-on-surface">
                    "{selectedPlayer.timeRestrictions || 'Sin restricciones anotadas'}"
                  </div>
                </div>

                {/* Partner History */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Users className="w-5 h-5" />
                    <h4 className="font-bold uppercase text-xs tracking-wider">Historial de Parejas</h4>
                  </div>
                  <div className="space-y-2">
                    {selectedPlayer.partnerHistory.map(partner => (
                      <div key={partner.partnerId} className="flex items-center justify-between p-3 bg-surface/50 border border-outline-variant rounded-xl">
                        <span className="font-medium text-on-surface">{partner.partnerName}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                          {partner.count} {partner.count === 1 ? 'vez' : 'veces'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tournament History */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Trophy className="w-5 h-5" />
                    <h4 className="font-bold uppercase text-xs tracking-wider">Historial de Torneos</h4>
                  </div>
                  <div className="space-y-3">
                    {selectedPlayer.tournamentHistory.map((history, idx) => (
                      <div key={idx} className="p-4 border border-outline-variant rounded-2xl space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-on-surface">{history.tournamentName}</p>
                            <p className="text-xs text-on-surface-variant">{history.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                            history.stage === 'Campeón' ? 'bg-secondary/10 text-secondary' : 'bg-surface-container-highest/50 text-on-surface-variant'
                          }`}>
                            {history.stage}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface">Categoría: <span className="font-bold">{history.category}</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
