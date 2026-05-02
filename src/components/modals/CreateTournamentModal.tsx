import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Plus, DollarSign, Trophy, Layers, MapPin, Tag } from 'lucide-react';

interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tournament: any) => void;
}

export function CreateTournamentModal({ isOpen, onClose, onCreate }: CreateTournamentModalProps) {
  const [categoryType, setCategoryType] = useState('level');
  const [level, setLevel] = useState('5ta');
  const [gender, setGender] = useState('caballeros');
  const [sumValue, setSumValue] = useState('');
  const [ageGroup, setAgeGroup] = useState('+35');
  const [addedCategories, setAddedCategories] = useState<string[]>([]);
  const [tournamentName, setTournamentName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');

  const handleTypeChange = (type: string) => {
    setCategoryType(type);
    // Reset defaults for the new type
    if (type === 'level') setLevel('5ta');
    if (type === 'menores') setAgeGroup('Sub 12');
    if (type === 'veterans') setAgeGroup(gender === 'caballeros' ? '+35' : '+30');
  };

  const handleAddCategory = () => {
    const newCat = categoryType === 'level' 
      ? `${level} ${gender}` 
      : categoryType === 'sum_cat' 
        ? `Suma ${sumValue} ${gender}` 
        : categoryType === 'veterans' 
          ? `Veteranos ${ageGroup} ${gender}` 
          : categoryType === 'menores'
            ? `Menores ${ageGroup} ${gender}`
            : `Suma Edades ${sumValue} ${gender}`;
    
    if (!addedCategories.includes(newCat)) {
      setAddedCategories([...addedCategories, newCat]);
    }
  };

  const removeCategory = (index: number) => {
    setAddedCategories(addedCategories.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      name: tournamentName,
      startDate,
      endDate,
      price,
      categories: addedCategories
    });
    // Reset
    setTournamentName('');
    setStartDate('');
    setEndDate('');
    setPrice('');
    setAddedCategories([]);
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
            className="glass-card w-full max-w-2xl rounded-2xl relative z-10 flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-outline-variant/60 bg-surface-container/50">
              <h2 className="font-headline font-extrabold text-xl lg:text-2xl text-on-surface">Crear Nuevo Torneo</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 max-h-[80vh] no-scrollbar">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Trophy size={14} className="text-primary" /> Nombre del Torneo
                  </label>
                  <input 
                    type="text" 
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                    className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                    placeholder="Ej. Master Final Madrid"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Calendar size={14} className="text-secondary" /> Fecha de Inicio
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
                      <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl pl-11 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Calendar size={14} className="text-secondary" /> Fecha de Fin
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
                      <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl pl-11 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                    <DollarSign size={14} className="text-tertiary" /> Valor de Inscripción por Pareja
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={18} />
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl pl-11 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                      placeholder="Ej. 15000"
                      required
                    />
                  </div>
                </div>

                <div className="h-px bg-outline-variant/30 my-2" />

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layers size={14} className="text-primary" /> Categorías del Torneo
                  </label>
                  <div className="bg-surface/30 dark:bg-surface-container-highest/10 border border-outline-variant/40 rounded-2xl p-4 lg:p-6 space-y-6">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'level', label: 'Libres' },
                        { id: 'menores', label: 'Menores' },
                        { id: 'veterans', label: 'Veteranos' },
                        { id: 'sum_cat', label: 'Suma Cat.' },
                        { id: 'sum_age', label: 'Suma Edades' }
                      ].map((type) => (
                        <button 
                          key={type.id}
                          type="button"
                          onClick={() => handleTypeChange(type.id)} 
                          className={`py-2.5 text-[10px] font-bold rounded-xl border transition-all ${
                            categoryType === type.id 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                          />
                          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl px-3 py-2.5 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium">
                            {['caballeros', 'damas'].map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                          </select>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      type="button"
                      onClick={handleAddCategory}
                      className="w-full py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-xs hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={16} />
                      Añadir a la lista
                    </button>
                  </div>

                  {addedCategories.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {addedCategories.map((cat, i) => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          key={i} 
                          className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"
                        >
                          {cat}
                          <button 
                            type="button"
                            onClick={() => removeCategory(i)} 
                            className="text-primary/60 hover:text-primary transition-colors"
                          >
                            <X size={12} strokeWidth={3} />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={!tournamentName || addedCategories.length === 0}
                  className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold text-sm btn-primary-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Plus size={18} />
                  Crear Torneo
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

