import { useState, useEffect, useMemo } from "react";
import receptionsService from "../services/receptionsService";
import { filterReceptions, sortReceptions } from "../utils/helpers";

/**
 * Hook for managing receptions data
 */
export const useReceptions = () => {
  const [receptions, setReceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch receptions
  const fetchReceptions = async () => {
    setLoading(true);
    setError(null);

    const result = await receptionsService.getAllReceptions();

    if (result.success) {
      setReceptions(result.data || []);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchReceptions();
  }, []);

  // Add reception
  const addReception = async (receptionData) => {
    const result = await receptionsService.createReception(receptionData);

    if (result.success) {
      await fetchReceptions(); // Refresh list
    }

    return result;
  };

  // Update reception
  const updateReception = async (id, receptionData) => {
    const result = await receptionsService.updateReception(id, receptionData);

    if (result.success) {
      await fetchReceptions(); // Refresh list
    }

    return result;
  };

  // Delete reception
  const deleteReception = async (id) => {
    const result = await receptionsService.deleteReception(id);

    if (result.success) {
      await fetchReceptions(); // Refresh list
    }

    return result;
  };

  // Validate reception
  const validateReception = async (id) => {
    const result = await receptionsService.validateReception(id);

    if (result.success) {
      await fetchReceptions(); // Refresh list
    }

    return result;
  };

  // Cancel reception
  const cancelReception = async (id) => {
    const result = await receptionsService.cancelReception(id);

    if (result.success) {
      await fetchReceptions(); // Refresh list
    }

    return result;
  };

  return {
    receptions,
    loading,
    error,
    addReception,
    updateReception,
    deleteReception,
    validateReception,
    cancelReception,
    refetch: fetchReceptions,
  };
};

/**
 * Hook for managing reception statistics
 */
export const useReceptionStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    pending: 0,
    totalAmount: 0,
    suppliers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const result = await receptionsService.getReceptionStats();

      if (result.success) {
        setStats(result.data);
      }

      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

/**
 * Hook for filtering and sorting receptions
 */
export const useReceptionFilters = (receptions) => {
  const [filters, setFilters] = useState({
    search: "",
    fournisseur: "all",
    status: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  // Update filter
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      fournisseur: "all",
      status: "all",
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    let filtered = [...receptions];

    // Apply search filter
    filtered = filterReceptions(filtered, filters.search);

    // Apply fournisseur filter
    if (filters.fournisseur !== "all") {
      filtered = filtered.filter(
        (item) => item.fournisseur === filters.fournisseur
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((item) => item.status === filters.status);
    }

    // Apply sorting
    filtered = sortReceptions(filtered, filters.sortBy, filters.sortOrder);

    return filtered;
  }, [receptions, filters]);

  return {
    filters,
    filteredItems,
    updateFilter,
    resetFilters,
  };
};
