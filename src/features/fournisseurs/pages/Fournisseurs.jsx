import React, { useState, useMemo } from "react";
import { Plus, Search, Eye, Trash2, Loader2 } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// App Components
import { AddFournisseurForm } from "../components/AddFournisseurForm";
import { useFournisseurs } from "../hooks/useFournisseurs";
import { FournisseurDetailModal } from "@/components/modals";

export const Fournisseurs = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { fournisseurs, loading, error, addFournisseur, deleteFournisseur } =
    useFournisseurs();

  // Filter fournisseurs based on search
  const filteredFournisseurs = useMemo(() => {
    return fournisseurs.filter((fournisseur) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        fournisseur.nom.toLowerCase().includes(searchLower) ||
        fournisseur.ice.includes(searchTerm) ||
        fournisseur.ifNumber.includes(searchTerm) ||
        fournisseur.contact.toLowerCase().includes(searchLower) ||
        fournisseur.adresse.toLowerCase().includes(searchLower)
      );
    });
  }, [fournisseurs, searchTerm]);

  const handleAddFournisseur = async (payload) => {
    const result = await addFournisseur(payload);
    if (result.success) {
      setShowAddForm(false);
    }
    return result;
  };

  const handleDeleteFournisseur = async (fournisseur) => {
    if (
      window.confirm(`Êtes-vous sûr de vouloir supprimer ${fournisseur.nom} ?`)
    ) {
      const result = await deleteFournisseur(fournisseur.id);
      if (!result.success) {
        alert(`Erreur: ${result.error}`);
      }
    }
  };

  const handleViewFournisseur = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    setShowDetailModal(true);
  };

  if (error) {
    return (
      <div className="space-y-8 p-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--color-foreground)]">
            Gestion des Fournisseurs
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Gérez vos fournisseurs
          </p>
        </div>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6">
          <div className="text-center text-red-600">
            <Building className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-lg sm:text-xl lg:text-2xl font-semibold">
            Gestion des Fournisseurs
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs sm:text-sm">
            Gérez vos fournisseurs et partenaires commerciaux
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nouveau Fournisseur</span>
          <span className="sm:hidden">Ajouter</span>
        </Button>
      </div>
      {/* List Container */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste des Fournisseurs
        </h2>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher par nom, ICE, IF, contact ou adresse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-muted)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-[var(--color-border)] overflow-hidden overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center gap-2 text-[var(--color-foreground-muted)]">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Chargement...</span>
              </div>
            </div>
          ) : filteredFournisseurs.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-[var(--color-foreground-muted)]">
              <p className="text-sm">
                {fournisseurs.length === 0
                  ? "Aucun fournisseur trouvé. Commencez par en ajouter un."
                  : "Aucun résultat ne correspond à votre recherche."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-[var(--color-background)]">
                <TableRow className="border-[var(--color-border)]">
                  <TableHead className="text-[var(--color-foreground-muted)] font-semibold text-xs sm:text-sm">
                    Nom
                  </TableHead>
                  <TableHead className="text-[var(--color-foreground-muted)] font-semibold text-xs sm:text-sm hidden sm:table-cell">
                    ICE
                  </TableHead>
                  <TableHead className="text-[var(--color-foreground-muted)] font-semibold text-xs sm:text-sm hidden md:table-cell">
                    IF
                  </TableHead>
                  <TableHead className="text-[var(--color-foreground-muted)] font-semibold text-xs sm:text-sm">
                    Contact
                  </TableHead>
                  <TableHead className="text-[var(--color-foreground-muted)] font-semibold text-xs sm:text-sm hidden lg:table-cell">
                    Adresse
                  </TableHead>
                  <TableHead className="text-[var(--color-foreground-muted)] font-semibold text-xs sm:text-sm text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFournisseurs.map((fournisseur) => (
                  <TableRow
                    key={fournisseur.id}
                    className="border-[var(--color-border)] hover:bg-[var(--color-background)] transition-colors"
                  >
                    <TableCell className="text-[var(--color-foreground)] font-medium text-xs sm:text-sm py-3">
                      {fournisseur.nom}
                    </TableCell>
                    <TableCell className="text-[var(--color-foreground)] text-xs sm:text-sm hidden sm:table-cell">
                      {fournisseur.ice || "-"}
                    </TableCell>
                    <TableCell className="text-[var(--color-foreground)] text-xs sm:text-sm hidden md:table-cell">
                      {fournisseur.ifNumber || "-"}
                    </TableCell>
                    <TableCell className="text-[var(--color-foreground)] text-xs sm:text-sm">
                      {fournisseur.contact || "-"}
                    </TableCell>
                    <TableCell className="text-[var(--color-foreground)] text-xs sm:text-sm truncate max-w-xs hidden lg:table-cell">
                      {fournisseur.adresse || "-"}
                    </TableCell>
                    <TableCell className="text-right space-x-1 sm:space-x-2 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewFournisseur(fournisseur)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
                      >
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFournisseur(fournisseur)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-[var(--color-red)] hover:bg-opacity-10 hover:text-[var(--color-red)]"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      {/* Add Form Modal */}
      <AddFournisseurForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSubmit={handleAddFournisseur}
      />{" "}
      {/* Detail Modal */}
      {selectedFournisseur && (
        <FournisseurDetailModal
          fournisseur={selectedFournisseur}
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
        />
      )}
    </div>
  );
};

export default Fournisseurs;
