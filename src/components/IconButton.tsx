import React from 'react';
import { motion } from 'motion/react';

export const IconButton = ({ icon: Icon, onClick, active = false, className = "" }: { icon: React.ElementType, onClick?: () => void, active?: boolean, className?: string }) => (
  <button 
    onClick={onClick}
    className={`p-2.5 lg:p-3 rounded-2xl transition-all duration-300 relative group flex items-center justify-center ${active ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'} ${className}`}
  >
    <Icon size={20} className="lg:size-[22px]" strokeWidth={active ? 2.5 : 2} />
    {active && (
      <motion.div 
        layoutId="nav-indicator"
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
      />
    )}
  </button>
);
