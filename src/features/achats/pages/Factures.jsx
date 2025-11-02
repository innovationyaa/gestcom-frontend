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
import { Plus, FileText, Search } from "lucide-react";
import { InvoiceStats } from "../components/InvoiceStats";
import { InvoiceTable } from "../components/InvoiceTable";
import {
  useInvoices,
  useInvoiceStats,
  useInvoiceFilters,
} from "../hooks/useInvoices";
import {
  INVOICE_SORT_OPTIONS,
  INVOICE_STATUS,
  DEFAULT_PAGE_SIZE,
} from "../utils/constants";
import { getFilterOptions } from "../utils/helpers";
import { useReceptions } from "../hooks/useReceptions";
import InvoiceAddModal from "../components/InvoiceAddModal";

export default function Factures() {
  const { invoices, loading, error, deleteInvoice, recordPayment } =
    useInvoices();

  const { stats, loading: statsLoading } = useInvoiceStats();
  const { filters, filteredItems, updateFilter, resetFilters } =
    useInvoiceFilters(invoices);

  const { receptions } = useReceptions();

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedInvoice(null);
  };

  const handleDeleteInvoice = async (invoiceId) => {
    if (window.confirm("Supprimer cette facture ?")) {
      const result = await deleteInvoice(invoiceId);
      if (!result.success) alert(`Erreur: ${result.error}`);
    }
  };

  const handleRecordPayment = async (invoiceId) => {
    const amount = prompt("Montant payé (MAD)");
    if (!amount) return;
    const parsed = parseFloat(amount);
    if (Number.isNaN(parsed) || parsed <= 0) {
      alert("Montant invalide");
      return;
    }
    const result = await recordPayment(invoiceId, parsed);
    if (!result.success) alert(`Erreur: ${result.error}`);
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setIsAddFormOpen(true);
  };

  const handleCreateInvoice = async (payload) => {
    const result = await createInvoice?.(payload);
    return result || { success: false, error: "Service non disponible" };
  };

  if (error) {
    return (
      <div className="space-y-8 p-4">
        <div className="flex items-center justify-center h-64">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="text-center text-red-600">
                <FileText className="h-12 w-12 mx-auto mb-4" />
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
            Factures d'Achat
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs sm:text-sm">
            Suivez les paiements, relances, et lier des BL pour générer des
            factures
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white flex-1 sm:flex-none"
            onClick={() => setIsAddFormOpen(true)}
          >
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Nouvelle Facture</span>
            <span className="sm:hidden">Nouvelle</span>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <InvoiceStats stats={stats} loading={statsLoading} />

      {/* List Section */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Factures
        </h2>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher par N° facture ou fournisseur..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:items-center gap-2 sm:gap-3">
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
                {getFilterOptions(invoices, "fournisseur").map((f) => (
                  <SelectItem
                    key={f}
                    value={f}
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    {f}
                  </SelectItem>
                ))}
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
                  value={INVOICE_STATUS.PAID}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Payée
                </SelectItem>
                <SelectItem
                  value={INVOICE_STATUS.PENDING}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  En attente
                </SelectItem>
                <SelectItem
                  value={INVOICE_STATUS.OVERDUE}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  En retard
                </SelectItem>
                <SelectItem
                  value={INVOICE_STATUS.PARTIAL}
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Partielle
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Payment Method Filter */}
            <Select
              value={filters.paymentMethod}
              onValueChange={(value) => updateFilter("paymentMethod", value)}
            >
              <SelectTrigger className="w-full lg:w-[160px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Règlement" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Tous
                </SelectItem>
                {getFilterOptions(invoices, "paymentMethod").map((m) => (
                  <SelectItem
                    key={m}
                    value={m}
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilter("sortBy", value)}
            >
              <SelectTrigger className="w-full lg:w-[160px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Trier" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                {INVOICE_SORT_OPTIONS.map((option) => (
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

            {(filters.search ||
              filters.fournisseur !== "all" ||
              filters.status !== "all" ||
              filters.paymentMethod !== "all") && (
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
            <FileText className="mx-auto h-12 w-12 text-[var(--color-foreground-muted)]" />
            <h3 className="mt-2 text-sm font-medium text-[var(--color-foreground)]">
              Aucune facture
            </h3>
            <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
              Commencez par créer votre première facture en liant des BL
            </p>
            <div className="mt-6">
              <Button
                size="sm"
                onClick={() => setIsAddFormOpen(true)}
                className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Facture
              </Button>
            </div>
          </div>
        ) : (
          <InvoiceTable
            invoices={filteredItems}
            loading={loading}
            onRowClick={handleInvoiceClick}
            onDelete={handleDeleteInvoice}
            onEdit={handleEdit}
            onRecordPayment={handleRecordPayment}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>

      {/* Modals */}
      {isAddFormOpen && (
        <InvoiceAddModal
          isOpen={isAddFormOpen}
          onClose={() => {
            setIsAddFormOpen(false);
            setSelectedInvoice(null);
          }}
          onCreate={handleCreateInvoice}
          blOptions={receptions}
        />
      )}

      {showDetailModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              Détails de la facture
            </h2>
            <p className="text-[var(--color-foreground-muted)] mb-4">
              Modal de détails avec BL liés et paiements (à implémenter)
            </p>
            <Button onClick={handleCloseDetailModal}>Fermer</Button>
          </div>
        </div>
      )}
    </div>
  );
}
