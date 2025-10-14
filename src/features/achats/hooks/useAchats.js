import { useState, useEffect, useCallback } from 'react';
import { AchatsService } from '../services/achatsService.js';
import { filterAchats, sortAchats } from '../utils/achatsHelpers.js';

export const useAchats = () => {
  const [achats, setAchats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    statut: '',
    dateDebut: '',
    dateFin: '',
    fournisseur: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  const [stats, setStats] = useState({
    total: 0,
    payes: 0,
    enAttente: 0,
    annules: 0,
    montantTotal: 0,
    montantMoyen: 0
  });

  // Charger les achats
  const loadAchats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await AchatsService.getAllAchats();
      setAchats(data);
      
      // Charger les statistiques
      const statsData = await AchatsService.getAchatsStats();
      setStats(statsData);
      
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des achats:', err);
      setError('Erreur lors du chargement des achats');
    } finally {
      setLoading(false);
    }
  }, []);

  // Effet pour charger les données au montage
  useEffect(() => {
    loadAchats();
  }, [loadAchats]);

  // Filtrer et trier les achats
  const filteredAndSortedAchats = useCallback(() => {
    const filtered = filterAchats(achats, filters);
    return sortAchats(filtered, sortConfig.key, sortConfig.direction);
  }, [achats, filters, sortConfig]);

  // Gestion du tri
  const handleSort = useCallback((key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: 
        prevConfig.key === key && prevConfig.direction === 'asc' 
          ? 'desc' 
          : 'asc'
    }));
  }, []);

  // Gestion des filtres
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  // Réinitialiser les filtres
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      statut: '',
      dateDebut: '',
      dateFin: '',
      fournisseur: ''
    });
  }, []);

  // Ajouter un nouvel achat
  const addAchat = async (nouvelAchat) => {
    try {
      setLoading(true);
      await AchatsService.addAchat(nouvelAchat);
      await loadAchats(); // Recharger les données
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'achat:', err);
      return { success: false, error: 'Erreur lors de l\'ajout de l\'achat' };
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un achat
  const updateAchat = async (id, updatedAchat) => {
    try {
      setLoading(true);
      await AchatsService.updateAchat(id, updatedAchat);
      await loadAchats(); // Recharger les données
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'achat:', err);
      return { success: false, error: 'Erreur lors de la mise à jour de l\'achat' };
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un achat
  const deleteAchat = async (id) => {
    try {
      setLoading(true);
      await AchatsService.deleteAchat(id);
      await loadAchats(); // Recharger les données
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'achat:', err);
      return { success: false, error: 'Erreur lors de la suppression de l\'achat' };
    } finally {
      setLoading(false);
    }
  };

  return {
    achats: filteredAndSortedAchats(),
    loading,
    error,
    filters,
    sortConfig,
    stats,
    handleSort,
    handleFilterChange,
    resetFilters,
    addAchat,
    updateAchat,
    deleteAchat,
    refreshData: loadAchats
  };
};
