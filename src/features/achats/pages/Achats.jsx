import React, { useState } from "react";
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
import { AchatsStats } from "../components/AchatsStats";
import { AchatsFilters } from "../components/AchatsFilters";
import { AddAchatForm } from "../components/AddAchatForm";
import { useAchats } from "../hooks/useAchats";
import { STATUT_ACHAT, STATUT_ACHAT_OPTIONS } from "../utils/constants";

export const Achats = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    achats,
    loading,
    error,
    filters,
    sortConfig,
    stats,
    handleSort,
    handleFilterChange,
    resetFilters,
    addAchat,
    deleteAchat,
    refreshData,
  } = useAchats();

  // Gestion de la soumission du formulaire d'ajout
  const handleAddAchat = async (formData) => {
    const result = await addAchat(formData);
    if (result.success) {
      setShowAddForm(false);
      await refreshData();
    }
    return result;
  };

  // Gestion de la suppression d'un achat
  const handleDeleteAchat = async (achat) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet achat ?")) {
      await deleteAchat(achat.id);
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
      cell: (row) => {
        switch (row.statut) {
          case STATUT_ACHAT.PAYE:
            return (
              <Badge
                variant="secondary"
                className="bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)] border border-[var(--color-success)] border-opacity-20"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Payé
              </Badge>
            );
          case STATUT_ACHAT.EN_ATTENTE:
            return (
              <Badge
                variant="secondary"
                className="bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)] border border-[var(--color-warning)] border-opacity-20"
              >
                <Clock className="h-3 w-3 mr-1" />
                En attente
              </Badge>
            );
          case STATUT_ACHAT.ANNULE:
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
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/achats/${row.id}`);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAchat(row);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-error)] hover:bg-opacity-10 hover:text-[var(--color-error)]"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Gestion du clic sur une ligne
  const handleRowClick = (achat) => {
    navigate(`/achats/${achat.id}`);
  };

  // Filter achats based on search and filters
  const filteredAchats = React.useMemo(() => {
    return achats.filter((achat) => {
      // Search term filter
      const searchTerm = filters.search || "";
      const matchesSearch =
        !searchTerm ||
        achat.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achat.fournisseur?.nom
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = !filters.statut || achat.statut === filters.statut;

      // Date range filter
      const achatDate = achat.date ? new Date(achat.date) : null;
      const matchesDate =
        !filters.dateFrom ||
        !filters.dateTo ||
        !achatDate ||
        (achatDate >= new Date(filters.dateFrom) &&
          achatDate <= new Date(filters.dateTo));

      // Supplier filter
      const supplierName = achat.fournisseur?.nom || "";
      const matchesSupplier =
        !filters.fournisseur ||
        supplierName
          .toLowerCase()
          .includes((filters.fournisseur || "").toLowerCase());

      // Amount range filter
      const amount = parseFloat(achat.montantTotal || 0);
      const minAmount = parseFloat(filters.montantMin || 0) || 0;
      const maxAmount =
        parseFloat(filters.montantMax || Number.MAX_SAFE_INTEGER) ||
        Number.MAX_SAFE_INTEGER;
      const matchesAmount = amount >= minAmount && amount <= maxAmount;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate &&
        matchesSupplier &&
        matchesAmount
      );
    });
  }, [achats, filters]);

  if (error) {
    return (
      <div className="space-y-8 p-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--color-foreground)]">
            Gestion des Achats
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
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--color-foreground)]">
            Gestion des Achats
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
          >
            <Plus className="h-4 w-4 mr-1" />
            Nouvel Achat
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <AchatsStats stats={stats} />

      {/* Filtres */}
      <AchatsFilters
        filters={filters}
        achats={filteredAchats}
        onFilterChange={(key, value) => handleFilterChange({ [key]: value })}
        onReset={resetFilters}
      />

      {/* Liste des Achats */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Achats
        </h2>
        <DataTable
          columns={columns}
          data={filteredAchats}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="Aucun achat trouvé. Commencez par ajouter un nouvel achat."
          rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
        />
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <AddAchatForm
          open={showAddForm}
          onOpenChange={setShowAddForm}
          onSubmit={handleAddAchat}
        />
      )}
    </div>
  );
};

export default Achats;
