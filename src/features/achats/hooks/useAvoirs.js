// filepath: src/features/achats/hooks/useAvoirs.js
import { useEffect, useMemo, useState } from "react";
import avoirsService from "../services/avoirsService";
import { filterAvoirs, sortAvoirs } from "../utils/helpers";

export const useAvoirs = () => {
  const [avoirs, setAvoirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAvoirs = async () => {
    setLoading(true);
    setError(null);
    const result = await avoirsService.getAll();
    if (result.success) setAvoirs(result.data || []);
    else setError(result.error);
    setLoading(false);
  };

  useEffect(() => {
    fetchAvoirs();
  }, []);

  const createAvoir = async (data) => {
    const result = await avoirsService.create(data);
    if (result.success) await fetchAvoirs();
    return result;
  };

  const updateAvoir = async (id, data) => {
    const result = await avoirsService.update(id, data);
    if (result.success) await fetchAvoirs();
    return result;
  };

  const deleteAvoir = async (id) => {
    const result = await avoirsService.remove(id);
    if (result.success) await fetchAvoirs();
    return result;
  };

  return {
    avoirs,
    loading,
    error,
    createAvoir,
    updateAvoir,
    deleteAvoir,
    refetch: fetchAvoirs,
  };
};

export const useAvoirStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    validated: 0,
    pending: 0,
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await avoirsService.getStats();
      if (result.success) setStats(result.data);
      setLoading(false);
    };
    load();
  }, []);

  return { stats, loading };
};

export const useAvoirFilters = (avoirs) => {
  const [filters, setFilters] = useState({
    search: "",
    fournisseur: "all",
    status: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  const updateFilter = (key, value) =>
    setFilters((p) => ({ ...p, [key]: value }));
  const resetFilters = () =>
    setFilters({
      search: "",
      fournisseur: "all",
      status: "all",
      sortBy: "date",
      sortOrder: "desc",
    });

  const filteredItems = useMemo(() => {
    let arr = [...avoirs];
    arr = filterAvoirs(arr, filters.search);
    if (filters.fournisseur !== "all")
      arr = arr.filter((x) => x.fournisseur === filters.fournisseur);
    if (filters.status !== "all")
      arr = arr.filter((x) => x.status === filters.status);
    arr = sortAvoirs(arr, filters.sortBy, filters.sortOrder);
    return arr;
  }, [avoirs, filters]);

  return { filters, filteredItems, updateFilter, resetFilters };
};
