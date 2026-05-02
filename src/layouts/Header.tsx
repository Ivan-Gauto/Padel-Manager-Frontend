import React from 'react';
import { ChevronRight, Sun, Moon, User } from 'lucide-react';
import { Logo } from '../components/Logo';
import { IconButton } from '../components/IconButton';
import { Tournament, Category } from '../types';

interface HeaderProps {
  screen: string;
  setScreen: (screen: any) => void;
  isLargeScreen: boolean;
  selectedTournament: Tournament | null;
  selectedCategory: Category | null;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setIsProfileOpen: (open: boolean) => void;
}

export function Header({
  screen,
  setScreen,
  isLargeScreen,
  selectedTournament,
  selectedCategory,
  isDarkMode,
  toggleTheme,
  setIsProfileOpen,
}: HeaderProps) {
  return (
    <header className="fixed top-0 lg:top-6 right-0 left-0 z-40 h-16 transition-all duration-300 pointer-events-none flex justify-center">
      <div className="w-full max-w-[1800px] px-4 lg:px-20 flex items-center justify-between h-full">
        <div className="lg:hidden pointer-events-auto">
          <Logo reduced={true} />
        </div>
        
        <div className="hidden lg:flex items-center gap-6 pointer-events-auto flex-1 lg:pl-24">
          <nav className="flex items-center gap-2 text-sm font-medium glass-card px-8 py-2.5 rounded-2xl shrink-0">
          <button 
            onClick={() => setScreen('dashboard')}
            className={`transition-colors ${screen === 'dashboard' ? 'text-on-surface font-bold' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Inicio
          </button>

          {screen === 'tournaments' && (
            <>
              <ChevronRight size={14} className="text-on-surface-variant/40" />
              <span className="text-on-surface font-bold">Torneos</span>
            </>
          )}

          {screen === 'categories' && (
            <>
              <ChevronRight size={14} className="text-on-surface-variant/40" />
              <button 
                onClick={() => setScreen('tournaments')}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Torneos
              </button>
              <ChevronRight size={14} className="text-on-surface-variant/40" />
              <span className="text-on-surface font-bold truncate max-w-[200px]">
                {selectedTournament?.title}
              </span>
            </>
          )}

          {screen === 'manage-category' && (
            <>
              <ChevronRight size={14} className="text-on-surface-variant/40" />
              <button 
                onClick={() => setScreen('tournaments')}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Torneos
              </button>
              <ChevronRight size={14} className="text-on-surface-variant/40" />
              <button 
                onClick={() => setScreen('categories')}
                className="text-on-surface-variant hover:text-primary transition-colors truncate max-w-[150px]"
              >
                {selectedTournament?.title}
              </button>
              <ChevronRight size={14} className="text-on-surface-variant/40" />
              <span className="text-on-surface font-bold">
                {selectedCategory?.name}
              </span>
            </>
          )}

          {screen === 'players' && (
            <>
              <ChevronRight size={14} className="text-on-surface-variant/40" />
              <span className="text-on-surface font-bold">Jugadores</span>
            </>
          )}

          {screen === 'settings' && (
            <>
              <ChevronRight size={14} className="text-on-surface-variant/40" />
              <span className="text-on-surface font-bold">Configuración</span>
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3 lg:gap-4 pointer-events-auto">
        <IconButton 
          icon={isDarkMode ? Sun : Moon} 
          onClick={toggleTheme}
          className="lg:hidden"
        />
        <IconButton 
          icon={User} 
          onClick={() => setIsProfileOpen(true)}
          className="lg:hidden"
        />
      </div>
    </div>
  </header>
  );
}
