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
import { ArrowUpDown, FileText, Download, Eye, Printer, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const STATUT_FACTURE = {
  PAYEE: 'payee',
  EN_RETARD: 'en_retard',
  ANNULEE: 'annulee',  
  BROUILLON: 'brouillon'
};

export function FacturesTable({ factures = [], loading, onSort, onView, onDownload, onPrint }) {
  const getStatusBadge = (status, dateEcheance) => {
    const isLate = status === STATUT_FACTURE.EN_RETARD || 
                  (status === STATUT_FACTURE.PAYEE && new Date(dateEcheance) < new Date());
    
    if (isLate) {
      return (
        <Badge
          variant="secondary"
          className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
        >
          <Clock className="h-3 w-3 mr-1" />
          En retard
        </Badge>
      );
    }
    
    switch (status) {
      case STATUT_FACTURE.PAYEE:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)] border border-[var(--color-success)] border-opacity-20"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Payée
          </Badge>
        );
      case STATUT_FACTURE.EN_RETARD:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
          >
            <Clock className="h-3 w-3 mr-1" />
            En retard
          </Badge>
        );
      case STATUT_FACTURE.ANNULEE:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)] border border-[var(--color-error)] border-opacity-20"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Annulée
          </Badge>
        );
      case STATUT_FACTURE.BROUILLON:
        return (
          <Badge
            variant="secondary"
            className="bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)] border border-[var(--color-warning)] border-opacity-20"
          >
            <FileText className="h-3 w-3 mr-1" />
            Brouillon
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
      {factures.length === 0 ? (
        <div className="text-center py-12 border rounded-lg border-[var(--color-border)]">
          <FileText className="mx-auto h-12 w-12 text-[var(--color-foreground-muted)]" />
          <h3 className="mt-2 text-sm font-medium text-[var(--color-foreground)]">Aucune facture trouvée</h3>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Commencez par créer une nouvelle facture.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-background)] hover:bg-[var(--color-background)]">
              <TableHead className="w-[120px] text-[var(--color-foreground)] font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('numero')}
                  className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                >
                  N° Facture
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
              <TableHead className="text-[var(--color-foreground)] font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('echeance')}
                  className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                >
                  Échéance
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right text-[var(--color-foreground)] font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('montant')}
                  className="h-auto p-0 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-blue)] hover:bg-transparent"
                >
                  Montant TTC
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
            {factures.map((facture, index) => (
              <TableRow
                key={facture.id}
                className={`hover:bg-[var(--color-background)] transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-background)]'
                }`}
              >
                <TableCell className="font-medium text-[var(--color-foreground)]">
                  {facture.numero || `FAC-${facture.id.toString().padStart(4, '0')}`}
                </TableCell>
                <TableCell className="text-[var(--color-foreground)]">
                  {facture.fournisseur?.nom || 'Non spécifié'}
                </TableCell>
                <TableCell className="text-[var(--color-foreground)]">
                  {format(new Date(facture.date), 'dd/MM/yyyy', { locale: fr })}
                </TableCell>
                <TableCell className="text-[var(--color-foreground)]">
                  {facture.dateEcheance ? (
                    <span className={new Date(facture.dateEcheance) < new Date() ? 'text-[var(--color-error)]' : ''}>
                      {format(new Date(facture.dateEcheance), 'dd/MM/yyyy', { locale: fr })}
                    </span>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell className="text-right text-[var(--color-foreground)]">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(facture.montantTTC || 0)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(facture.statut, facture.dateEcheance)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView && onView(facture)}
                      className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
                      title="Voir la facture"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownload && onDownload(facture)}
                      className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
                      title="Télécharger"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPrint && onPrint(facture)}
                      className="h-8 w-8 p-0 hover:bg-[var(--color-blue)] hover:bg-opacity-10 hover:text-[var(--color-blue)]"
                      title="Imprimer"
                    >
                      <Printer className="h-4 w-4" />
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

export default FacturesTable;
