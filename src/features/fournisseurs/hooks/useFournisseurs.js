import { useState, useEffect } from "react";
import fournisseursService from "@/services/fournisseursService";

export function useFournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all fournisseurs
  const fetchFournisseurs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fournisseursService.getAll();
      setFournisseurs(data);
    } catch (err) {
      setError(err.message || "Failed to fetch fournisseurs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchFournisseurs();
  }, []);

  // Add new fournisseur
  const addFournisseur = async (payload) => {
    try {
      const newFournisseur = await fournisseursService.create(payload);
      setFournisseurs([...fournisseurs, newFournisseur]);
      return { success: true, data: newFournisseur };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Failed to add fournisseur",
      };
    }
  };

  // Update existing fournisseur
  const updateFournisseur = async (id, payload) => {
    try {
      const updated = await fournisseursService.update(id, payload);
      setFournisseurs(fournisseurs.map((f) => (f.id === id ? updated : f)));
      return { success: true, data: updated };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Failed to update fournisseur",
      };
    }
  };

  // Delete fournisseur
  const deleteFournisseur = async (id) => {
    try {
      await fournisseursService.delete(id);
      setFournisseurs(fournisseurs.filter((f) => f.id !== id));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Failed to delete fournisseur",
      };
    }
  };

  // Refresh data
  const refreshData = async () => {
    await fetchFournisseurs();
  };

  return {
    fournisseurs,
    loading,
    error,
    addFournisseur,
    updateFournisseur,
    deleteFournisseur,
    refreshData,
  };
}
