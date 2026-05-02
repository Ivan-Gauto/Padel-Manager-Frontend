import React from 'react';
import { motion } from 'motion/react';
import { User, IdCard, Phone, Mail, Lock, ArrowRight, Sun, Moon } from 'lucide-react';
import { Logo } from '../components/Logo';

interface RegisterProps {
  onRegister: (e: React.FormEvent) => void;
  onLogin: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function Register({ onRegister, onLogin, isDarkMode, toggleTheme }: RegisterProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center p-6 min-h-screen"
    >
      <button 
        onClick={toggleTheme} 
        className="absolute top-6 right-6 p-3 rounded-full bg-surface-container-highest/50 text-on-surface-variant hover:text-primary transition-colors z-50 backdrop-blur-sm"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-[480px] flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center w-full">
          <Logo imageClassName="h-12" />
          <div className="text-center space-y-2 mt-6">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
              Crea tu cuenta
            </h1>
            <p className="text-on-surface-variant text-sm">
              Regístrate como organizador para empezar
            </p>
          </div>
        </div>

        <div className="glass-card w-full rounded-2xl p-8">
          <form className="space-y-5" onSubmit={onRegister}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">
                  NOMBRE
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                  <input 
                    className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3.5 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                    placeholder="Juan" 
                    type="text" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">
                  APELLIDO
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                  <input 
                    className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3.5 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                    placeholder="Pérez" 
                    type="text" 
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">
                  DNI
                </label>
                <div className="relative group">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                  <input 
                    className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3.5 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                    placeholder="12345678" 
                    type="text" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">
                  TELÉFONO
                </label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                  <input 
                    className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3.5 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                    placeholder="+54 9 11 ..." 
                    type="tel" 
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">
                EMAIL
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                <input 
                  className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3.5 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                  placeholder="tu@email.com" 
                  type="email" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">
                CONTRASEÑA
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors" size={20} />
                <input 
                  className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-3.5 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm" 
                  placeholder="••••••••" 
                  type="password" 
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 btn-primary-glow flex items-center justify-center gap-2 group mt-2"
            >
              Crear Cuenta
              <ArrowRight size={18} className="arrow-icon group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-on-surface-variant text-sm">
            ¿Ya tienes una cuenta? 
            <button 
              onClick={onLogin}
              className="text-primary font-bold hover:underline decoration-primary/30 underline-offset-4 ml-1 transition-all"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
