import { useState, useEffect, useCallback } from 'react';
import { CommandesService } from '../services/commandesServiceCentral.js';
import { filterCommandes, sortCommandes } from '../utils/commandesHelpers.js';

export const useCommandes = () => {
  const [commandes, setCommandes] = useState([]);
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

  // Charger les commandes
  const loadCommandes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CommandesService.getAllCommandes();
      setCommandes(data);
      
      // Charger les statistiques
      const statsData = await CommandesService.getCommandesStats();
      setStats(statsData);
      
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des commandes:', err);
      setError('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Effet pour charger les données au montage
  useEffect(() => {
    loadCommandes();
  }, [loadCommandes]);

  // Gestion des filtres
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
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

  // Gestion du tri
  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  // Ajouter une commande
  const addCommande = useCallback(async (commandeData) => {
    try {
      setLoading(true);
      const newCommande = await CommandesService.addCommande(commandeData);
      setCommandes(prev => [newCommande, ...prev]);
      
      // Recharger les stats
      const statsData = await CommandesService.getCommandesStats();
      setStats(statsData);
      
      return { success: true, data: newCommande };
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la commande:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Modifier une commande
  const updateCommande = useCallback(async (id, commandeData) => {
    try {
      setLoading(true);
      const updatedCommande = await CommandesService.updateCommande(id, commandeData);
      setCommandes(prev => prev.map(commande => 
        commande.id === id ? updatedCommande : commande
      ));
      
      // Recharger les stats
      const statsData = await CommandesService.getCommandesStats();
      setStats(statsData);
      
      return { success: true, data: updatedCommande };
    } catch (err) {
      console.error('Erreur lors de la modification de la commande:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer une commande
  const deleteCommande = useCallback(async (id) => {
    try {
      setLoading(true);
      await CommandesService.deleteCommande(id);
      setCommandes(prev => prev.filter(commande => commande.id !== id));
      
      // Recharger les stats
      const statsData = await CommandesService.getCommandesStats();
      setStats(statsData);
      
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la suppression de la commande:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer une commande par ID
  const getCommandeById = useCallback(async (id) => {
    try {
      const commande = await CommandesService.getCommandeById(id);
      return { success: true, data: commande };
    } catch (err) {
      console.error('Erreur lors de la récupération de la commande:', err);
      return { success: false, error: err.message };
    }
  }, []);

  // Rafraîchir les données
  const refreshData = useCallback(async () => {
    await loadCommandes();
  }, [loadCommandes]);

  // Calculer les commandes filtrées
  const filteredCommandes = filterCommandes(commandes, filters);
  const sortedCommandes = sortCommandes(filteredCommandes, sortConfig);

  return {
    commandes: sortedCommandes,
    loading,
    error,
    filters,
    sortConfig,
    stats,
    handleFilterChange,
    resetFilters,
    handleSort,
    addCommande,
    updateCommande,
    deleteCommande,
    getCommandeById,
    refreshData
  };
};
