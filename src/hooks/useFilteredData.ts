import { useMemo } from 'react';
import { Tournament, Category } from '../types';

interface UseFilteredDataProps {
  tournaments: Tournament[];
  categories: Category[];
  tournamentSearch: string;
  tournamentFilters: any;
  tournamentStatusFilter: string;
  categorySearch: string;
  categoryStatusFilter: string;
}

export function useFilteredData({
  tournaments,
  categories,
  tournamentSearch,
  tournamentFilters,
  tournamentStatusFilter,
  categorySearch,
  categoryStatusFilter
}: UseFilteredDataProps) {
  const filteredTournaments = useMemo(() => {
    return tournaments.filter(t => {
      const searchLower = tournamentSearch.toLowerCase();
      const matchesSearch = t.title.toLowerCase().includes(searchLower) ||
                            t.court.toLowerCase().includes(searchLower) ||
                            t.dates.toLowerCase().includes(searchLower);
      
      const matchesName = t.title.toLowerCase().includes(tournamentFilters.name.toLowerCase());
      const matchesLocation = t.court.toLowerCase().includes(tournamentFilters.location.toLowerCase());
      const matchesDate = t.dates.toLowerCase().includes(tournamentFilters.date.toLowerCase());
      const matchesCategory = tournamentFilters.category === '' || t.categories.some(c => c.toLowerCase().includes(tournamentFilters.category.toLowerCase()));

      let matchesStatus = true;
      if (tournamentStatusFilter === 'En curso') {
        matchesStatus = t.status === 'EN CURSO' || t.status === 'PRÓXIMAMENTE';
      } else if (tournamentStatusFilter === 'Finalizados') {
        matchesStatus = t.status === 'COMPLETADO' || t.status === 'FINALIZADO';
      }

      return matchesSearch && matchesName && matchesLocation && matchesDate && matchesCategory && matchesStatus;
    });
  }, [tournaments, tournamentSearch, tournamentFilters, tournamentStatusFilter]);

  const isSearching = useMemo(() => {
    return tournamentSearch.trim() !== '' || Object.values(tournamentFilters).some((val: any) => val.trim() !== '') || tournamentStatusFilter !== 'Todos';
  }, [tournamentSearch, tournamentFilters, tournamentStatusFilter]);

  const filteredCategories = useMemo(() => {
    return categories.filter(c => {
      const searchLower = categorySearch.toLowerCase();
      const matchesSearch = c.name.toLowerCase().includes(searchLower) ||
             c.court.toLowerCase().includes(searchLower) ||
             c.status.toLowerCase().includes(searchLower) ||
             c.progress.toLowerCase().includes(searchLower);

      let matchesStatus = true;
      if (categoryStatusFilter === 'En curso') {
        matchesStatus = c.status === 'EN CURSO';
      } else if (categoryStatusFilter === 'Finalizados') {
        matchesStatus = c.status === 'COMPLETADO' || c.status === 'FINALIZADO';
      }

      return matchesSearch && matchesStatus;
    });
  }, [categories, categorySearch, categoryStatusFilter]);

  const isSearchingCategory = useMemo(() => {
    return categorySearch.trim() !== '' || categoryStatusFilter !== 'Todos';
  }, [categorySearch, categoryStatusFilter]);

  return {
    filteredTournaments,
    isSearching,
    filteredCategories,
    isSearchingCategory
  };
}
