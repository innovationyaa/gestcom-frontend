// filepath: src/features/charges/hooks/useChargesFournisseurs.js
import { useState, useEffect } from "react";
import { chargesFournisseursService } from "../services/chargesService";

export const useChargesFournisseurs = (filters = {}) => {
  const [charges, setCharges] = useState([]);
  const [stats, setStats] = useState({
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0,
    payees: 0,
    enAttente: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await chargesFournisseursService.getAll(filters);
      if (response.success) {
        setCharges(response.data || []);
        setStats(response.stats || {});
      } else {
        setError(response.error || "Erreur lors du chargement");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharges();
  }, [JSON.stringify(filters)]);

  const createCharge = async (data) => {
    const response = await chargesFournisseursService.create(data);
    if (response.success) {
      await fetchCharges();
    }
    return response;
  };

  const updateCharge = async (id, data) => {
    const response = await chargesFournisseursService.update(id, data);
    if (response.success) {
      await fetchCharges();
    }
    return response;
  };

  const deleteCharge = async (id) => {
    const response = await chargesFournisseursService.delete(id);
    if (response.success) {
      await fetchCharges();
    }
    return response;
  };

  return {
    charges,
    stats,
    loading,
    error,
    refresh: fetchCharges,
    createCharge,
    updateCharge,
    deleteCharge,
  };
};
