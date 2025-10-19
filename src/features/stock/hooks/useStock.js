import { useState, useEffect, useMemo } from "react";
import centralDataService from "@/services/centralDataService";
import {
  prepareStockData,
  searchStockItems,
  sortStockItems,
  filterByStatus,
} from "../utils/stockHelpers";

export function useStock() {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStock = async () => {
      try {
        setLoading(true);
        const data = await centralDataService.getStock();
        setStockItems(prepareStockData(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStock();
  }, []);

  const addStockItem = async (newItem) => {
    try {
      await centralDataService.addStockItem(newItem);
      const updated = await centralDataService.getStock();
      setStockItems(prepareStockData(updated));
    } catch (error) {
      console.error("Error adding stock item:", error);
      throw error;
    }
  };

  return { stockItems, loading, error, setStockItems, addStockItem };
}

export function useStockStats() {
  const [stats, setStats] = useState({
    total: 0,
    outOfStock: 0,
    lowStock: 0,
    totalValue: 0,
    inStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await centralDataService.getStockStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading, error };
}

export function useStockFilters(stockItems) {
  const [filters, setFilters] = useState({
    search: "",
    categorie: "all",
    status: "",
    fournisseur: "all",
    sortBy: "reference",
    sortOrder: "asc",
  });

  const filteredItems = useMemo(() => {
    let filtered = stockItems;

    // Recherche
    if (filters.search) {
      filtered = searchStockItems(filtered, filters.search);
    }

    // Filtre par catégorie
    if (filters.categorie && filters.categorie !== "all") {
      filtered = filtered.filter(
        (item) => item.categorie === filters.categorie
      );
    }

    // Filtre par statut
    if (filters.status) {
      filtered = filterByStatus(filtered, filters.status);
    }

    // Filtre par fournisseur
    if (filters.fournisseur && filters.fournisseur !== "all") {
      filtered = filtered.filter(
        (item) => item.fournisseur === filters.fournisseur
      );
    }

    // Tri
    filtered = sortStockItems(filtered, filters.sortBy, filters.sortOrder);

    return filtered;
  }, [stockItems, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      categorie: "all",
      status: "",
      fournisseur: "all",
      sortBy: "reference",
      sortOrder: "asc",
    });
  };

  return { filters, filteredItems, updateFilter, resetFilters };
}
