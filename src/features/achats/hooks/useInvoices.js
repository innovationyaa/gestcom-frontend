// filepath: src/features/achats/hooks/useInvoices.js
import { useEffect, useMemo, useState } from "react";
import invoicesService from "../services/invoicesService";
import {
  sortReceptions as sortItems,
  filterInvoices as filterItems,
} from "../utils/helpers";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    const result = await invoicesService.getAllInvoices();
    if (result.success) setInvoices(result.data || []);
    else setError(result.error);
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const createInvoice = async (data) => {
    const result = await invoicesService.createInvoice(data);
    if (result.success) await fetchInvoices();
    return result;
  };

  const updateInvoice = async (id, data) => {
    const result = await invoicesService.updateInvoice(id, data);
    if (result.success) await fetchInvoices();
    return result;
  };

  const deleteInvoice = async (id) => {
    const result = await invoicesService.deleteInvoice(id);
    if (result.success) await fetchInvoices();
    return result;
  };

  const recordPayment = async (id, amount) => {
    const result = await invoicesService.recordPayment(id, amount);
    if (result.success) await fetchInvoices();
    return result;
  };

  return {
    invoices,
    loading,
    error,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    recordPayment,
    refetch: fetchInvoices,
  };
};

export const useInvoiceStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await invoicesService.getInvoiceStats();
      if (result.success) setStats(result.data);
      setLoading(false);
    };
    load();
  }, []);

  return { stats, loading };
};

export const useInvoiceFilters = (invoices) => {
  const [filters, setFilters] = useState({
    search: "",
    fournisseur: "all",
    status: "all",
    paymentMethod: "all",
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
      paymentMethod: "all",
      sortBy: "date",
      sortOrder: "desc",
    });

  const filteredItems = useMemo(() => {
    let arr = [...invoices];
    arr = filterItems(arr, filters.search);

    if (filters.fournisseur !== "all")
      arr = arr.filter((x) => x.fournisseur === filters.fournisseur);
    if (filters.status !== "all")
      arr = arr.filter((x) => x.status === filters.status);
    if (filters.paymentMethod !== "all")
      arr = arr.filter((x) => x.paymentMethod === filters.paymentMethod);

    arr = sortItems(arr, filters.sortBy, filters.sortOrder);
    return arr;
  }, [invoices, filters]);

  return { filters, filteredItems, updateFilter, resetFilters };
};
