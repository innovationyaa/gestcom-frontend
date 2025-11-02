// filepath: src/features/charges/hooks/useCharges.js
import { useState, useEffect } from "react";
import { chargesApercuService } from "../services/chargesService";

export const useCharges = () => {
  const [stats, setStats] = useState({
    totalCharges: 0,
    fournisseurs: 0,
    salariales: 0,
    fixes: 0,
    countFournisseurs: 0,
    countSalariales: 0,
    countFixes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await chargesApercuService.getStats();
      if (response.success) {
        setStats(response.data || {});
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
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  };
};
