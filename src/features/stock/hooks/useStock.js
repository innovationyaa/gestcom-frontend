import { useState, useEffect, useMemo } from "react";
import { useArticles } from "./useArticles";
import {
  searchStockItems,
  sortStockItems,
  filterByStatus,
} from "../utils/stockHelpers";

/**
 * Main stock hook - uses useArticles for backend integration
 * @deprecated Use useArticles() directly for new code
 */
export function useStock() {
  const { articles, loading, error, addArticle } = useArticles();

  // Map articles to legacy stockItems format for backwards compatibility
  const stockItems = useMemo(() => {
    return articles.map((article) => ({
      ...article,
      // Legacy field mappings for old code compatibility
      quantite: article.quantiteActuelle,
      prix: article.prixVente,
      seuilMinimum: article.seuilMinimum,
      prixAchat: article.prixAchat,
      prixVente: article.prixVente,
      // Fournisseur name for display
      fournisseurNom: article.fournisseur?.nom || null,
    }));
  }, [articles]);

  // Legacy addStockItem wrapper
  const addStockItem = async (newItem) => {
    try {
      const result = await addArticle(newItem);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      console.error("Error adding stock item:", error);
      throw error;
    }
  };

  return { stockItems, loading, error, addStockItem };
}

/**
 * Stock statistics hook - calculates stats from real articles
 */
export function useStockStats() {
  const { articles, loading, error } = useArticles();

  const [stats, setStats] = useState({
    total: 0,
    outOfStock: 0,
    lowStock: 0,
    totalValue: 0,
    inStock: 0,
  });

  useEffect(() => {
    if (articles.length > 0) {
      const calculated = {
        total: articles.length,
        outOfStock: articles.filter((a) => a.quantiteActuelle === 0).length,
        lowStock: articles.filter(
          (a) => a.quantiteActuelle > 0 && a.quantiteActuelle <= a.seuilMinimum
        ).length,
        totalValue: articles.reduce(
          (sum, a) => sum + a.quantiteActuelle * a.prixAchat,
          0
        ),
        inStock: articles.filter((a) => a.quantiteActuelle > a.seuilMinimum)
          .length,
      };
      setStats(calculated);
    }
  }, [articles]);

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
