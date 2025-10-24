// filepath: src/features/stock/pages/StockSorties.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, TrendingDown, Package, Search } from "lucide-react";
import { useMouvements } from "../hooks/useMouvements";
import QuickStockExitModal from "../components/QuickStockExitModal";
import MovementsTable from "../components/MovementsTable";
import { MovementDetailModal } from "../components/MovementDetailModal";

export default function StockSorties() {
  const { mouvements, loading, error, fetchMouvements } = useMouvements();
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Filter only "sortie" movements
  const sortiesMovements = mouvements.filter(
    (m) => m.typeMouvement === "sortie"
  );

  // Apply search filter
  const filteredMovements = sortiesMovements.filter((m) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      m.article?.reference?.toLowerCase().includes(search) ||
      m.article?.nom?.toLowerCase().includes(search) ||
      m.remarque?.toLowerCase().includes(search)
    );
  });

  const handleSuccess = async () => {
    await fetchMouvements();
    setShowExitModal(false);
  };

  const handleRowClick = (movement) => {
    setSelectedMovement(movement);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedMovement(null);
  };
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-lg sm:text-xl lg:text-2xl font-semibold flex items-center gap-2">
            <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            Sorties de Stock
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs sm:text-sm">
            Historique des sorties et consommations de marchandises
          </p>{" "}
        </div>
        <Button
          className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white w-full sm:w-auto"
          size="sm"
          onClick={() => setShowExitModal(true)}
        >
          <Minus className="h-4 w-4 mr-1" />
          Nouvelle Sortie
        </Button>
      </div>

      {/* Historique Section */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)] mb-4">
          Historique des Sorties
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher par article, référence ou remarque..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="text-sm text-[var(--color-foreground-muted)] mt-2">
              Chargement des sorties...
            </p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : filteredMovements.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 mx-auto text-[var(--color-foreground-muted)] mb-2" />
            <p className="text-sm text-[var(--color-foreground-muted)]">
              {searchTerm
                ? "Aucun résultat trouvé"
                : "Aucune sortie de stock enregistrée"}
            </p>
          </div>
        ) : (
          <MovementsTable
            movements={filteredMovements}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(n) => {
              setPageSize(n);
              setPage(1);
            }}
            onRowClick={handleRowClick}
          />
        )}
      </div>

      {/* Exit Modal */}
      <QuickStockExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onSuccess={handleSuccess}
      />

      {/* Detail Modal */}
      <MovementDetailModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        movement={selectedMovement}
      />
    </div>
  );
}
