// filepath: src/features/achats/components/InvoiceTable.jsx
import { useMemo } from "react";
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
import { Card } from "@/components/ui/card";
import { Eye, Trash2, Edit, DollarSign } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/helpers";
import { INVOICE_STATUS } from "../utils/constants";

export const InvoiceTable = ({
  invoices = [],
  loading = false,
  onRowClick,
  onDelete,
  onEdit,
  onRecordPayment,
  page = 1,
  pageSize = 25,
  onPageChange,
  onPageSizeChange,
}) => {
  const total = invoices.length;

  const paged = useMemo(() => {
    if (!page || !pageSize) return invoices;
    const start = (page - 1) * pageSize;
    return invoices.slice(start, start + pageSize);
  }, [invoices, page, pageSize]);

  const totalPages = useMemo(() => {
    if (!pageSize) return 1;
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      [INVOICE_STATUS.PAID]: {
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-200",
        label: "Payée",
      },
      [INVOICE_STATUS.PENDING]: {
        variant: "secondary",
        className: "bg-orange-100 text-orange-800 border-orange-200",
        label: "En attente",
      },
      [INVOICE_STATUS.OVERDUE]: {
        variant: "destructive",
        className: "bg-red-100 text-red-800 border-red-200",
        label: "En retard",
      },
      [INVOICE_STATUS.PARTIAL]: {
        variant: "secondary",
        className: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Partielle",
      },
    };

    const config = statusConfig[status] || statusConfig[INVOICE_STATUS.PENDING];
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
                N° Facture
              </TableHead>
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                Date
              </TableHead>
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                Fournisseur
              </TableHead>
              <TableHead className="text-right text-[var(--color-foreground)] font-semibold">
                Total TTC
              </TableHead>
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                Échéance
              </TableHead>
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                Règlement
              </TableHead>
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                BL liés
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
            {paged.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-[var(--color-foreground-muted)]"
                >
                  Aucune facture trouvée
                </TableCell>
              </TableRow>
            ) : (
              paged.map((inv) => (
                <TableRow
                  key={inv.id}
                  className="hover:bg-[var(--color-surface)] cursor-pointer transition-colors"
                  onClick={() => onRowClick?.(inv)}
                >
                  <TableCell className="font-medium text-[var(--color-foreground)]">
                    {inv.invoiceNumber}
                  </TableCell>
                  <TableCell className="text-[var(--color-foreground-muted)]">
                    {formatDate(inv.date)}
                  </TableCell>
                  <TableCell className="text-[var(--color-foreground)]">
                    {inv.fournisseur}
                  </TableCell>
                  <TableCell className="text-right font-medium text-[var(--color-foreground)]">
                    {formatCurrency(inv.totalTTC)}
                  </TableCell>
                  <TableCell className="text-[var(--color-foreground-muted)]">
                    {formatDate(inv.dueDate)}
                  </TableCell>
                  <TableCell className="text-[var(--color-foreground)]">
                    {inv.paymentMethod}
                  </TableCell>
                  <TableCell className="text-[var(--color-foreground)]">
                    {(inv.linkedBLs || []).join(", ")}
                  </TableCell>
                  <TableCell>{getStatusBadge(inv.status)}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onRowClick?.(inv)}
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onEdit?.(inv)}
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {inv.status !== INVOICE_STATUS.PAID && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => onRecordPayment?.(inv.id)}
                          title="Régler"
                        >
                          <DollarSign className="h-4 w-4" />
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDelete?.(inv.id)}
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
        {paged.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-foreground-muted)]">
            Aucune facture trouvée
          </div>
        ) : (
          paged.map((inv) => (
            <div
              key={inv.id}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 space-y-3"
              onClick={() => onRowClick?.(inv)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-[var(--color-foreground)]">
                    {inv.invoiceNumber}
                  </p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    {formatDate(inv.date)}
                  </p>
                </div>
                {getStatusBadge(inv.status)}
              </div>

              <div>
                <p className="text-sm text-[var(--color-foreground-muted)]">
                  Fournisseur
                </p>
                <p className="font-medium text-[var(--color-foreground)]">
                  {inv.fournisseur}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-[var(--color-foreground-muted)]">TTC</p>
                  <p className="font-bold text-[var(--color-foreground)]">
                    {formatCurrency(inv.totalTTC)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-foreground-muted)]">
                    Échéance
                  </p>
                  <p className="font-medium text-[var(--color-foreground)]">
                    {formatDate(inv.dueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-foreground-muted)]">
                    BL liés
                  </p>
                  <p className="font-medium text-[var(--color-foreground)]">
                    {(inv.linkedBLs || []).join(", ")}
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
                  onClick={() => onRowClick?.(inv)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit?.(inv)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                {inv.status !== INVOICE_STATUS.PAID && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => onRecordPayment?.(inv.id)}
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Régler
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => onDelete?.(inv.id)}
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
            Page {page} sur {totalPages} ({total} facture{total > 1 ? "s" : ""})
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
};
