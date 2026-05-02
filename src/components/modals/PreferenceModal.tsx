import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function PreferenceModal({ isOpen, onClose, title, children }: PreferenceModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
          className="relative w-full max-w-lg bg-surface-container-low border border-outline-variant rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/50">
            <h2 className="font-headline font-bold text-xl text-on-surface">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto glass-scrollbar">
            {children}
          </div>
          
          <div className="p-6 border-t border-outline-variant/50 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary text-on-primary btn-primary-glow"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
