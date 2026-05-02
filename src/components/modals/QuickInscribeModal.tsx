import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Search, DollarSign, Trophy, Layers } from 'lucide-react';
import { Tournament } from '../../types';

interface QuickInscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInscribe: (data: any) => void;
  tournaments: Tournament[];
  initialTournamentId?: string;
}

export function QuickInscribeModal({ isOpen, onClose, onInscribe, tournaments, initialTournamentId }: QuickInscribeModalProps) {
  const [selectedTournamentId, setSelectedTournamentId] = useState(initialTournamentId || '');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Update selectedTournamentId if initialTournamentId changes
  React.useEffect(() => {
    if (initialTournamentId) {
      setSelectedTournamentId(initialTournamentId);
    }
  }, [initialTournamentId]);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'partial' | 'paid'>('unpaid');
  const [depositAmount, setDepositAmount] = useState('');

  const selectedTournament = tournaments.find(t => t.id === selectedTournamentId);

  useEffect(() => {
    if (selectedTournament && selectedTournament.categories.length > 0) {
      setSelectedCategory(selectedTournament.categories[0]);
    } else {
      setSelectedCategory('');
    }
  }, [selectedTournamentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1 && player2 && selectedTournamentId && selectedCategory) {
      onInscribe({
        tournamentId: selectedTournamentId,
        category: selectedCategory,
        player1,
        player2,
        paymentStatus,
        depositAmount: paymentStatus === 'partial' ? depositAmount : (paymentStatus === 'paid' ? 'full' : '0'),
      });
      // Reset
      setPlayer1('');
      setPlayer2('');
      setPaymentStatus('unpaid');
      setDepositAmount('');
      setSelectedTournamentId('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-card w-full max-w-md rounded-2xl relative z-10 flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-outline-variant/60 bg-surface-container/50">
              <h2 className="font-headline font-extrabold text-xl text-on-surface">Inscribir Pareja</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar">
              <div className="space-y-4">
                {/* Tournament Selection */}
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Trophy size={14} className="text-primary" /> Seleccionar Torneo
                  </label>
                  <select 
                    value={selectedTournamentId}
                    onChange={(e) => setSelectedTournamentId(e.target.value)}
                    className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                    required
                  >
                    <option value="">Elegir un torneo...</option>
                    {tournaments.map(t => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>

                {/* Category Selection */}
                {selectedTournament && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Layers size={14} className="text-secondary" /> Categoría
                    </label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-sm"
                      required
                    >
                      {selectedTournament.categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </motion.div>
                )}

                <div className="h-px bg-outline-variant/30 my-2" />

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Jugador 1</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                    <input 
                      type="text" 
                      value={player1}
                      onChange={(e) => setPlayer1(e.target.value)}
                      className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl pl-11 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                      placeholder="Nombre completo..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Jugador 2</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                    <input 
                      type="text" 
                      value={player2}
                      onChange={(e) => setPlayer2(e.target.value)}
                      className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl pl-11 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                      placeholder="Nombre completo..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Estado de Pago</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentStatus('unpaid')}
                      className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${paymentStatus === 'unpaid' ? 'bg-surface-container-highest border-outline-variant text-on-surface' : 'border-outline/50 text-on-surface-variant hover:bg-surface/50'}`}
                    >
                      Sin Pagar
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentStatus('partial')}
                      className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${paymentStatus === 'partial' ? 'bg-secondary/10 border-secondary/50 text-secondary' : 'border-outline/50 text-on-surface-variant hover:bg-surface/50'}`}
                    >
                      Señado
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentStatus('paid')}
                      className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${paymentStatus === 'paid' ? 'bg-tertiary/10 border-tertiary/50 text-tertiary' : 'border-outline/50 text-on-surface-variant hover:bg-surface/50'}`}
                    >
                      Pagado
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {paymentStatus === 'partial' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Monto de la Seña</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                          <input 
                            type="number" 
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl pl-11 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-sm"
                            placeholder="Ej. 5000"
                            required={paymentStatus === 'partial'}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold text-sm btn-primary-glow flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} />
                  Inscribir Pareja
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
