import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, CreditCard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChargesFournisseurs } from "../hooks/useChargesFournisseurs";
import ChargeFournisseurAddModal from "../components/ChargeFournisseurAddModal";
import ChargesFournisseursTable from "../components/ChargesFournisseursTable";
import ChargeFournisseurDetailModal from "../components/ChargeFournisseurDetailModal";

export default function ChargesFournisseurs() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sortBy: "date_desc",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { charges, stats, loading, error, createCharge } =
    useChargesFournisseurs(filters);

  const handleView = (charge) => {
    setSelectedCharge(charge);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-lg sm:text-xl lg:text-2xl font-semibold">
            Charges Fournisseurs
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs sm:text-sm">
            Gérez vos charges liées aux fournisseurs
          </p>
        </div>{" "}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
          >
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Nouvelle Charge</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-blue-200 bg-blue-50">
          <div className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                Total HT
              </p>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <CreditCard className="h-4 w-4 text-[var(--color-blue)]" />
              </div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stats.totalHT.toLocaleString()} DH
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                Hors taxes
              </p>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-purple-200 bg-purple-50">
          <div className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                Total TTC
              </p>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stats.totalTTC.toLocaleString()} DH
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                Toutes taxes comprises
              </p>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-green-200 bg-green-50">
          <div className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                Payées
              </p>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <CreditCard className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stats.payees}
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                Charges réglées
              </p>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-orange-200 bg-orange-50">
          <div className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-3">
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                En attente
              </p>
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <CreditCard className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                {stats.enAttente}
              </div>
              <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                À payer
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Charges Fournisseurs
        </h2>
        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher par libellé, fournisseur..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:flex lg:items-center gap-2 sm:gap-3">
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <SelectTrigger className="w-full lg:w-[160px] bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="payee">Payée</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters({ ...filters, sortBy: value })
              }
            >
              <SelectTrigger className="w-full lg:w-[120px] bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectValue placeholder="Trier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date_desc">Date ↓</SelectItem>
                <SelectItem value="date_asc">Date ↑</SelectItem>
                <SelectItem value="amount_desc">Montant ↓</SelectItem>
                <SelectItem value="amount_asc">Montant ↑</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>{" "}
        {/* Table */}
        <ChargesFournisseursTable
          charges={charges}
          loading={loading}
          onView={handleView}
          onEdit={(charge) => console.log("Edit:", charge)}
          onDelete={(charge) => console.log("Delete:", charge)}
        />
      </div>

      {/* Add Modal */}
      <ChargeFournisseurAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={createCharge}
      />
      {selectedCharge && (
        <ChargeFournisseurDetailModal
          charge={selectedCharge}
          open={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCharge(null);
          }}
        />
      )}
    </div>
  );
}
