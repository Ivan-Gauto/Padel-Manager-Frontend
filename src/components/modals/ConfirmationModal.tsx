import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  type = 'danger'
}: ConfirmationModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={32} />;
      default:
        return <Trash2 size={32} />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'warning':
        return 'bg-amber-500/10 text-amber-500';
      case 'info':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-rose-500/10 text-rose-500';
    }
  };

  const getButtonClasses = () => {
    switch (type) {
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-600 text-white';
      case 'info':
        return 'bg-primary hover:bg-primary/90 text-on-primary';
      default:
        return 'bg-rose-500 hover:bg-rose-600 text-white';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-surface/95 backdrop-blur-xl w-full max-w-sm rounded-2xl p-6 relative z-10 border border-outline-variant shadow-2xl"
          >
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 rounded-full ${getColorClasses()} flex items-center justify-center mx-auto`}>
                {getIcon()}
              </div>
              <div>
                <h3 className="text-xl font-headline font-black text-on-surface">{title}</h3>
                <p className="text-sm text-on-surface-variant mt-2">{message}</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={onCancel}
                  className="flex-1 py-3 rounded-xl bg-surface/50 text-on-surface font-bold text-sm border border-outline-variant hover:bg-surface-container-highest/80 transition-all"
                >
                  {cancelText}
                </button>
                <button 
                  onClick={onConfirm}
                  className={`flex-1 py-3 rounded-xl ${getButtonClasses()} font-bold text-sm transition-all`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
