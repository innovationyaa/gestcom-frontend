import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Package, Search } from "lucide-react";
import { ReceptionStats } from "../components/ReceptionStats";
import { ReceptionTable } from "../components/ReceptionTable";
import {
  useReceptions,
  useReceptionStats,
  useReceptionFilters,
} from "../hooks/useReceptions";
import {
  SORT_OPTIONS,
  RECEPTION_STATUS,
  DEFAULT_PAGE_SIZE,
} from "../utils/constants";
import { getFilterOptions } from "../utils/helpers";
import ReceptionAddModal from "../components/ReceptionAddModal";

export default function Receptions() {
  const { receptions, loading, error, deleteReception, validateReception } =
    useReceptions();

  const { stats, loading: statsLoading } = useReceptionStats();
  const { filters, filteredItems, updateFilter, resetFilters } =
    useReceptionFilters(receptions);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedReception, setSelectedReception] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handleReceptionClick = (reception) => {
    setSelectedReception(reception);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedReception(null);
  };

  const handleDeleteReception = async (receptionId) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette réception ?")
    ) {
      const result = await deleteReception(receptionId);
      if (result.success) {
        console.log("Réception supprimée avec succès");
      } else {
        alert(`Erreur: ${result.error}`);
      }
    }
  };

  const handleValidateReception = async (receptionId) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir valider cette réception ? Une entrée de stock sera générée."
      )
    ) {
      const result = await validateReception(receptionId);
      if (result.success) {
        alert("Réception validée avec succès !");
      } else {
        alert(`Erreur: ${result.error}`);
      }
    }
  };

  const handleEdit = (reception) => {
    setSelectedReception(reception);
    setIsAddFormOpen(true);
  };

  const handleSubmitNewBL = async (payload) => {
    const res = await addReception(payload);
    return res;
  };

  if (error) {
    return (
      <div className="space-y-8 p-4">
        <div className="flex items-center justify-center h-64">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="text-center text-red-600">
                <Package className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Erreur de chargement
                </h3>
                <p className="text-sm text-[var(--color-foreground-muted)]">
                  {error}
                </p>
              </div>
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
            Réceptions (Bons de Livraison)
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs sm:text-sm">
            Gérez les réceptions de marchandises et créez des bons de livraison
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white flex-1 sm:flex-none"
            onClick={() => setIsAddFormOpen(true)}
          >
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Nouveau BL</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <ReceptionStats stats={stats} loading={statsLoading} />

      {/* List Section */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Réceptions
        </h2>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher par N° BL ou fournisseur..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center gap-2 sm:gap-3">
            {/* Fournisseur Filter */}
            <Select
              value={filters.fournisseur}
              onValueChange={(value) => updateFilter("fournisseur", value)}
            >
              <SelectTrigger className="w-full lg:w-[160px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Fournisseur" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Tous
                </SelectItem>
                {getFilterOptions(receptions, "fournisseur").map(
                  (fournisseur) => (
                    <SelectItem
                      key={fournisseur}
                      value={fournisseur}
                      className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                    >
                      {fournisseur}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value) => updateFilter("status", value)}
            >
              <SelectTrigger className="w-full lg:w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Tous
                </SelectItem>
                <SelectItem
                  value={RECEPTION_STATUS.VALIDATED}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Validé
                </SelectItem>
                <SelectItem
                  value={RECEPTION_STATUS.PENDING}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  En attente
                </SelectItem>
                <SelectItem
                  value={RECEPTION_STATUS.CANCELLED}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Annulé
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilter("sortBy", value)}
            >
              <SelectTrigger className="w-full lg:w-[120px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Trier" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                {SORT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset Filters Button */}
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
            <Package className="mx-auto h-12 w-12 text-[var(--color-foreground-muted)]" />
            <h3 className="mt-2 text-sm font-medium text-[var(--color-foreground)]">
              Aucune réception
            </h3>
            <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
              Commencez par créer votre première réception
            </p>
            <div className="mt-6">
              <Button
                size="sm"
                onClick={() => setIsAddFormOpen(true)}
                className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau BL
              </Button>
            </div>
          </div>
        ) : (
          <ReceptionTable
            receptions={filteredItems}
            loading={loading}
            onRowClick={handleReceptionClick}
            onDelete={handleDeleteReception}
            onEdit={handleEdit}
            onValidate={handleValidateReception}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddFormOpen && (
        <ReceptionAddModal
          isOpen={isAddFormOpen}
          onClose={() => {
            setIsAddFormOpen(false);
            setSelectedReception(null);
          }}
          onCreate={handleSubmitNewBL}
        />
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedReception && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              Détails de la réception
            </h2>
            <p className="text-[var(--color-foreground-muted)] mb-4">
              Modal de détails à implémenter
            </p>
            <Button onClick={handleCloseDetailModal}>Fermer</Button>
          </div>
        </div>
      )}
    </div>
  );
}
