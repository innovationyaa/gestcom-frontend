import { useState, useEffect } from "react";
import mouvementsService from "@/services/mouvementsService";

/**
 * Hook for managing stock movements with real backend integration
 */
export function useMouvements() {
  const [mouvements, setMouvements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all mouvements
  const fetchMouvements = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mouvementsService.getAll();
      setMouvements(data);
      return { success: true, data };
    } catch (err) {
      setError(err.message || "Failed to fetch mouvements");
      console.error("Error fetching mouvements:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchMouvements();
  }, []);

  // Create stock entry (entrée)
  const addEntry = async (articleId, quantite, remarque = "") => {
    try {
      const newEntry = await mouvementsService.createEntry(
        articleId,
        quantite,
        remarque
      );
      setMouvements([newEntry, ...mouvements]); // Add to top
      return { success: true, data: newEntry };
    } catch (err) {
      const errorMessage = err.message || "Failed to add entry";
      setError(errorMessage);
      console.error("Error adding entry:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Create stock exit (sortie)
  const addExit = async (articleId, quantite, remarque = "") => {
    try {
      const newExit = await mouvementsService.createExit(
        articleId,
        quantite,
        remarque
      );
      setMouvements([newExit, ...mouvements]); // Add to top
      return { success: true, data: newExit };
    } catch (err) {
      const errorMessage = err.message || "Failed to add exit";
      setError(errorMessage);
      console.error("Error adding exit:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Generic create movement
  const createMouvement = async (payload) => {
    try {
      const newMouvement = await mouvementsService.create(payload);
      setMouvements([newMouvement, ...mouvements]);
      return { success: true, data: newMouvement };
    } catch (err) {
      const errorMessage = err.message || "Failed to create movement";
      setError(errorMessage);
      console.error("Error creating movement:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Delete movement
  const deleteMouvement = async (id) => {
    try {
      await mouvementsService.delete(id);
      setMouvements(mouvements.filter((m) => m.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || "Failed to delete mouvement";
      setError(errorMessage);
      console.error("Error deleting mouvement:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Get movements by article
  const getMouvementsByArticle = async (articleId) => {
    try {
      const data = await mouvementsService.getByArticle(articleId);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch article movements";
      setError(errorMessage);
      console.error("Error fetching article movements:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Get single movement
  const getMouvementById = async (id) => {
    try {
      const mouvement = await mouvementsService.getById(id);
      return { success: true, data: mouvement };
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch movement";
      setError(errorMessage);
      console.error("Error fetching movement:", err);
      return { success: false, error: errorMessage };
    }
  };

  return {
    mouvements,
    loading,
    error,
    fetchMouvements,
    addEntry,
    addExit,
    createMouvement,
    deleteMouvement,
    getMouvementsByArticle,
    getMouvementById,
  };
}
