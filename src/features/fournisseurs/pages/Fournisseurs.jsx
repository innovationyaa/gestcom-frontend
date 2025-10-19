import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Building,
} from "lucide-react";

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
import { DataTable } from "@/components/ui/DataTable";

// App Components
import { FournisseursStats } from "../components/FournisseursStats";
import { AddFournisseurForm } from "../components/AddFournisseurForm";
import { useFournisseurs } from "../hooks/useFournisseurs";
import { DetailModal, FournisseurDetailModal } from "@/components/modals";

export const Fournisseurs = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);
  const [showFournisseurModal, setShowFournisseurModal] = useState(false);

  const {
    fournisseurs,
    loading,
    error,
    stats,
    addFournisseur,
    deleteFournisseur,
    refreshData,
  } = useFournisseurs();

  // Filter fournisseurs based on search and filters
  const filteredFournisseurs = useMemo(() => {
    return fournisseurs.filter((fournisseur) => {
      const matchesSearch =
        !searchTerm ||
        fournisseur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fournisseur.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fournisseur.telephone?.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || fournisseur.statut === statusFilter;
      const matchesType =
        typeFilter === "all" || fournisseur.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [fournisseurs, searchTerm, statusFilter, typeFilter]);

  const handleAddFournisseur = async (formData) => {
    const result = await addFournisseur(formData);
    if (result.success) {
      setShowAddForm(false);
      await refreshData();
    }
    return result;
  };

  const handleDeleteFournisseur = async (fournisseur) => {
    if (
      window.confirm(`Êtes-vous sûr de vouloir supprimer ${fournisseur.nom} ?`)
    ) {
      await deleteFournisseur(fournisseur.id);
      await refreshData();
    }
  };
  const handleViewFournisseur = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    setShowFournisseurModal(true);
  };
  const handleCloseFournisseurModal = () => {
    setShowFournisseurModal(false);
    setSelectedFournisseur(null);
  };

  const handleSaveFournisseur = async (updatedFournisseur) => {
    try {
      // TODO: Implement update fournisseur service call
      console.log("Saving updated fournisseur:", updatedFournisseur);
      await refreshData();
      return { success: true };
    } catch (error) {
      console.error("Error updating fournisseur:", error);
      return { success: false, error: error.message };
    }
  };

  const getStatusBadge = (statut) => {
    switch (statut) {
      case "actif":
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)] border border-[var(--color-success)] border-opacity-20"
          >
            Actif
          </Badge>
        );
      case "inactif":
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)] border border-[var(--color-warning)] border-opacity-20"
          >
            Inactif
          </Badge>
        );
      case "suspendu":
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
          >
            Suspendu
          </Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    const typeColors = {
      entreprise: "bg-blue-50 text-blue-700 border-blue-200",
      particulier: "bg-green-50 text-green-700 border-green-200",
      association: "bg-purple-50 text-purple-700 border-purple-200",
    };

    return (
      <Badge
        variant="outline"
        className={typeColors[type] || "bg-gray-50 text-gray-700"}
      >
        {type?.charAt(0).toUpperCase() + type?.slice(1) || "Non défini"}
      </Badge>
    );
  };

  const columns = [
    {
      header: "Nom",
      accessor: "nom",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-[var(--color-foreground-muted)]" />
          <span className="font-medium">{row.nom}</span>
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: "contact",
      cell: (row) => (
        <div className="space-y-1">
          {row.email && (
            <div className="flex items-center gap-1 text-sm">
              <Mail className="h-3 w-3 text-[var(--color-foreground-muted)]" />
              <span>{row.email}</span>
            </div>
          )}
          {row.telephone && (
            <div className="flex items-center gap-1 text-sm">
              <Phone className="h-3 w-3 text-[var(--color-foreground-muted)]" />
              <span>{row.telephone}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Adresse",
      accessor: "adresse",
      cell: (row) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="h-3 w-3 text-[var(--color-foreground-muted)]" />
          <span className="truncate max-w-[200px]">
            {row.adresse || "Non renseignée"}
          </span>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row) => getTypeBadge(row.type),
    },
    {
      header: "Statut",
      accessor: "statut",
      cell: (row) => getStatusBadge(row.statut),
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
              handleViewFournisseur(row);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
          >
            <Eye className="h-4 w-4" />{" "}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteFournisseur(row);
            }}
            className="h-8 w-8 p-0 hover:bg-[var(--color-error)] hover:bg-opacity-10 hover:text-[var(--color-error)]"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  const handleRowClick = (fournisseur) => {
    handleViewFournisseur(fournisseur);
  };

  if (error) {
    return (
      <div className="space-y-8 p-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--color-foreground)]">
            Gestion des Fournisseurs
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Gérez vos fournisseurs et partenaires commerciaux
          </p>
        </div>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
          <div className="text-center text-red-600">
            <Building className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-xl font-semibold">
            Gestion des Fournisseurs
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Gérez vos fournisseurs et partenaires commerciaux
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
          >
            <Building className="h-4 w-4 mr-1" />
            Exporter
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nouveau Fournisseur
          </Button>
        </div>
      </div>
      {/* Statistics */}
      <FournisseursStats stats={stats} />
      {/* Liste des Fournisseurs */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Fournisseurs
        </h2>

        {/* Search and Filters Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher un fournisseur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            {/* Status filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                <SelectItem
                  value="actif"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Actif
                </SelectItem>
                <SelectItem
                  value="inactif"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Inactif
                </SelectItem>
                <SelectItem
                  value="suspendu"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Suspendu
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Type filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Tous les types
                </SelectItem>
                <SelectItem
                  value="entreprise"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Entreprise
                </SelectItem>
                <SelectItem
                  value="particulier"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Particulier
                </SelectItem>
                <SelectItem
                  value="association"
                  className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Association
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredFournisseurs}
            loading={loading}
            onRowClick={handleRowClick}
            emptyMessage="Aucun fournisseur trouvé. Commencez par ajouter un nouveau fournisseur."
            rowClassName="cursor-pointer hover:bg-[var(--color-background)]"
          />
        </div>
      </div>
      {/* Add Form */}{" "}
      {showAddForm && (
        <AddFournisseurForm
          open={showAddForm}
          onOpenChange={setShowAddForm}
          onSubmit={handleAddFournisseur}
        />
      )}
      {/* Fournisseur Detail Modal */}
      <DetailModal
        isOpen={showFournisseurModal}
        onClose={handleCloseFournisseurModal}
        title="Détail du Fournisseur"
        size="large"
      >
        {" "}
        <FournisseurDetailModal
          fournisseur={selectedFournisseur}
          onClose={handleCloseFournisseurModal}
          onContact={(fournisseur) => {
            console.log("Contact fournisseur:", fournisseur);
            // TODO: Implement contact functionality
          }}
        />
      </DetailModal>
    </div>
  );
};

export default Fournisseurs;
