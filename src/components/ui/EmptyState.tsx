import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
}

export function EmptyState({ icon: Icon, title, description, className = "", action }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-8 text-center space-y-4 ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center text-primary border border-primary">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-on-surface text-sm">{title}</h3>
        {description && (
          <p className="text-xs text-on-surface-variant/60 max-w-[200px] mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs flex items-center gap-2 btn-primary-glow transition-all active:scale-95"
        >
          {action.icon && <action.icon size={14} />}
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
