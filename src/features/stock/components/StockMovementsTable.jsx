// filepath: src/features/stock/components/StockMovementsTable.jsx
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useMemo } from "react";

function TypeBadge({ type }) {
  return type === "entree" ? (
    <Badge className="bg-green-100 text-green-800 border-green-300">
      <TrendingUp className="h-3 w-3 mr-1" />
      Entrée
    </Badge>
  ) : (
    <Badge className="bg-orange-100 text-orange-800 border-orange-300">
      <TrendingDown className="h-3 w-3 mr-1" />
      Sortie
    </Badge>
  );
}

export default function StockMovementsTable({
  movements = [],
  showArticleColumn = true,
  compact = false,
  limit,
  // pagination (optional, controlled)
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const total = movements.length;

  const paged = useMemo(() => {
    let rows = limit ? movements.slice(0, limit) : movements;
    if (page && pageSize) {
      const start = (page - 1) * pageSize;
      rows = rows.slice(start, start + pageSize);
    }
    return rows;
  }, [movements, limit, page, pageSize]);

  const totalPages = useMemo(() => {
    if (!pageSize) return 1;
    return Math.max(
      1,
      Math.ceil((limit ? Math.min(total, limit) : total) / pageSize)
    );
  }, [total, pageSize, limit]);

  const showingFrom = useMemo(() => {
    if (!page || !pageSize) return paged.length ? 1 : 0;
    return (page - 1) * pageSize + (paged.length ? 1 : 0);
  }, [page, pageSize, paged]);

  const showingTo = useMemo(() => {
    if (!page || !pageSize) return paged.length;
    return (page - 1) * pageSize + paged.length;
  }, [page, pageSize, paged]);

  return (
    <div
      className={`rounded-md border border-[var(--color-border)] ${compact ? "" : "overflow-auto"}`}
    >
      <Table>
        <TableHeader className="[&_tr]:border-b [&_tr]:border-[var(--color-border)]">
          <TableRow>
            <TableHead>Date</TableHead>
            {showArticleColumn && <TableHead>Article</TableHead>}
            <TableHead>Type</TableHead>
            <TableHead>Quantité</TableHead>
            <TableHead>Motif</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr]:border-b [&_tr]:border-[var(--color-border)] [&_tr:last-child]:border-0">
          {paged.map((m) => (
            <TableRow key={m.id}>
              <TableCell className="text-sm">
                {new Date(m.date).toLocaleString()}
              </TableCell>
              {showArticleColumn && (
                <TableCell className="text-sm">
                  {m.articleReference ? (
                    <div>
                      <div className="font-medium text-[var(--color-foreground)]">
                        {m.articleReference}
                      </div>
                      <div className="text-xs text-[var(--color-foreground-muted)]">
                        {m.articleNom}
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
              )}
              <TableCell>
                <TypeBadge type={m.type} />
              </TableCell>
              <TableCell className="font-medium">
                <span
                  className={
                    m.type === "entree" ? "text-green-600" : "text-orange-600"
                  }
                >
                  {m.type === "entree" ? "+" : "-"}
                  {m.quantity}
                </span>
              </TableCell>
              <TableCell className="text-sm">
                <div>
                  {m.reason}
                  {m.reference && (
                    <div className="text-xs text-[var(--color-foreground-muted)]">
                      Réf: {m.reference}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{m.stockBefore}</span>
                  <span>→</span>
                  <span className="font-medium">{m.stockAfter}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {paged.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={showArticleColumn ? 6 : 5}
                className="text-center text-sm text-[var(--color-foreground-muted)] py-6"
              >
                Aucun mouvement
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {page && pageSize && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-xs text-[var(--color-foreground-muted)]">
            Affichage {showingFrom}–{showingTo} sur{" "}
            {limit ? Math.min(total, limit) : total}
          </div>
          <div className="flex items-center gap-2">
            <select
              className="h-8 rounded-md border border-[var(--color-border)] bg-white px-2 text-xs"
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
            <div className="flex items-center">
              <button
                className="px-2 py-1 text-xs rounded-l-md border border-r-0 border-[var(--color-border)] bg-white disabled:opacity-50"
                onClick={() => onPageChange?.(Math.max(1, page - 1))}
                disabled={page <= 1}
              >
                Préc.
              </button>
              <div className="px-3 py-1 text-xs border border-[var(--color-border)] bg-[var(--color-background)]">
                {page} / {totalPages}
              </div>
              <button
                className="px-2 py-1 text-xs rounded-r-md border border-l-0 border-[var(--color-border)] bg-white disabled:opacity-50"
                onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
              >
                Suiv.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
