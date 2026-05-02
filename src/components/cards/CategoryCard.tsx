import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, ArrowRight, Trash2, Layers } from 'lucide-react';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  onManage: (c: Category) => void;
  onDelete?: (id: string) => void;
  key?: string | number;
}

export function CategoryCard({ category, onManage, onDelete }: CategoryCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 group flex flex-col h-full relative">
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete?.(category.id); }}
        className="absolute top-3 right-3 z-20 p-2 text-primary hover:text-primary-dim hover:scale-110 transition-all"
        title="Eliminar categoría"
      >
        <Trash2 size={16} />
      </button>
      <div className="h-32 lg:h-40 relative overflow-hidden bg-primary/10 flex flex-col justify-end p-4 lg:p-6 flex-shrink-0">
        <div className="relative z-10 flex flex-col items-start">
          <div className="flex flex-row items-center gap-2 mb-2">
            <span className="bg-secondary-container text-on-secondary-container px-2.5 lg:px-3 py-1 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-wider">
              {category.pairs} PAREJAS
            </span>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${category.status === 'EN CURSO' ? 'bg-secondary/10 border-secondary/20 text-secondary animate-pulse' : category.status === 'COMPLETADO' ? 'bg-tertiary/10 border-tertiary/20 text-tertiary' : 'bg-primary/10 border-primary/20 text-primary'} backdrop-blur-md`}>
              {(category.status === 'EN CURSO' || category.status === 'COMPLETADO') && (
                <span className={`flex h-1.5 w-1.5 rounded-full ${category.status === 'EN CURSO' ? 'bg-secondary' : 'bg-tertiary'}`} />
              )}
              <span className="text-[8px] lg:text-[9px] font-black tracking-[0.1em] uppercase">
                {category.status}
              </span>
            </div>
          </div>
          <h3 className="text-3xl lg:text-4xl font-headline font-black text-on-surface leading-tight">{category.name}</h3>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Layers size={80} className="text-primary" />
        </div>
      </div>
      <div className="p-4 lg:p-6 bg-surface-container-low/50 flex flex-col flex-grow">
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <MapPin size={16} className="text-primary" />
            <div>
              <p className="text-[9px] lg:text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Cancha</p>
              <p className="text-xs lg:text-sm font-bold text-on-surface">{category.court}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <Users size={16} className="text-primary" />
            <div>
              <p className="text-[9px] lg:text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Inscritos</p>
              <p className="text-xs lg:text-sm font-bold text-on-surface">{category.pairs} Parejas</p>
            </div>
          </div>
        </div>
        <div className="space-y-1.5 lg:space-y-2 mb-6 lg:mb-8">
          <div className="flex justify-between items-end">
            <span className="text-[10px] lg:text-[11px] text-on-surface-variant font-bold uppercase tracking-wide">Progreso</span>
            <span className="text-[10px] lg:text-[11px] text-white font-bold uppercase tracking-wide">
              {category.progress === 'Finalizada' ? '100%' : 
               category.progress === 'Cuartos' ? '75%' : 
               category.progress === 'Zonas' ? '40%' : '10%'}
            </span>
          </div>
          <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: category.progress === 'Finalizada' ? '100%' : 
                       category.progress === 'Cuartos' ? '75%' : 
                       category.progress === 'Zonas' ? '40%' : '10%' 
              }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
        <button 
          onClick={() => onManage(category)}
          className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 group text-sm lg:text-base mt-auto hover:bg-primary/90 transition-colors"
        >
          Ver Detalles
          <ArrowRight size={16} className="arrow-icon group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
