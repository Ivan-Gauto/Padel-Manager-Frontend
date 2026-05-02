import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Trophy, Settings, Sun, Moon, User, Users, Landmark } from 'lucide-react';
import { Logo } from '../components/Logo';

export const Sidebar = ({ screen, setScreen, isDarkMode, toggleTheme, setIsProfileOpen }: any) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const items = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'tournaments', label: 'Torneos', icon: Trophy },
    { id: 'players', label: 'Jugadores', icon: Users },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <aside 
      className="hidden lg:flex flex-col fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-300"
      style={{ left: 'max(16px, calc(50% - 900px + 16px))' }}
    >
      <div className="glass-card rounded-[2rem] p-3 flex flex-col items-center gap-6">
        
        {/* Logo Area */}
        <div className="pt-2 pb-4 border-b border-outline/20 w-full flex justify-center overflow-hidden">
          <Logo imageClassName="h-10" reduced={true} />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-3 relative">
          {items.map((item) => {
            const isActive = (item.id === 'tournaments' && (screen === 'tournaments' || screen === 'categories' || screen === 'manage-category')) || screen === item.id;
            
            return (
              <div 
                key={item.id} 
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => setScreen(item.id)}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 relative z-10 ${
                    isActive 
                      ? 'bg-primary text-on-primary scale-110' 
                      : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface hover:scale-110'
                  }`}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </button>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-surface-container-highest text-on-surface font-bold text-sm rounded-xl shadow-xl whitespace-nowrap pointer-events-none border border-outline/10 z-50"
                    >
                      {item.label}
                      {/* Tooltip Arrow */}
                      <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-surface-container-highest rotate-45 border-l border-b border-outline/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-outline/20 w-full flex flex-col gap-3">
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredItem('theme')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button 
              onClick={toggleTheme}
              className="w-12 h-12 flex items-center justify-center rounded-2xl text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface hover:scale-110 transition-all duration-300"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <AnimatePresence>
              {hoveredItem === 'theme' && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-surface-container-highest text-on-surface font-bold text-sm rounded-xl shadow-xl whitespace-nowrap pointer-events-none border border-outline/10 z-50"
                >
                  {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-surface-container-highest rotate-45 border-l border-b border-outline/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="relative group"
            onMouseEnter={() => setHoveredItem('profile')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface hover:scale-110 transition-all duration-300"
            >
              <User size={22} />
            </button>
            <AnimatePresence>
              {hoveredItem === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-surface-container-highest text-on-surface font-bold text-sm rounded-xl shadow-xl whitespace-nowrap pointer-events-none border border-outline/10 z-50"
                >
                  Perfil
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-surface-container-highest rotate-45 border-l border-b border-outline/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </aside>
  );
};
