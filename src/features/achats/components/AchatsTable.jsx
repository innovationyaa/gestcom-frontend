import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, Edit, Trash2, Eye, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { STATUT_ACHAT } from '../utils/constants';

export function AchatsTable({ achats = [], loading, onSort, onEdit, onDelete, onView }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case STATUT_ACHAT.PAYE:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)] border border-[var(--color-success)] border-opacity-20"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Payé
          </Badge>
        );
      case STATUT_ACHAT.EN_ATTENTE:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)] border border-[var(--color-warning)] border-opacity-20"
          >
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case STATUT_ACHAT.ANNULE:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Annulé
          </Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
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
      {achats.length === 0 ? (
        <div className="text-center py-12 border rounded-lg border-[var(--color-border)]">
          <FileText className="mx-auto h-12 w-12 text-[var(--color-foreground-muted)]" />
          <h3 className="mt-2 text-sm font-medium text-[var(--color-foreground)]">Aucun achat trouvé</h3>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Commencez par ajouter un nouvel achat.</p>
        </div>
      ) : (
        <Table>
              <TableHeader>
                <TableRow className="bg-[var(--color-background)] hover:bg-[var(--color-background)]">
                  <TableHead className="w-[120px] text-[var(--color-foreground)] font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('reference')}
                      className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                    >
                      Référence
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-[var(--color-foreground)] font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('fournisseur')}
                      className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                    >
                      Fournisseur
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-[var(--color-foreground)] font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('date')}
                      className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                    >
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right text-[var(--color-foreground)] font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('montantTotal')}
                      className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                    >
                      Montant
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-[var(--color-foreground)] font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('statut')}
                      className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                    >
                      Statut
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right text-[var(--color-foreground)] font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {achats.map((achat, index) => (
                  <TableRow
                    key={achat.id}
                    className={`hover:bg-[var(--color-background)] transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-background)]'
                    }`}
                  >
                    <TableCell className="font-medium text-[var(--color-foreground)]">
                      {achat.reference || `CMD-${achat.id.toString().padStart(4, '0')}`}
                    </TableCell>
                    <TableCell className="text-[var(--color-foreground)]">
                      {achat.fournisseur}
                    </TableCell>
                    <TableCell className="text-[var(--color-foreground)]">
                      {format(new Date(achat.date), 'dd/MM/yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell className="text-right text-[var(--color-foreground)]">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(achat.montantTotal || 0)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(achat.statut)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView && onView(achat)}
                          className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
                          title="Voir les détails"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit && onEdit(achat)}
                          className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete && onDelete(achat)}
                          className="h-8 w-8 p-0 hover:bg-[var(--color-error)] hover:bg-opacity-10 hover:text-[var(--color-error)]"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AchatsTable;
