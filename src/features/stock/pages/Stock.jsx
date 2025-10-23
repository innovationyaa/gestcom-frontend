import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Package, Search, Filter } from "lucide-react";
import { Upload } from "lucide-react";
import { StockStats } from "../components/StockStats";
import { StockTable } from "../components/StockTable";
import { AddProductForm } from "../components/AddProductForm";
import { useStock, useStockStats, useStockFilters } from "../hooks/useStock";
import { STOCK_CATEGORIES, SORT_OPTIONS } from "../utils/constants";
import { getFilterOptions } from "../utils/stockHelpers";
import { DetailModal, StockDetailModal } from "@/components/modals";
import stockAdjustmentService from "../services/stockAdjustmentService";
import ImportStockModal from "../components/ImportStockModal";

export default function Stock() {
  const { stockItems, loading, error, addStockItem, setStockItems } =
    useStock();
  const { stats, loading: statsLoading } = useStockStats();
  const { filters, filteredItems, updateFilter, resetFilters } =
    useStockFilters(stockItems);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const handleSort = (column) => {
    const newSortOrder =
      filters.sortBy === column && filters.sortOrder === "asc" ? "desc" : "asc";
    updateFilter("sortBy", column);
    updateFilter("sortOrder", newSortOrder);
  };

  const handleStockItemClick = (item) => {
    setSelectedItem(item);
    setShowStockModal(true);
  };
  const handleCloseStockModal = () => {
    setShowStockModal(false);
    setSelectedItem(null);
  };

  if (error) {
    return (
      <div className="space-y-8 p-4">
        <div className="flex items-center justify-center h-64">
          <Card className="w-full max-w-md">
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
      </div>
    );
  }
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-lg sm:text-xl lg:text-2xl font-semibold">
            Gestion du Stock
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs sm:text-sm">
            Gérez votre inventaire et suivez vos stocks en temps réel
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="border-[var(--color-border)] flex-1 sm:flex-none"
            onClick={() => setIsImportOpen(true)}
          >
            <Upload className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Importer du stock</span>
            <span className="sm:hidden">Importer</span>
          </Button>
          <Button
            size="sm"
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white flex-1 sm:flex-none"
            onClick={() => setIsAddProductOpen(true)}
          >
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Ajouter un Article</span>
            <span className="sm:hidden">Ajouter</span>
          </Button>
        </div>
      </div>{" "}
      {/* Statistiques */}
      <StockStats stats={stats} loading={statsLoading} />      {/* Liste du Stock */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-3 sm:p-4 lg:p-6 w-full">
        <h2 className="text-sm sm:text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste du Stock
        </h2>

        {/* Search and Filters Container */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
            <Input
              placeholder="Rechercher un article..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-9 bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
            />
          </div>

          {/* Filters - Responsive Grid */}
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
                {getFilterOptions(stockItems, "fournisseur").map(
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

            {/* Catégorie Filter */}
            <Select
              value={filters.categorie}
              onValueChange={(value) => updateFilter("categorie", value)}
            >
              <SelectTrigger className="w-full lg:w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <SelectItem
                  value="all"
                  className="text-[var(--color-foreground-muted)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                >
                  Toutes
                </SelectItem>
                {STOCK_CATEGORIES.map((categorie) => (
                  <SelectItem
                    key={categorie}
                    value={categorie}
                    className="text-[var(--color-foreground)] focus:bg-[var(--color-blue)] focus:bg-opacity-10 focus:text-[var(--color-blue)]"
                  >
                    {categorie}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Trier Filter */}
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
          </div>
        </div>
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 border rounded-lg border-[var(--color-border)]">
            <Package className="mx-auto h-12 w-12 text-[var(--color-foreground-muted)]" />
            <h3 className="mt-2 text-sm font-medium text-[var(--color-foreground)]">
              Aucun article en stock
            </h3>
            <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
              Les articles en stock apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
            {" "}
            <StockTable
              stockItems={filteredItems}
              loading={loading}
              onSort={handleSort}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onRowClick={handleStockItemClick}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(n) => {
                setPageSize(n);
                setPage(1);
              }}
            />
          </div>
        )}
      </div>
      {/* Informations supplémentaires */}
      <Card className="bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-[var(--color-foreground)] text-xl font-semibold">
            Informations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-semibold text-[var(--color-foreground)] text-base">
                Légende des Statuts
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--color-success)] rounded-full"></div>
                  <span className="text-[var(--color-foreground-muted)]">
                    En stock (Quantité &gt; Seuil minimum)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--color-warning)] rounded-full"></div>
                  <span className="text-[var(--color-foreground-muted)]">
                    Stock faible (Quantité ≤ Seuil minimum)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--color-error)] rounded-full"></div>
                  <span className="text-[var(--color-foreground-muted)]">
                    Rupture de stock (Quantité = 0)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-[var(--color-foreground)] text-base">
                Actions Disponibles
              </h4>
              <div className="space-y-2 text-sm text-[var(--color-foreground-muted)]">
                <p>• Modifier les informations d'un article</p>
                <p>• Supprimer un article du stock</p>
                <p>• Exporter la liste des stocks</p>
                <p>• Générer un rapport d'inventaire</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-[var(--color-foreground)] text-base">
                Filtres Actifs
              </h4>
              <div className="space-y-2 text-sm text-[var(--color-foreground-muted)]">
                <p>• Recherche par référence, nom ou catégorie</p>
                <p>• Filtrage par catégorie ou fournisseur</p>
                <p>• Tri par différents critères</p>
                <p>• Réinitialisation des filtres</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>{" "}
      {/* Add Product Form Modal */}
      <AddProductForm
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}        onSave={async (productData) => {
          try {
            await addStockItem(productData);
            // The stock will be refreshed automatically by the useStock hook
          } catch (error) {
            console.error("Error adding product:", error);
          }
        }}
      />{" "}
      {/* Stock Detail Modal */}
      <DetailModal
        isOpen={showStockModal}
        onClose={handleCloseStockModal}
        title="Détail de l'Article"
        size="large"
      >
        {" "}
        <StockDetailModal
          item={selectedItem}
          onClose={handleCloseStockModal}
          showAdjustments={false}
        />
      </DetailModal>{" "}
      {/* Import Stock Modal */}
      <ImportStockModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </div>
  );
}
