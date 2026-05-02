import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trophy, Layers } from 'lucide-react';
import { Tournament } from '../../types';

interface QuickCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
  tournaments: Tournament[];
  initialTournamentId?: string;
}

export function QuickCategoryModal({ isOpen, onClose, onCreate, tournaments, initialTournamentId }: QuickCategoryModalProps) {
  const [selectedTournamentId, setSelectedTournamentId] = useState(initialTournamentId || '');
  const [categoryType, setCategoryType] = useState('level');

  // Update selectedTournamentId if initialTournamentId changes
  React.useEffect(() => {
    if (initialTournamentId) {
      setSelectedTournamentId(initialTournamentId);
    }
  }, [initialTournamentId]);
  const [level, setLevel] = useState('5ta');
  const [gender, setGender] = useState('caballeros');
  const [sumValue, setSumValue] = useState('');
  const [ageGroup, setAgeGroup] = useState('+35');

  const handleTypeChange = (type: string) => {
    setCategoryType(type);
    if (type === 'level') setLevel('5ta');
    if (type === 'menores') setAgeGroup('Sub 12');
    if (type === 'veterans') setAgeGroup(gender === 'caballeros' ? '+35' : '+30');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournamentId) return;

    const categoryName = categoryType === 'level' 
      ? `${level} ${gender}` 
      : categoryType === 'sum_cat' 
        ? `Suma ${sumValue} ${gender}` 
        : categoryType === 'veterans' 
          ? `Veteranos ${ageGroup} ${gender}` 
          : categoryType === 'menores'
            ? `Menores ${ageGroup} ${gender}`
            : `Suma Edades ${sumValue} ${gender}`;
    
    onCreate({
      tournamentId: selectedTournamentId,
      categoryName
    });
    
    // Reset
    setSelectedTournamentId('');
    setSumValue('');
    onClose();
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
              <h2 className="font-headline font-extrabold text-xl text-on-surface">Añadir Categoría</h2>
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

                <div className="h-px bg-outline-variant/30 my-2" />

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layers size={14} className="text-secondary" /> Tipo de Categoría
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      type="button"
                      onClick={() => handleTypeChange('level')} 
                      className={`py-2 text-[9px] font-bold rounded-xl border transition-all ${
                        categoryType === 'level' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      Libres
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleTypeChange('menores')} 
                      className={`py-2 text-[9px] font-bold rounded-xl border transition-all ${
                        categoryType === 'menores' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      Menores
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleTypeChange('veterans')} 
                      className={`py-2 text-[9px] font-bold rounded-xl border transition-all ${
                        categoryType === 'veterans' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      Veteranos
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleTypeChange('sum_cat')} 
                      className={`py-2 text-[9px] font-bold rounded-xl border transition-all ${
                        categoryType === 'sum_cat' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      Suma Cat.
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleTypeChange('sum_age')} 
                      className={`py-2 text-[9px] font-bold rounded-xl border transition-all ${
                        categoryType === 'sum_age' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      Suma Edades
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {categoryType === 'level' && (
                      <>
                        <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium">
                          {['2da', '3ra', '4ta', '5ta', '6ta', '7ma Prom.'].map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium">
                          {['caballeros', 'damas'].map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                        </select>
                      </>
                    )}
                    {categoryType === 'menores' && (
                      <>
                        <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium">
                          {['Sub 12', 'Sub 14', 'Sub 16', 'Sub 18'].map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium">
                          {['caballeros', 'damas'].map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                        </select>
                      </>
                    )}
                    {categoryType === 'veterans' && (
                      <>
                        <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium">
                          {gender === 'caballeros' 
                            ? ['+35', '+40', '+45', '+50', '+55', '+60'].map(a => <option key={a} value={a}>{a}</option>)
                            : ['+30', '+35', '+40', '+45', '+50', '+55'].map(a => <option key={a} value={a}>{a}</option>)
                          }
                        </select>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium">
                          {['caballeros', 'damas'].map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                        </select>
                      </>
                    )}
                    {(categoryType === 'sum_cat' || categoryType === 'sum_age') && (
                      <div className="col-span-2 space-y-4">
                        <input 
                          type="number" 
                          value={sumValue} 
                          onChange={(e) => setSumValue(e.target.value)} 
                          placeholder={categoryType === 'sum_cat' ? "Ej. 11" : "Ej. 90"} 
                          className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" 
                          required
                        />
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium">
                          {['caballeros', 'damas'].map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold text-sm btn-primary-glow flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Crear Categoría
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
