// filepath: src/features/charges/components/ChargesFixeTable.jsx
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2, RefreshCw } from "lucide-react";
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
};

const TYPE_CONFIG = {
  loyer: {
    label: "Loyer",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  electricite: {
    label: "Électricité",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  eau: { label: "Eau", color: "bg-blue-100 text-blue-800 border-blue-200" },
  telecom: {
    label: "Télécom",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  assurance: {
    label: "Assurance",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  entretien: {
    label: "Entretien",
    color: "bg-pink-100 text-pink-800 border-pink-200",
  },
  autre: { label: "Autre", color: "bg-gray-100 text-gray-800 border-gray-200" },
};

const RECURRENCE_LABELS = {
  mensuelle: "Mensuelle",
  trimestrielle: "Trimestrielle",
  semestrielle: "Semestrielle",
  annuelle: "Annuelle",
  ponctuelle: "Ponctuelle",
};

export default function ChargesFixeTable({
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
          Aucune charge fixe trouvée
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
            <TableHead className="font-semibold">Libellé</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Bénéficiaire</TableHead>
            <TableHead className="font-semibold text-right">Montant</TableHead>
            <TableHead className="font-semibold">Récurrence</TableHead>
            <TableHead className="font-semibold">Statut</TableHead>
            <TableHead className="font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {charges.map((charge) => {
            const statusConfig =
              STATUS_CONFIG[charge.status] || STATUS_CONFIG.en_attente;
            const typeConfig = TYPE_CONFIG[charge.type] || TYPE_CONFIG.autre;
            return (
              <TableRow
                key={charge.id}
                className="hover:bg-[var(--color-surface)]"
              >
                <TableCell className="font-medium">
                  {formatDate(charge.date)}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {charge.libelle}
                </TableCell>
                <TableCell>
                  <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
                </TableCell>
                <TableCell className="text-sm text-[var(--color-foreground-muted)]">
                  {charge.beneficiaire || "-"}
                </TableCell>
                <TableCell className="text-right font-semibold text-[var(--color-blue)]">
                  {charge.montant.toLocaleString()} DH
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-xs text-[var(--color-foreground-muted)]">
                    <RefreshCw className="h-3 w-3" />
                    {RECURRENCE_LABELS[charge.recurrence] || charge.recurrence}
                  </div>
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
