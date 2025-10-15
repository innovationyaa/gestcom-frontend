import { useState, useEffect } from "react";
import { FournisseursService } from "../services/fournisseursService";

export function useFournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    actifs: 0,
    inactifs: 0,
    suspendus: 0,
    totalChiffreAffaires: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [fournisseursData, statsData] = await Promise.all([
        FournisseursService.getAllFournisseurs(),
        FournisseursService.getStats(),
      ]);

      setFournisseurs(fournisseursData);
      setStats(statsData);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des fournisseurs");
    } finally {
      setLoading(false);
    }
  };

  const addFournisseur = async (newFournisseur) => {
    try {
      const addedFournisseur =
        await FournisseursService.addFournisseur(newFournisseur);
      setFournisseurs((prevFournisseurs) => [
        addedFournisseur,
        ...prevFournisseurs,
      ]);

      // Update stats
      const newStats = await FournisseursService.getStats();
      setStats(newStats);

      return { success: true, data: addedFournisseur };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateFournisseur = async (id, updatedData) => {
    try {
      const updatedFournisseur = await FournisseursService.updateFournisseur(
        id,
        updatedData
      );
      setFournisseurs((prevFournisseurs) =>
        prevFournisseurs.map((f) => (f.id === id ? updatedFournisseur : f))
      );

      // Update stats
      const newStats = await FournisseursService.getStats();
      setStats(newStats);

      return { success: true, data: updatedFournisseur };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteFournisseur = async (id) => {
    try {
      await FournisseursService.deleteFournisseur(id);
      setFournisseurs((prevFournisseurs) =>
        prevFournisseurs.filter((f) => f.id !== id)
      );

      // Update stats
      const newStats = await FournisseursService.getStats();
      setStats(newStats);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  return {
    fournisseurs,
    loading,
    error,
    stats,
    addFournisseur,
    updateFournisseur,
    deleteFournisseur,
    refreshData,
  };
}
