// filepath: src/features/stock/pages/StockSorties.jsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import stockAdjustmentService from "../services/stockAdjustmentService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuickStockExitModal from "../components/QuickStockExitModal";
import StockMovementsTable from "../components/StockMovementsTable";

export default function StockSorties() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const load = async () => {
    try {
      setLoading(true);
      const all = await stockAdjustmentService.getAllStockMovements();
      setMovements(all.filter((m) => m.type === "sortie"));
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
            Stock - Sorties
          </h1>
          <p className="text-[var(--color-foreground-muted)] text-xs">
            Historique des sorties de stock
          </p>
        </div>
        <Button
          className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
          size="sm"
          onClick={() => setShowExitModal(true)}
        >
          Saisir une sortie
        </Button>
      </div>
      <Card className="bg-white border border-[var(--color-border)]">
        <CardHeader>
          <CardTitle className="text-base">Dernières sorties</CardTitle>
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
      <QuickStockExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onSuccess={() => load()}
      />
    </div>
  );
}
