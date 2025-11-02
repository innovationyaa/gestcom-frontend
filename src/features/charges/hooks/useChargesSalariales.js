// filepath: src/features/charges/hooks/useChargesSalariales.js
import { useState, useEffect } from "react";
import { chargesSalarialesService } from "../services/chargesService";

export const useChargesSalariales = (filters = {}) => {
  const [charges, setCharges] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    salaires: 0,
    cnss: 0,
    primes: 0,
    payees: 0,
    count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await chargesSalarialesService.getAll(filters);
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
    const response = await chargesSalarialesService.create(data);
    if (response.success) {
      await fetchCharges();
    }
    return response;
  };

  const updateCharge = async (id, data) => {
    const response = await chargesSalarialesService.update(id, data);
    if (response.success) {
      await fetchCharges();
    }
    return response;
  };

  const deleteCharge = async (id) => {
    const response = await chargesSalarialesService.delete(id);
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
