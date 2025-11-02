import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { RECEPTION_STATUS } from "../utils/constants";
import { formatCurrency, formatDate } from "../utils/helpers";
import { useMemo } from "react";

export function ReceptionTable({
  receptions,
  loading,
  onRowClick,
  onDelete,
  onEdit,
  onValidate,
  onCancel,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const total = receptions.length;

  const pagedItems = useMemo(() => {
    if (!page || !pageSize) return receptions;
    const start = (page - 1) * pageSize;
    return receptions.slice(start, start + pageSize);
  }, [receptions, page, pageSize]);

  const totalPages = useMemo(() => {
    if (!pageSize) return 1;
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      [RECEPTION_STATUS.VALIDATED]: {
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-200",
        label: "Validé",
      },
      [RECEPTION_STATUS.PENDING]: {
        variant: "secondary",
        className: "bg-orange-100 text-orange-800 border-orange-200",
        label: "En attente",
      },
      [RECEPTION_STATUS.CANCELLED]: {
        variant: "destructive",
        className: "bg-red-100 text-red-800 border-red-200",
        label: "Annulé",
      },
    };

    const config =
      statusConfig[status] || statusConfig[RECEPTION_STATUS.PENDING];

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-[var(--color-border)] rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-surface)] hover:bg-[var(--color-surface)]">
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                N° BL
              </TableHead>
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                Date
              </TableHead>
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                Fournisseur
              </TableHead>
              <TableHead className="text-right text-[var(--color-foreground)] font-semibold">
                Total HT
              </TableHead>
              <TableHead className="text-right text-[var(--color-foreground)] font-semibold">
                TVA
              </TableHead>
              <TableHead className="text-right text-[var(--color-foreground)] font-semibold">
                Total TTC
              </TableHead>
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                Statut
              </TableHead>
              <TableHead className="text-right text-[var(--color-foreground)] font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-[var(--color-foreground-muted)]"
                >
                  Aucune réception trouvée
                </TableCell>
              </TableRow>
            ) : (
              pagedItems.map((reception) => (
                <TableRow
                  key={reception.id}
                  className="hover:bg-[var(--color-surface)] cursor-pointer transition-colors"
                  onClick={() => onRowClick?.(reception)}
                >
                  <TableCell className="font-medium text-[var(--color-foreground)]">
                    {reception.blNumber}
                  </TableCell>
                  <TableCell className="text-[var(--color-foreground-muted)]">
                    {formatDate(reception.date)}
                  </TableCell>
                  <TableCell className="text-[var(--color-foreground)]">
                    {reception.fournisseur}
                  </TableCell>
                  <TableCell className="text-right text-[var(--color-foreground-muted)]">
                    {formatCurrency(reception.totalHT)}
                  </TableCell>
                  <TableCell className="text-right text-[var(--color-foreground-muted)]">
                    {formatCurrency(reception.totalTVA)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-[var(--color-foreground)]">
                    {formatCurrency(reception.totalTTC)}
                  </TableCell>
                  <TableCell>{getStatusBadge(reception.status)}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onRowClick?.(reception)}
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {reception.status === RECEPTION_STATUS.PENDING && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => onValidate?.(reception.id)}
                            title="Valider"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onEdit?.(reception)}
                            title="Modifier"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDelete?.(reception.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {pagedItems.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-foreground-muted)]">
            Aucune réception trouvée
          </div>
        ) : (
          pagedItems.map((reception) => (
            <div
              key={reception.id}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 space-y-3"
              onClick={() => onRowClick?.(reception)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-[var(--color-foreground)]">
                    {reception.blNumber}
                  </p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    {formatDate(reception.date)}
                  </p>
                </div>
                {getStatusBadge(reception.status)}
              </div>

              <div>
                <p className="text-sm text-[var(--color-foreground-muted)]">
                  Fournisseur
                </p>
                <p className="font-medium text-[var(--color-foreground)]">
                  {reception.fournisseur}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-[var(--color-foreground-muted)]">HT</p>
                  <p className="font-medium text-[var(--color-foreground)]">
                    {formatCurrency(reception.totalHT)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-foreground-muted)]">TVA</p>
                  <p className="font-medium text-[var(--color-foreground)]">
                    {formatCurrency(reception.totalTVA)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-foreground-muted)]">TTC</p>
                  <p className="font-bold text-[var(--color-foreground)]">
                    {formatCurrency(reception.totalTTC)}
                  </p>
                </div>
              </div>

              <div
                className="flex gap-2 pt-2 border-t border-[var(--color-border)]"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onRowClick?.(reception)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>

                {reception.status === RECEPTION_STATUS.PENDING && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => onValidate?.(reception.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Valider
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => onDelete?.(reception.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-foreground-muted)]">
            Page {page} sur {totalPages} ({total} réception
            {total > 1 ? "s" : ""})
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(page - 1)}
              disabled={page === 1}
              className="border-[var(--color-border)]"
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(page + 1)}
              disabled={page === totalPages}
              className="border-[var(--color-border)]"
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
