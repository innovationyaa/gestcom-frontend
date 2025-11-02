// filepath: src/features/charges/components/ChargesFournisseursTable.jsx
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

const STATUS_CONFIG = {
  payee: {
    label: "Payée",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  en_attente: {
    label: "En attente",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  annulee: {
    label: "Annulée",
    color: "bg-red-100 text-red-800 border-red-200",
  },
};

export default function ChargesFournisseursTable({
  charges = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="text-center py-8 text-[var(--color-foreground-muted)]">
        Chargement...
      </div>
    );
  }

  if (charges.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-foreground-muted)]">
          Aucune charge fournisseur trouvée
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg border-[var(--color-border)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--color-surface)]">
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Fournisseur</TableHead>
            <TableHead className="font-semibold">Libellé</TableHead>
            <TableHead className="font-semibold">Catégorie</TableHead>
            <TableHead className="font-semibold text-right">
              Montant HT
            </TableHead>
            <TableHead className="font-semibold text-right">TVA</TableHead>
            <TableHead className="font-semibold text-right">
              Montant TTC
            </TableHead>
            <TableHead className="font-semibold">Statut</TableHead>
            <TableHead className="font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {charges.map((charge) => {
            const statusConfig =
              STATUS_CONFIG[charge.status] || STATUS_CONFIG.en_attente;
            return (
              <TableRow
                key={charge.id}
                className="hover:bg-[var(--color-surface)]"
              >
                <TableCell className="font-medium">
                  {formatDate(charge.date)}
                </TableCell>
                <TableCell>{charge.fournisseur}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {charge.libelle}
                </TableCell>
                <TableCell>
                  <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {charge.categorie}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {charge.montantHT.toLocaleString()} DH
                </TableCell>
                <TableCell className="text-right text-xs text-[var(--color-foreground-muted)]">
                  {charge.tva}% ({charge.montantTVA.toLocaleString()} DH)
                </TableCell>
                <TableCell className="text-right font-semibold text-[var(--color-blue)]">
                  {charge.montantTTC.toLocaleString()} DH
                </TableCell>
                <TableCell>
                  <Badge className={statusConfig.color}>
                    {statusConfig.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {onView && (
                      <button
                        onClick={() => onView(charge)}
                        className="p-1.5 hover:bg-blue-50 rounded text-blue-600 transition-colors"
                        title="Voir détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(charge)}
                        className="p-1.5 hover:bg-orange-50 rounded text-orange-600 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(charge)}
                        className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
