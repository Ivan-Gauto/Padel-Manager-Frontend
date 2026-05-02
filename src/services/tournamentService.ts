import { fetchWithAuth } from './apiService';
import { Tournament } from '../types';

export const tournamentService = {
  getAll: async (): Promise<Tournament[]> => {
    return fetchWithAuth('/tournaments');
  },
  
  getById: async (id: string): Promise<Tournament> => {
    return fetchWithAuth(`/tournaments/${id}`);
  },

  create: async (data: Partial<Tournament>): Promise<Tournament> => {
    return fetchWithAuth('/tournaments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<Tournament>): Promise<Tournament> => {
    return fetchWithAuth(`/tournaments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<void> => {
    return fetchWithAuth(`/tournaments/${id}`, {
      method: 'DELETE',
    });
  }
};
