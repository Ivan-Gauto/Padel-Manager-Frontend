import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy } from 'lucide-react';
import { Match, Pair } from '../../types';

interface MatchResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  pair1: Pair | undefined;
  pair2: Pair | undefined;
  onSave: (matchId: string, winnerId: string, score1: string, score2: string) => void;
}

export function MatchResultModal({ isOpen, onClose, match, pair1, pair2, onSave }: MatchResultModalProps) {
  const [winnerId, setWinnerId] = useState<string>('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');

  useEffect(() => {
    if (match) {
      setWinnerId(match.winnerId || '');
      setScore1(match.score1 === '0' && match.status === 'pending' ? '' : match.score1);
      setScore2(match.score2 === '0' && match.status === 'pending' ? '' : match.score2);
    }
  }, [match]);

  if (!isOpen || !match || !pair1 || !pair2) return null;

  const handleSave = () => {
    if (!winnerId) return;
    onSave(match.id, winnerId, score1 || '0', score2 || '0');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface-container-low border border-outline-variant/50 rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-outline-variant/50 flex justify-between items-center bg-surface/50">
              <h2 className="text-xl font-headline font-bold text-on-surface">Resultado del Partido</h2>
              <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                <X size={20} className="text-on-surface-variant" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Seleccionar Ganador</p>
                
                <button
                  onClick={() => setWinnerId(pair1.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${winnerId === pair1.id ? 'border-primary bg-primary/10' : 'border-outline-variant/50 bg-surface hover:border-primary/50'}`}
                >
                  <span className={`font-bold ${winnerId === pair1.id ? 'text-primary' : 'text-on-surface'}`}>
                    {pair1.player1} / {pair1.player2}
                  </span>
                  {winnerId === pair1.id && <Trophy size={20} className="text-primary" />}
                </button>

                <button
                  onClick={() => setWinnerId(pair2.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${winnerId === pair2.id ? 'border-primary bg-primary/10' : 'border-outline-variant/50 bg-surface hover:border-primary/50'}`}
                >
                  <span className={`font-bold ${winnerId === pair2.id ? 'text-primary' : 'text-on-surface'}`}>
                    {pair2.player1} / {pair2.player2}
                  </span>
                  {winnerId === pair2.id && <Trophy size={20} className="text-primary" />}
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Resultado (Opcional)</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-on-surface-variant mb-1 block">Sets Pareja 1</label>
                    <input
                      type="text"
                      value={score1}
                      onChange={(e) => setScore1(e.target.value)}
                      placeholder="Ej: 6-4, 6-2"
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-on-surface-variant mb-1 block">Sets Pareja 2</label>
                    <input
                      type="text"
                      value={score2}
                      onChange={(e) => setScore2(e.target.value)}
                      placeholder="Ej: 4-6, 2-6"
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-outline-variant/50 bg-surface/50 flex justify-end gap-3">
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-surface-container-highest transition-colors text-on-surface">
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                disabled={!winnerId}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar Resultado
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
