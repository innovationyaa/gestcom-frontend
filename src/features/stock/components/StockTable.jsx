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
  onDelete,
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

  // Calculate stock status based on quantiteActuelle and seuilMinimum
  const getStockStatus = (item) => {
    if (item.quantiteActuelle === 0) return STOCK_STATUS.OUT_OF_STOCK;
    if (item.quantiteActuelle <= item.seuilMinimum)
      return STOCK_STATUS.LOW_STOCK;
    return STOCK_STATUS.IN_STOCK;
  };

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
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block">
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
                Fournisseur
              </TableHead>
              <TableHead className="min-w-[100px] px-4 text-right text-[var(--color-foreground)] font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("quantiteActuelle")}
                  className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                >
                  Quantité
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[100px] px-4 text-right text-[var(--color-foreground)] font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("prixAchat")}
                  className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                >
                  Prix Achat
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[100px] px-4 text-right text-[var(--color-foreground)] font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("prixVente")}
                  className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                >
                  Prix Vente
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
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
              pagedItems.map((item, index) => {
                const status = getStockStatus(item);
                const valeurStock = (
                  item.quantiteActuelle * item.prixAchat
                ).toFixed(2);

                return (
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
                        {item.image ? (
                          <img
                            src={item.image}
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
                        {item.description && (
                          <div className="text-sm text-[var(--color-foreground-muted)]">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-[var(--color-foreground)]">
                      {item.fournisseur?.nom || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 text-[var(--color-foreground)]">
                        {getStatusIcon(status)}
                        <span className="font-medium">
                          {item.quantiteActuelle}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-[var(--color-foreground)]">
                      {item.prixAchat.toFixed(2)} MAD
                    </TableCell>
                    <TableCell className="text-right text-[var(--color-foreground)]">
                      {item.prixVente.toFixed(2)} MAD
                    </TableCell>
                    <TableCell className="text-right text-[var(--color-foreground)]">
                      {valeurStock} MAD
                    </TableCell>
                    <TableCell>{getStatusBadge(status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onDelete) {
                              onDelete(item.id);
                            }
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
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View - Shown only on mobile */}
      <div className="lg:hidden divide-y divide-[var(--color-border)]">
        {pagedItems.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-foreground-muted)]">
            Aucun article trouvé
          </div>
        ) : (
          pagedItems.map((item, index) => (
            <div
              key={item.id}
              className="p-4 hover:bg-[var(--color-background)] transition-colors duration-200 cursor-pointer"
              onClick={() => onRowClick && onRowClick(item)}
            >
              <div className="flex gap-3">
                {/* Image */}
                <div className="flex-shrink-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.nom}
                      className="h-16 w-16 object-cover rounded-md border border-[var(--color-border)]"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <Avatar className="h-16 w-16 rounded-md">
                      <AvatarFallback className="rounded-md bg-[var(--color-background)] text-[var(--color-foreground-muted)]">
                        <ImageIcon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title and Reference */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-[var(--color-foreground)] truncate">
                        {item.nom}
                      </h3>
                      <p className="text-xs text-[var(--color-foreground-muted)]">
                        Réf: {item.reference}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs text-[var(--color-foreground-muted)] mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <span className="text-[var(--color-foreground-muted)]">
                        Fournisseur:
                      </span>
                      <span className="ml-1 text-[var(--color-foreground)]">
                        {item.fournisseur?.nom || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(item.status)}
                      <span className="text-[var(--color-foreground-muted)]">
                        Qté:
                      </span>
                      <span className="ml-1 font-medium text-[var(--color-foreground)]">
                        {item.quantiteActuelle} {item.uniteMesure}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--color-foreground-muted)]">
                        Prix Achat:
                      </span>
                      <span className="ml-1 text-[var(--color-foreground)]">
                        {item.prixAchat.toFixed(2)} MAD
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--color-foreground-muted)]">
                        Prix Vente:
                      </span>
                      <span className="ml-1 text-[var(--color-foreground)]">
                        {item.prixVente.toFixed(2)} MAD
                      </span>
                    </div>
                  </div>

                  {/* Value and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-[var(--color-foreground-muted)]">
                        Valeur:
                      </span>
                      <span className="ml-1 font-medium text-[var(--color-blue)]">
                        {(item.quantiteActuelle * item.prixAchat).toFixed(2)}{" "}
                        MAD
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingItem(item);
                        }}
                        className="h-7 w-7 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onDelete) {
                            onDelete(item.id);
                          }
                        }}
                        className="h-7 w-7 p-0 hover:bg-[var(--color-error)] hover:bg-opacity-10 hover:text-[var(--color-error)]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {page && pageSize && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-3 py-3 sm:py-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] gap-3 sm:gap-2">
          <div className="text-xs text-[var(--color-foreground-muted)] text-center sm:text-left">
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
              <div className="px-2 sm:px-3 py-1 text-xs border border-[var(--color-border)] bg-[var(--color-background)]">
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
