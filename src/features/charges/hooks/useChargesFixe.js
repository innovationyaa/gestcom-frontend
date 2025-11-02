// filepath: src/features/charges/hooks/useChargesFixe.js
import { useState, useEffect } from "react";
import { chargesFixesService } from "../services/chargesService";

export const useChargesFixe = (filters = {}) => {
  const [charges, setCharges] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    loyer: 0,
    utilities: 0,
    autres: 0,
    payees: 0,
    count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await chargesFixesService.getAll(filters);
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
    const response = await chargesFixesService.create(data);
    if (response.success) {
      await fetchCharges();
    }
    return response;
  };

  const updateCharge = async (id, data) => {
    const response = await chargesFixesService.update(id, data);
    if (response.success) {
      await fetchCharges();
    }
    return response;
  };

  const deleteCharge = async (id) => {
    const response = await chargesFixesService.delete(id);
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
