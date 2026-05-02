/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

// Types
import { Tournament, Category, Screen } from './types';

// Components
import { ConfirmationModal } from './components/modals/ConfirmationModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { CreateTournamentModal } from './components/modals/CreateTournamentModal';
import { QuickInscribeModal } from './components/modals/QuickInscribeModal';
import { QuickCategoryModal } from './components/modals/QuickCategoryModal';
import { BackgroundDecorations } from './components/BackgroundDecorations';
import { MainLayout } from './layouts/MainLayout';

// Data & Hooks
import { mockTournaments, mockCategories } from './utils/mockData';
import { useFilteredData } from './hooks/useFilteredData';

// Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Tournaments } from './pages/Tournaments';
import { Categories } from './pages/Categories';
import { ManageCategory } from './pages/ManageCategory';
import { Players } from './pages/Players';
import { Settings } from './pages/Settings';

export default function App() {
  // --- State ---
  const [screen, setScreen] = useState<Screen>('login');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  
  // Filters
  const [tournamentSearch, setTournamentSearch] = useState('');
  const [tournamentStatusFilter, setTournamentStatusFilter] = useState('Todos');
  const [tournamentFilters, setTournamentFilters] = useState({
    name: '',
    location: '',
    date: '',
    category: ''
  });
  const [categorySearch, setCategorySearch] = useState('');
  const [categoryStatusFilter, setCategoryStatusFilter] = useState('Todos');

  // UI State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateTournamentOpen, setIsCreateTournamentOpen] = useState(false);
  const [isQuickInscribeOpen, setIsQuickInscribeOpen] = useState(false);
  const [isQuickCategoryOpen, setIsQuickCategoryOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ 
    isOpen: boolean; 
    title: string; 
    message: string; 
    onConfirm: () => void 
  } | null>(null);

  // --- Hooks ---
  const { 
    filteredTournaments, 
    isSearching, 
    filteredCategories, 
    isSearchingCategory 
  } = useFilteredData({
    tournaments,
    categories,
    tournamentSearch,
    tournamentFilters,
    tournamentStatusFilter,
    categorySearch,
    categoryStatusFilter
  });

  // --- Effects ---
  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- Handlers ---
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setScreen('dashboard');
  };

  const handleManageTournament = (t: Tournament) => {
    setSelectedTournament(t);
    setScreen('categories');
  };

  const handleManageCategory = (c: Category) => {
    setSelectedCategory(c);
    setScreen('manage-category');
  };

  const handleDeleteTournament = (id: string) => {
    const tournament = tournaments.find(t => t.id === id);
    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Torneo',
      message: `¿Estás seguro de que deseas eliminar el torneo "${tournament?.title}"? Esta acción no se puede deshacer.`,
      onConfirm: () => {
        setTournaments(prev => prev.filter(t => t.id !== id));
        setConfirmModal(null);
      }
    });
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Categoría',
      message: `¿Estás seguro de que deseas eliminar la categoría "${category?.name}"? Esta acción no se puede deshacer.`,
      onConfirm: () => {
        setCategories(prev => prev.filter(c => c.id !== id));
        setConfirmModal(null);
      }
    });
  };

  const handleCreateTournament = (data: any) => {
    // Logic to add tournament would go here
    setIsCreateTournamentOpen(false);
  };

  const handleQuickInscribe = (data: any) => {
    // Logic to inscribe pair would go here
    console.log('Quick Inscribe:', data);
    setIsQuickInscribeOpen(false);
  };

  const handleQuickCategory = (data: any) => {
    // Logic to add category would go here
    console.log('Quick Category:', data);
    setIsQuickCategoryOpen(false);
  };

  return (
    <div className={`relative min-h-screen text-on-surface kinetic-gradient ${isDarkMode ? 'dark' : ''}`}>
      {/* Theme Toggle for Auth Screens */}
      {(screen === 'login' || screen === 'register') && (
        <button 
          onClick={toggleTheme} 
          className="absolute top-6 right-6 p-3 rounded-full bg-surface-container-highest/50 text-on-surface-variant hover:text-primary transition-colors z-50 backdrop-blur-sm"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {screen === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onRegister={() => setScreen('register')} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
        )}

        {screen === 'register' && (
          <Register 
            onRegister={(e) => { e.preventDefault(); setScreen('dashboard'); }} 
            onLogin={() => setScreen('login')} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
        )}

        {['dashboard', 'tournaments', 'categories', 'manage-category', 'settings', 'players'].includes(screen) && (
          <MainLayout
            screen={screen}
            setScreen={setScreen}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            setIsProfileOpen={setIsProfileOpen}
            isLargeScreen={isLargeScreen}
            selectedTournament={selectedTournament}
            selectedCategory={selectedCategory}
            onCreateTournament={() => setIsCreateTournamentOpen(true)}
            onQuickInscribe={() => setIsQuickInscribeOpen(true)}
            onQuickCategory={() => setIsQuickCategoryOpen(true)}
          >
            <AnimatePresence mode="wait">
              {screen === 'dashboard' && (
                <Dashboard 
                  tournaments={tournaments} 
                  onManageTournament={handleManageTournament} 
                  onViewAllTournaments={() => setScreen('tournaments')} 
                  setScreen={setScreen}
                  onCreateTournament={() => setIsCreateTournamentOpen(true)}
                  onQuickInscribe={() => setIsQuickInscribeOpen(true)}
                  onQuickCategory={() => setIsQuickCategoryOpen(true)}
                />
              )}

              {screen === 'tournaments' && (
                <Tournaments 
                  tournaments={filteredTournaments} 
                  tournamentSearch={tournamentSearch} 
                  setTournamentSearch={setTournamentSearch} 
                  tournamentStatusFilter={tournamentStatusFilter} 
                  setTournamentStatusFilter={setTournamentStatusFilter} 
                  onManageTournament={handleManageTournament} 
                  onDeleteTournament={handleDeleteTournament}
                  onCreateTournament={() => setIsCreateTournamentOpen(true)}
                  isSearching={isSearching}
                />
              )}

              {screen === 'categories' && (
                <Categories 
                  categories={filteredCategories} 
                  categorySearch={categorySearch} 
                  setCategorySearch={setCategorySearch} 
                  categoryStatusFilter={categoryStatusFilter} 
                  setCategoryStatusFilter={setCategoryStatusFilter} 
                  onManageCategory={handleManageCategory} 
                  onDeleteCategory={handleDeleteCategory}
                  onCreateCategory={() => setIsQuickCategoryOpen(true)}
                  onBack={() => setScreen('tournaments')}
                  selectedTournament={selectedTournament}
                  isSearching={isSearchingCategory}
                />
              )}

              {screen === 'manage-category' && (
                <ManageCategory 
                  category={selectedCategory} 
                  onBack={() => setScreen('categories')} 
                />
              )}

              {screen === 'settings' && (
                <Settings 
                  onLogout={() => { setScreen('login'); setIsProfileOpen(false); }} 
                  setScreen={setScreen}
                />
              )}
              {screen === 'players' && <Players />}
            </AnimatePresence>

            {/* Modals */}
            <ConfirmationModal 
              isOpen={confirmModal?.isOpen || false}
              title={confirmModal?.title || ''}
              message={confirmModal?.message || ''}
              onConfirm={() => {
                if (confirmModal?.onConfirm) confirmModal.onConfirm();
                setConfirmModal(null);
              }}
              onCancel={() => setConfirmModal(null)}
            />

            <ProfileModal 
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              onLogout={() => {
                setIsProfileOpen(false);
                setScreen('login');
              }}
            />

            <CreateTournamentModal 
              isOpen={isCreateTournamentOpen}
              onClose={() => setIsCreateTournamentOpen(false)}
              onCreate={handleCreateTournament}
            />

            <QuickInscribeModal 
              isOpen={isQuickInscribeOpen}
              onClose={() => setIsQuickInscribeOpen(false)}
              onInscribe={handleQuickInscribe}
              tournaments={tournaments}
              initialTournamentId={selectedTournament?.id}
            />

            <QuickCategoryModal 
              isOpen={isQuickCategoryOpen}
              onClose={() => setIsQuickCategoryOpen(false)}
              onCreate={handleQuickCategory}
              tournaments={tournaments}
              initialTournamentId={selectedTournament?.id}
            />
          </MainLayout>
        )}
      </AnimatePresence>

      <BackgroundDecorations />
    </div>
  );
}
