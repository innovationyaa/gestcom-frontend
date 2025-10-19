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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpDown,
  Trash2,
  AlertTriangle,
  Package,
  TrendingDown,
  Image as ImageIcon,
  Edit,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { STOCK_STATUS } from "../utils/constants";
import { useMemo, useState } from "react";
import StockEditModal from "@/features/stock/components/StockEditModal";
import centralDataService from "@/services/centralDataService";

export function StockTable({
  stockItems,
  loading,
  onSort,
  sortBy,
  sortOrder,
  onRowClick,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const total = stockItems.length;
  const pagedItems = useMemo(() => {
    if (!page || !pageSize) return stockItems;
    const start = (page - 1) * pageSize;
    return stockItems.slice(start, start + pageSize);
  }, [stockItems, page, pageSize]);
  const totalPages = useMemo(() => {
    if (!pageSize) return 1;
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);

  const [editingItem, setEditingItem] = useState(null);

  const handleEditClose = () => setEditingItem(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case STOCK_STATUS.OUT_OF_STOCK:
        return (
          <AlertTriangle
            className="h-4 w-4"
            style={{ color: "var(--color-error)" }}
          />
        );
      case STOCK_STATUS.LOW_STOCK:
        return (
          <TrendingDown
            className="h-4 w-4"
            style={{ color: "var(--color-warning)" }}
          />
        );
      default:
        return (
          <Package
            className="h-4 w-4"
            style={{ color: "var(--color-success)" }}
          />
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case STOCK_STATUS.OUT_OF_STOCK:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
          >
            Rupture
          </Badge>
        );
      case STOCK_STATUS.LOW_STOCK:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)] border border-[var(--color-warning)] border-opacity-20"
          >
            Stock faible
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)] border border-[var(--color-success)] border-opacity-20"
          >
            En stock
          </Badge>
        );
    }
  };

  const handleSort = (column) => {
    if (onSort) {
      onSort(column);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-[var(--color-border)] rounded w-full mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--color-background)] hover:bg-[var(--color-background)]">
            <TableHead className="w-[56px] px-4" />
            <TableHead className="w-[120px] px-4 text-[var(--color-foreground)] font-semibold">
              <Button
                variant="ghost"
                onClick={() => handleSort("reference")}
                className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
              >
                Référence
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="min-w-[200px] px-4 text-[var(--color-foreground)] font-semibold">
              <Button
                variant="ghost"
                onClick={() => handleSort("nom")}
                className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
              >
                Nom / Description
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="min-w-[150px] px-4 text-[var(--color-foreground)] font-semibold">
              <Button
                variant="ghost"
                onClick={() => handleSort("categorie")}
                className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
              >
                Catégorie
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="min-w-[100px] px-4 text-right text-[var(--color-foreground)] font-semibold">
              <Button
                variant="ghost"
                onClick={() => handleSort("quantite")}
                className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
              >
                Quantité
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="min-w-[80px] px-4 text-[var(--color-foreground)] font-semibold">
              Unité
            </TableHead>
            <TableHead className="min-w-[100px] px-4 text-right text-[var(--color-foreground)] font-semibold">
              Prix Achat
            </TableHead>
            <TableHead className="min-w-[100px] px-4 text-right text-[var(--color-foreground)] font-semibold">
              Prix Vente
            </TableHead>
            <TableHead className="min-w-[120px] px-4 text-right text-[var(--color-foreground)] font-semibold">
              Valeur Stock
            </TableHead>
            <TableHead className="min-w-[120px] px-4 text-[var(--color-foreground)] font-semibold">
              Statut
            </TableHead>
            <TableHead className="w-[120px] px-4 text-right text-[var(--color-foreground)] font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedItems.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center py-12 text-[var(--color-foreground-muted)]"
              >
                Aucun article trouvé
              </TableCell>
            </TableRow>
          ) : (
            pagedItems.map((item, index) => (
              <TableRow
                key={item.id}
                className={`hover:bg-[var(--color-background)] transition-colors duration-200 cursor-pointer ${
                  index % 2 === 0
                    ? "bg-[var(--color-surface)]"
                    : "bg-[var(--color-background)]"
                }`}
                onClick={() => onRowClick && onRowClick(item)}
              >
                <TableCell className="px-4">
                  <div className="h-10 w-10">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.nom}
                        className="h-10 w-10 object-cover rounded-md border border-[var(--color-border)]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarFallback className="rounded-md bg-[var(--color-background)] text-[var(--color-foreground-muted)]">
                          <ImageIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-[var(--color-foreground)]">
                  {item.reference}
                </TableCell>
                <TableCell className="text-[var(--color-foreground)]">
                  <div>
                    <div className="font-medium text-[var(--color-foreground)]">
                      {item.nom}
                    </div>
                    <div className="text-sm text-[var(--color-foreground-muted)]">
                      {item.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[var(--color-foreground)]">
                  {item.categorie}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 text-[var(--color-foreground)]">
                    {getStatusIcon(item.status)}
                    <span className="font-medium">{item.quantite}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[var(--color-foreground-muted)]">
                  {item.uniteMesure}
                </TableCell>
                <TableCell className="text-right text-[var(--color-foreground)]">
                  {item.prixAchatFormatted}
                </TableCell>
                <TableCell className="text-right text-[var(--color-foreground)]">
                  {item.prixVenteFormatted}
                </TableCell>
                <TableCell className="text-right text-[var(--color-foreground)]">
                  {item.valeurStockFormatted}
                </TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement delete functionality
                      }}
                      className="hover:bg-[var(--color-error)] hover:bg-opacity-10 hover:text-[var(--color-error)]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingItem(item);
                      }}
                      className="hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {page && pageSize && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-xs text-[var(--color-foreground-muted)]">
            Affichage {(page - 1) * pageSize + (pagedItems.length ? 1 : 0)}–
            {(page - 1) * pageSize + pagedItems.length} sur {total}
          </div>
          <div className="flex items-center gap-2">
            <select
              className="h-8 rounded-md border border-[var(--color-border)] bg-white px-2 text-xs"
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((n) => (
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
      {editingItem && (
        <StockEditModal
          item={editingItem}
          onClose={handleEditClose}
          onSave={async (updated) => {
            // propagate change to centralDataService and update local list
            try {
              // find and update via central service
              const data = await centralDataService.getData();
              const idx = data.stock.findIndex((s) => s.id === editingItem.id);
              if (idx !== -1) {
                data.stock[idx] = { ...data.stock[idx], ...updated };
                await centralDataService.updateData(data);
                // refresh internal items
                const updatedStock = await centralDataService.getStock();
                onPageChange?.(1); // reset page when modifying
                // notify parent via setStockItems if provided by prop - component calling StockTable should manage refresh via props
              }
            } catch (e) {
              console.error("Error saving edit", e);
            } finally {
              handleEditClose();
            }
          }}
        />
      )}
    </div>
  );
}
