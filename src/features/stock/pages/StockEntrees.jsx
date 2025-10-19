// filepath: src/features/stock/pages/StockEntrees.jsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import stockAdjustmentService from "../services/stockAdjustmentService";
import { Button } from "@/components/ui/button";
import QuickStockEntryModal from "../components/QuickStockEntryModal";
import StockMovementsTable from "../components/StockMovementsTable";

export default function StockEntrees() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const load = async () => {
    try {
      setLoading(true);
      const all = await stockAdjustmentService.getAllStockMovements();
      setMovements(all.filter((m) => m.type === "entree"));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--color-foreground)] text-xl font-semibold">
            Stock - Entrées
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Historique des entrées de stock
          </p>
        </div>
        <Button
          className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
          size="sm"
          onClick={() => setShowEntryModal(true)}
        >
          Saisir une entrée
        </Button>
      </div>
      <Card className="bg-white border border-[var(--color-border)]">
        <CardHeader>
          <CardTitle className="text-base">Dernières entrées</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-[var(--color-foreground-muted)]">
              Chargement...
            </div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <StockMovementsTable
              movements={movements}
              showArticleColumn={true}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(n) => {
                setPageSize(n);
                setPage(1);
              }}
            />
          )}
        </CardContent>
      </Card>
      <QuickStockEntryModal
        isOpen={showEntryModal}
        onClose={() => setShowEntryModal(false)}
        onSuccess={() => load()}
      />
    </div>
  );
}
