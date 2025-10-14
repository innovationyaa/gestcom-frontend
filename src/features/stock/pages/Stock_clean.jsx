import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { StockStats } from "../components/StockStats";
import { StockFilters } from "../components/StockFilters";
import { StockTable } from "../components/StockTable";
import { AddProductForm } from "../components/AddProductForm";
import { useStock, useStockStats, useStockFilters } from "../hooks/useStock";

export default function Stock() {
  const { stockItems, loading, error, addStockItem } = useStock();
  const { stats, loading: statsLoading } = useStockStats();
  const { filters, filteredItems, updateFilter, resetFilters } =
    useStockFilters(stockItems);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleSort = (column) => {
    const newSortOrder =
      filters.sortBy === column && filters.sortOrder === "asc" ? "desc" : "asc";
    updateFilter("sortBy", column);
    updateFilter("sortOrder", newSortOrder);
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
    <div className="space-y-8 p-4">
      {/* En-tête de la page */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-[var(--color-foreground)] text-xl font-semibold">
            Gestion du Stock
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Gérez votre inventaire et suivez vos stocks en temps réel
          </p>
        </div>
        <Button
          size="sm"
          className="ml-2 bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
          onClick={() => setIsAddProductOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Ajouter un Article
        </Button>
      </div>

      {/* Statistiques */}
      <StockStats stats={stats} loading={statsLoading} />

      {/* Filtres */}
      <StockFilters
        filters={filters}
        stockItems={stockItems}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      {/* Liste du Stock */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm p-6 w-full">
        <h2 className="text-base font-medium text-[var(--color-foreground)] mb-4">
          Liste du Stock
        </h2>
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
            <StockTable
              stockItems={filteredItems}
              loading={loading}
              onSort={handleSort}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
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
      </Card>

      {/* Add Product Form Modal */}
      <AddProductForm
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onSave={async (productData) => {
          try {
            await addStockItem(productData);
            // The stock will be refreshed automatically by the useStock hook
          } catch (error) {
            console.error("Error adding product:", error);
            // You might want to show an error toast here
          }
        }}
      />
    </div>
  );
}
