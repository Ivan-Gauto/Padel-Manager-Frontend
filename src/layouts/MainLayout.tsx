import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, LayoutDashboard, Trophy, Landmark, Settings as SettingsIcon, Users, UserPlus, Layers } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { IconButton } from '../components/IconButton';
import { Tournament, Category } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  screen: string;
  setScreen: (screen: any) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setIsProfileOpen: (open: boolean) => void;
  isLargeScreen: boolean;
  selectedTournament: Tournament | null;
  selectedCategory: Category | null;
  onCreateTournament: () => void;
  onQuickInscribe: () => void;
  onQuickCategory: () => void;
}

export function MainLayout({
  children,
  screen,
  setScreen,
  isDarkMode,
  toggleTheme,
  setIsProfileOpen,
  isLargeScreen,
  selectedTournament,
  selectedCategory,
  onCreateTournament,
  onQuickInscribe,
  onQuickCategory,
}: MainLayoutProps) {
  const [isFabMenuOpen, setIsFabMenuOpen] = React.useState(false);

  const quickActions = [
    { 
      label: 'Crear Torneo', 
      icon: Trophy, 
      onClick: () => { onCreateTournament(); setIsFabMenuOpen(false); },
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    { 
      label: 'Inscribir Pareja', 
      icon: UserPlus, 
      onClick: () => { onQuickInscribe(); setIsFabMenuOpen(false); },
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    { 
      label: 'Nueva Categoría', 
      icon: Layers, 
      onClick: () => { onQuickCategory(); setIsFabMenuOpen(false); },
      color: 'text-tertiary',
      bg: 'bg-tertiary/10',
    },
  ];

  return (
    <div className="flex min-h-screen bg-transparent justify-center">
      <div className="w-full max-w-[1800px] relative px-4 lg:px-20">
        <Sidebar 
          screen={screen} 
          setScreen={setScreen} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
          setIsProfileOpen={setIsProfileOpen}
        />
        
        <motion.div 
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 pb-32 lg:pl-24 transition-all duration-300"
        >
          <Header 
            screen={screen}
            setScreen={setScreen}
            isLargeScreen={isLargeScreen}
            selectedTournament={selectedTournament}
            selectedCategory={selectedCategory}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            setIsProfileOpen={setIsProfileOpen}
          />

          <main className="pt-20 lg:pt-36">
            {children}
          </main>

        {/* FAB */}
        <div className="fixed bottom-24 md:bottom-36 right-6 z-50 lg:hidden">
          <AnimatePresence>
            {isFabMenuOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFabMenuOpen(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                  className="absolute bottom-20 right-0 bg-surface border border-outline-variant rounded-2xl shadow-2xl p-2 w-56 overflow-hidden"
                >
                  <div className="flex flex-col">
                    {quickActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={action.onClick}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors text-left group"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${action.bg} ${action.color} group-active:scale-95 transition-transform`}>
                          <action.icon size={20} />
                        </div>
                        <span className="text-sm font-bold text-on-surface">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isFabMenuOpen ? 'bg-surface border border-outline-variant text-primary rotate-45' : 'bg-primary text-on-primary'
            }`}
          >
            <Plus size={32} strokeWidth={3} />
          </button>
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-6 md:bottom-12 left-0 w-full px-6 z-50 pointer-events-none flex justify-center lg:hidden">
          <nav className="floating-nav rounded-full flex justify-around items-center h-16 px-4 gap-1 pointer-events-auto w-full max-w-sm shadow-xl shadow-black/10">
            <IconButton icon={LayoutDashboard} onClick={() => setScreen('dashboard')} active={screen === 'dashboard'} />
            <IconButton icon={Trophy} onClick={() => setScreen('tournaments')} active={screen === 'tournaments' || screen === 'categories' || screen === 'manage-category'} />
            <IconButton icon={Users} onClick={() => setScreen('players')} active={screen === 'players'} />
            <IconButton icon={SettingsIcon} onClick={() => setScreen('settings')} active={screen === 'settings'} />
          </nav>
        </div>
      </motion.div>
    </div>
  </div>
  );
}
