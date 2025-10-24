// filepath: src/features/stock/components/MovementsTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, TrendingDown } from "lucide-react";
import { useMemo } from "react";

function TypeBadge({ type }) {
  return type === "entrée" ? (
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

export default function MovementsTable({
  movements = [],
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRowClick,
}) {
  const total = movements.length;

  const pagedItems = useMemo(() => {
    if (!page || !pageSize) return movements;
    const start = (page - 1) * pageSize;
    return movements.slice(start, start + pageSize);
  }, [movements, page, pageSize]);

  const totalPages = useMemo(() => {
    if (!pageSize) return 1;
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);

  const showingFrom = useMemo(() => {
    if (!page || !pageSize) return pagedItems.length ? 1 : 0;
    return (page - 1) * pageSize + (pagedItems.length ? 1 : 0);
  }, [page, pageSize, pagedItems]);

  const showingTo = useMemo(() => {
    if (!page || !pageSize) return pagedItems.length;
    return (page - 1) * pageSize + pagedItems.length;
  }, [page, pageSize, pagedItems]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="rounded-md border border-[var(--color-border)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="[&_tr]:border-b [&_tr]:border-[var(--color-border)] bg-[var(--color-surface)]">
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Date</TableHead>
              <TableHead className="text-xs sm:text-sm">Article</TableHead>
              <TableHead className="text-xs sm:text-sm">Type</TableHead>
              <TableHead className="text-xs sm:text-sm">Quantité</TableHead>
              <TableHead className="text-xs sm:text-sm">Remarque</TableHead>
              <TableHead className="text-xs sm:text-sm w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr]:border-b [&_tr]:border-[var(--color-border)] [&_tr:last-child]:border-0">
            {pagedItems.map((m) => (
              <TableRow
                key={m.id}
                className="cursor-pointer hover:bg-[var(--color-surface)] transition-colors"
                onClick={() => onRowClick?.(m)}
              >
                <TableCell className="text-xs sm:text-sm">
                  <div className="font-medium text-[var(--color-foreground)]">
                    {formatDate(m.date)}
                  </div>
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  {m.article ? (
                    <div>
                      <div className="font-medium text-[var(--color-foreground)]">
                        {m.article.reference || "N/A"}
                      </div>
                      <div className="text-xs text-[var(--color-foreground-muted)]">
                        {m.article.nom || ""}
                      </div>
                    </div>
                  ) : (
                    <span className="text-[var(--color-foreground-muted)]">
                      -
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <TypeBadge type={m.typeMouvement} />
                </TableCell>
                <TableCell className="font-medium">
                  <span
                    className={
                      m.typeMouvement === "entrée"
                        ? "text-green-600"
                        : "text-orange-600"
                    }
                  >
                    {m.typeMouvement === "entrée" ? "+" : "-"}
                    {m.quantite}
                  </span>
                </TableCell>
                <TableCell className="text-xs sm:text-sm max-w-[200px]">
                  <div className="truncate text-[var(--color-foreground-muted)]">
                    {m.remarque || "-"}
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick?.(m);
                    }}
                    className="p-2 hover:bg-[var(--color-surface)] rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {pagedItems.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-sm text-[var(--color-foreground-muted)] py-8"
                >
                  Aucun mouvement
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {page && pageSize && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-xs sm:text-sm text-[var(--color-foreground-muted)] order-2 sm:order-1">
            Affichage de {showingFrom} à {showingTo} sur {total} mouvement(s)
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              disabled={page === 1}
              onClick={() => onPageChange?.(page - 1)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>
            <div className="text-xs sm:text-sm text-[var(--color-foreground-muted)]">
              Page {page} sur {totalPages}
            </div>
            <button
              disabled={page === totalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
