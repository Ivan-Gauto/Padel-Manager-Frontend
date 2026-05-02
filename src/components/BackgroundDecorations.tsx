import React from 'react';
import { motion } from 'framer-motion';

export function BackgroundDecorations() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      {/* Subtle blur gradients */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />
    </div>
  );
}
