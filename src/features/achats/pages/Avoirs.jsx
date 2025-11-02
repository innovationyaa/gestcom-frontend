import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvoirStats } from "../components/AvoirStats";
import { AvoirTable } from "../components/AvoirTable";
import { useAvoirs, useAvoirStats, useAvoirFilters } from "../hooks/useAvoirs";
import {
  AVOIR_SORT_OPTIONS,
  AVOIR_STATUS,
  DEFAULT_PAGE_SIZE,
  AVOIR_REASONS,
} from "../utils/constants";
import { getFilterOptions } from "../utils/helpers";
import { useInvoices } from "../hooks/useInvoices";
import AvoirAddModal from "../components/AvoirAddModal";

export default function Avoirs() {
  const { avoirs, loading, error, deleteAvoir, createAvoir } = useAvoirs();
  const { stats, loading: statsLoading } = useAvoirStats();
  const { filters, filteredItems, updateFilter, resetFilters } =
    useAvoirFilters(avoirs);
  const { invoices } = useInvoices();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const onRowClick = (item) => {
    setSelected(item);
    setShowDetail(true);
  };
  const closeDetail = () => {
    setShowDetail(false);
    setSelected(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cet avoir ?")) {
      const result = await deleteAvoir(id);
      if (!result.success) alert(`Erreur: ${result.error}`);
    }
  };

  const handleCreateAvoir = async (payload) => {
    const result = await createAvoir?.(payload);
    return result || { success: false, error: "Service non disponible" };
  };

  if (error) {
    return (
      <div className="space-y-8 p-4">
        <div className="flex items-center justify-center h-64">
          <Card className="w-full max-w-md">
            <div className="p-6 text-center text-red-600">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Erreur de chargement
              </h3>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                {error}
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-lg sm:text-xl lg:text-2xl font-semibold">
            Avoirs (Crédits)
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs sm:text-sm">
            Gérez les notes de crédit liées aux factures et retours
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Nouvel Avoir</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <AvoirStats stats={stats} loading={statsLoading} />

      {/* List Section */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Avoirs
        </h2>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher par N° avoir, fournisseur, facture..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:items-center gap-2 sm:gap-3">
            <Select
              value={filters.fournisseur}
              onValueChange={(v) => updateFilter("fournisseur", v)}
            >
              <SelectTrigger className="w-full lg:w-[180px] bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectValue placeholder="Fournisseur" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)]"
                >
                  Tous
                </SelectItem>
                {getFilterOptions(avoirs, "fournisseur").map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(v) => updateFilter("status", v)}
            >
              <SelectTrigger className="w-full lg:w-[160px] bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)]"
                >
                  Tous
                </SelectItem>
                <SelectItem value={AVOIR_STATUS.VALIDATED}>Validé</SelectItem>
                <SelectItem value={AVOIR_STATUS.PENDING}>En attente</SelectItem>
                <SelectItem value={AVOIR_STATUS.CANCELLED}>Annulé</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(v) => updateFilter("sortBy", v)}
            >
              <SelectTrigger className="w-full lg:w-[160px] bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectValue placeholder="Trier" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                {AVOIR_SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(filters.search ||
              filters.fournisseur !== "all" ||
              filters.status !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="border-[var(--color-border)] col-span-2 sm:col-span-1"
              >
                Réinitialiser
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        {filteredItems.length === 0 && !loading ? (
          <div className="text-center py-12 border rounded-lg border-[var(--color-border)]">
            <AlertTriangle className="mx-auto h-12 w-12 text-[var(--color-foreground-muted)]" />
            <h3 className="mt-2 text-sm font-medium text-[var(--color-foreground)]">
              Aucun avoir
            </h3>
            <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
              Créez un avoir lié à une facture (défectueux, erreur, retour...)
            </p>
            <div className="mt-6">
              <Button
                size="sm"
                onClick={() => setIsAddOpen(true)}
                className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvel Avoir
              </Button>
            </div>
          </div>
        ) : (
          <AvoirTable
            avoirs={filteredItems}
            loading={loading}
            onRowClick={onRowClick}
            onDelete={handleDelete}
            onEdit={(a) => {
              setSelected(a);
              setIsAddOpen(true);
            }}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>

      {/* Modals */}
      {isAddOpen && (
        <AvoirAddModal
          isOpen={isAddOpen}
          onClose={() => {
            setIsAddOpen(false);
            setSelected(null);
          }}
          onCreate={handleCreateAvoir}
          invoiceOptions={invoices}
        />
      )}

      {showDetail && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">Détails de l'avoir</h2>
            <p className="text-[var(--color-foreground-muted)] mb-4">
              Modal de détails: facture liée, impact stock et solde — à
              implémenter
            </p>
            <Button onClick={closeDetail}>Fermer</Button>
          </div>
        </div>
      )}
    </div>
  );
}
