import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  RefreshCw,
  Filter,
  X,
  Search,
  ChevronDown,
  Calendar as CalendarIcon,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import { fr } from "date-fns/locale/fr";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DataTable } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";

// App Components
import { CommandesStats } from "../components/CommandesStats";
import { AddCommandeForm } from "../components/AddCommandeForm";
import { useCommandes } from "../hooks/useCommandes";
import { STATUT_COMMANDE, STATUT_COMMANDE_OPTIONS } from "../utils/constants";
import { DetailModal, CommandeDetailModal } from "@/components/modals";

export const Commandes = () => {
  const navigate = useNavigate();  const [showFilters, setShowFilters] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [showCommandeModal, setShowCommandeModal] = useState(false);
  const {
    commandes,
    loading,
    error,
    filters,
    sortConfig,
    stats,
    handleSort,
    handleFilterChange,
    resetFilters,
    addCommande,
    deleteCommande,
    refreshData,
  } = useCommandes();
  // Gestion de la soumission du formulaire d'ajout
  const handleAddCommande = async (formData) => {
    const result = await addCommande(formData);
    if (result.success) {
      setShowAddForm(false);
      await refreshData();
    }
    return result;
  };

  // Gestion de la suppression d'une commande
  const handleDeleteCommande = async (commande) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      await deleteCommande(commande.id);
      await refreshData();
    }
  };

  // Configuration des colonnes du tableau
  const columns = [
    {
      header: "Référence",
      accessor: "reference",
      cell: (row) =>
        row.reference || `CMD-${row.id.toString().padStart(4, "0")}`,
    },
    {
      header: "Fournisseur",
      accessor: "fournisseur",
    },
    {
      header: "Date",
      accessor: "date",
      cell: (row) => format(new Date(row.date), "dd/MM/yyyy", { locale: fr }),
    },
    {
      header: "Montant",
      accessor: "montantTotal",
      align: "right",
      cell: (row) =>
        new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(row.montantTotal || 0),
    },
    {
      header: "Statut",
      accessor: "statut",
      cell: (row) => {        switch (row.statut) {
          case STATUT_COMMANDE.PAYE:
            return (
              <Badge
                variant="secondary"
                className="bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)] border border-[var(--color-success)] border-opacity-20"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Payé
              </Badge>
            );
          case STATUT_COMMANDE.EN_ATTENTE:
            return (
              <Badge
                variant="secondary"
                className="bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)] border border-[var(--color-warning)] border-opacity-20"
              >
                <Clock className="h-3 w-3 mr-1" />
                En attente
              </Badge>
            );
          case STATUT_COMMANDE.ANNULE:
            return (
              <Badge
                variant="secondary"
                className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
              >
                <XCircle className="h-3 w-3 mr-1" />
                Annulé
              </Badge>
            );
          default:
            return <Badge variant="outline">Inconnu</Badge>;
        }
      },
    },
    {
      header: "Actions",
      accessor: "actions",
      align: "right",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"            onClick={(e) => {
              e.stopPropagation();
              navigate(`/commandes/${row.id}`);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCommande(row);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-error)] hover:bg-opacity-10 hover:text-[var(--color-error)]"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];  // Gestion du clic sur une ligne
  const handleRowClick = (commande) => {
    setSelectedCommande(commande);
    setShowCommandeModal(true);
  };

  const handleCloseCommandeModal = () => {
    setShowCommandeModal(false);
    setSelectedCommande(null);
  };
  // Filter commandes based on search and filters
  const filteredCommandes = useMemo(() => {
    return commandes.filter((commande) => {      // Search term filter
      const searchTerm = filters.search || "";
      const matchesSearch =
        !searchTerm ||
        commande.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commande.fournisseur?.nom
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()); // Status filter
      const matchesStatus =
        !filters.statut ||
        filters.statut === "all" ||
        commande.statut === filters.statut;

      // Date range filter
      const commandeDate = commande.date ? new Date(commande.date) : null;
      const matchesDate =
        !filters.dateFrom ||
        !filters.dateTo ||
        !commandeDate ||
        (commandeDate >= new Date(filters.dateFrom) &&          commandeDate <= new Date(filters.dateTo));

      // Amount range filter
      const amount = parseFloat(commande.montantTotal || 0);
      const minAmount = parseFloat(filters.montantMin || 0) || 0;
      const maxAmount =
        parseFloat(filters.montantMax || Number.MAX_SAFE_INTEGER) ||
        Number.MAX_SAFE_INTEGER;
      const matchesAmount = amount >= minAmount && amount <= maxAmount;      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate &&
        matchesAmount
      );
    });
  }, [commandes, filters]);

  if (error) {
    return (      <div className="space-y-8 p-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--color-foreground)]">
            Gestion des Commandes
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Gérez vos commandes fournisseurs et suivez vos approvisionnements
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <Package className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Erreur de chargement
              </h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {/* En-tête de la page */}
      <div className="flex items-center justify-between">        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--color-foreground)]">
            Gestion des Commandes
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Gérez vos commandes fournisseurs et suivez vos approvisionnements
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refreshData()}
            disabled={loading}
            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
            />
            Actualiser
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
          >            <Plus className="h-4 w-4 mr-1" />
            Nouvelle Commande
          </Button>
        </div>
      </div>      {/* Statistiques */}
      <CommandesStats stats={stats} /> {/* Liste des Commandes */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Commandes
        </h2>

        {/* Search and Filters Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            {/* Status filter */}
            <Select
              value={filters.statut || "all"}
              onValueChange={(value) =>
                handleFilterChange({ statut: value === "all" ? null : value })
              }
            >
              <SelectTrigger className="w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Tous les statuts
                </SelectItem>
                {STATUT_COMMANDE_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    {option.label}
                  </SelectItem>
                ))}              </SelectContent>
            </Select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredCommandes}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="Aucune commande trouvée. Commencez par ajouter une nouvelle commande."
          rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
        />
      </div>      {/* Formulaire d'ajout */}
      {showAddForm && (
        <AddCommandeForm
          open={showAddForm}
          onOpenChange={setShowAddForm}
          onSubmit={handleAddCommande}
        />
      )}

      {/* Commande Detail Modal */}
      <DetailModal
        isOpen={showCommandeModal}
        onClose={handleCloseCommandeModal}
        title="Détail de la Commande"
        size="large"
      >
        <CommandeDetailModal
          commande={selectedCommande}
          onClose={handleCloseCommandeModal}
          onEdit={(commande) => {
            console.log('Edit commande:', commande);
            handleCloseCommandeModal();
            // TODO: Implement edit functionality
          }}
          onDownload={(commande) => {
            console.log('Download commande:', commande);
            // TODO: Implement download functionality
          }}
        />
      </DetailModal>
    </div>
  );
};

export default Commandes;
