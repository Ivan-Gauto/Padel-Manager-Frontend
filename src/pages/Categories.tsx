import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, ArrowLeft, LayoutGrid, DollarSign } from 'lucide-react';
import { CategoryCard } from '../components/cards/CategoryCard';
import { Category, Tournament } from '../types';
import { TournamentAccounting } from './TournamentAccounting';

interface CategoriesProps {
  categories: Category[];
  categorySearch: string;
  setCategorySearch: (s: string) => void;
  categoryStatusFilter: string;
  setCategoryStatusFilter: (s: string) => void;
  onManageCategory: (c: Category) => void;
  onDeleteCategory: (id: string) => void;
  onCreateCategory: () => void;
  onBack: () => void;
  selectedTournament: Tournament | null;
  isSearching: boolean;
}

export function Categories({ 
  categories, 
  categorySearch, 
  setCategorySearch, 
  categoryStatusFilter, 
  setCategoryStatusFilter, 
  onManageCategory, 
  onDeleteCategory,
  onCreateCategory,
  onBack,
  selectedTournament,
  isSearching
}: CategoriesProps) {
  const [activeTab, setActiveTab] = useState<'categorias' | 'contabilidad'>('categorias');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 lg:space-y-8"
    >
      <section>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold text-sm mb-6 hover:underline"
        >
          <ArrowLeft size={16} /> Volver a Torneos
        </button>
        <h1 className="font-headline font-extrabold text-2xl lg:text-3xl tracking-tight text-on-surface mb-1 lg:mb-2">Torneo: {selectedTournament?.title}</h1>
        
        <p className="text-on-surface-variant/80 text-xs lg:text-sm font-medium mb-6 lg:mb-8 leading-relaxed max-w-2xl">Gestiona las diferentes categorías y la contabilidad de este torneo.</p>
        
        <div className="flex border-b border-outline-variant/60 w-full mb-6">
          <button
            onClick={() => setActiveTab('categorias')}
            className={`flex-1 px-2 sm:px-6 py-4 text-xs sm:text-sm font-bold tracking-tight transition-all relative ${
              activeTab === 'categorias' 
                ? 'text-primary' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="truncate block">Categorías</span>
            {activeTab === 'categorias' && (
              <motion.div
                layoutId="active-tournament-tab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('contabilidad')}
            className={`flex-1 px-2 sm:px-6 py-4 text-xs sm:text-sm font-bold tracking-tight transition-all relative ${
              activeTab === 'contabilidad' 
                ? 'text-primary' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="truncate block">Contabilidad</span>
            {activeTab === 'contabilidad' && (
              <motion.div
                layoutId="active-tournament-tab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
              />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'categorias' && (
            <motion.div
              key="categorias"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative group mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                <input 
                  className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                  placeholder="Buscar categoría" 
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <nav className="flex gap-3 overflow-x-auto no-scrollbar pb-1 sm:pb-0 w-full sm:w-auto">
                  {['Todos', 'En curso', 'Finalizados'].map(status => (
                    <button 
                      key={status}
                      onClick={() => setCategoryStatusFilter(status)}
                      className={`whitespace-nowrap px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${categoryStatusFilter === status ? 'bg-primary text-on-primary' : 'glass-card text-on-surface-variant hover:text-on-surface'}`}
                    >
                      {status}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {categories.length > 0 && !isSearching && (
                  <button 
                    onClick={onCreateCategory}
                    className="glass-card flex flex-col items-center justify-center min-h-[320px] rounded-2xl border border-dashed border-outline-variant hover:border-primary/50 transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <Plus size={32} strokeWidth={2.5} />
                    </div>
                    <span className="font-headline font-bold text-lg text-on-surface">Crear Categoría</span>
                  </button>
                )}
                
                {categories.length > 0 ? (
                  categories.map(c => (
                    <CategoryCard key={c.id} category={c} onManage={onManageCategory} onDelete={onDeleteCategory} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant mb-4">
                      <Search size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">No se encontraron categorías</h3>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'contabilidad' && (
            <motion.div
              key="contabilidad"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TournamentAccounting tournament={selectedTournament} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
