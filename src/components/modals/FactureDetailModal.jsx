import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  User,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Printer,
  Mail,
  Edit,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { STATUT_FACTURE } from "../../features/achats/pages/Factures";

export function FactureDetailModal({ facture, onClose, onEdit, onDownload, onPrint, onSendEmail }) {
  if (!facture) return null;

  const getStatusBadge = (status, dateEcheance) => {
    const isLate =
      status === STATUT_FACTURE.EN_RETARD ||
      (status !== STATUT_FACTURE.PAYEE && new Date(dateEcheance) < new Date());    if (isLate) {
      return (
        <Badge
          variant="secondary"
          className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-300 shadow-sm"
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          En retard
        </Badge>
      );
    }

    switch (status) {
      case STATUT_FACTURE.PAYEE:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Payée
          </Badge>
        );
      case STATUT_FACTURE.EN_ATTENTE:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-300 shadow-sm"
          >
            <Clock className="h-4 w-4 mr-1" />
            En attente
          </Badge>
        );
      case STATUT_FACTURE.ANNULEE:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-300 shadow-sm"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Annulée
          </Badge>
        );
      default:
        return <Badge variant="outline">Statut inconnu</Badge>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non définie";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: fr });
    } catch {
      return dateString;
    }
  };

  const isOverdue = facture.dateEcheance && new Date(facture.dateEcheance) < new Date() && facture.statut !== STATUT_FACTURE.PAYEE;
  const daysOverdue = isOverdue ? Math.floor((new Date() - new Date(facture.dateEcheance)) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="space-y-6">
      {/* Header avec informations principales */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
            Facture {facture.numero}
          </h3>
          <div className="flex items-center gap-4 text-sm text-[var(--color-foreground-muted)]">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Émise le {formatDate(facture.date)}</span>
            </div>
            {facture.dateEcheance && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className={isOverdue ? 'text-[var(--color-error)]' : ''}>
                  Échéance le {formatDate(facture.dateEcheance)}
                  {isOverdue && ` (${daysOverdue} jours de retard)`}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(facture.statut, facture.dateEcheance)}
        </div>
      </div>      {/* Actions */}
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200/50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit && onEdit(facture)}
          className="flex items-center gap-1 bg-white hover:bg-blue-50 text-blue-700 border-blue-300 hover:border-blue-400"
        >
          <Edit className="h-4 w-4" />
          Modifier
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDownload && onDownload(facture)}
          className="flex items-center gap-1 bg-white hover:bg-green-50 text-green-700 border-green-300 hover:border-green-400"
        >
          <Download className="h-4 w-4" />
          Télécharger PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPrint && onPrint(facture)}
          className="flex items-center gap-1 bg-white hover:bg-purple-50 text-purple-700 border-purple-300 hover:border-purple-400"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSendEmail && onSendEmail(facture)}
          className="flex items-center gap-1 bg-white hover:bg-orange-50 text-orange-700 border-orange-300 hover:border-orange-400"
        >
          <Mail className="h-4 w-4" />
          Envoyer par email
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informations Fournisseur */}
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Fournisseur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                Nom du fournisseur
              </label>
              <p className="text-[var(--color-foreground)] font-medium">
                {facture.fournisseur || "Non spécifié"}
              </p>
            </div>
            
            {facture.fournisseurDetails && (
              <>
                {facture.fournisseurDetails.adresse && (
                  <div>
                    <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                      Adresse
                    </label>
                    <p className="text-[var(--color-foreground)] text-sm">
                      {facture.fournisseurDetails.adresse}
                    </p>
                  </div>
                )}
                
                {facture.fournisseurDetails.siret && (
                  <div>
                    <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                      SIRET
                    </label>
                    <p className="text-[var(--color-foreground)] text-sm">
                      {facture.fournisseurDetails.siret}
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Informations de Paiement */}
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Informations de Paiement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {facture.modePaiement && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">Mode de paiement</span>
                <span className="font-medium">{facture.modePaiement}</span>
              </div>
            )}
            
            {facture.delaiPaiement && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">Délai de paiement</span>
                <span className="font-medium">{facture.delaiPaiement} jours</span>
              </div>
            )}

            {facture.datePaiement && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">Date de paiement</span>
                <span className="font-medium">{formatDate(facture.datePaiement)}</span>
              </div>
            )}

            {facture.referenceVirement && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">Référence virement</span>
                <span className="font-medium">{facture.referenceVirement}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Détail Financier */}
      <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Détail Financier
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--color-foreground-muted)]">Montant HT</span>
            <span className="font-medium">{formatCurrency(facture.montantHT || 0)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--color-foreground-muted)]">TVA ({facture.tauxTVA || 20}%)</span>
            <span className="font-medium">{formatCurrency(facture.montantTVA || 0)}</span>
          </div>
          
          {facture.remise && facture.remise > 0 && (
            <div className="flex justify-between items-center text-[var(--color-success)]">
              <span className="text-sm">Remise</span>
              <span className="font-medium">-{formatCurrency(facture.remise)}</span>
            </div>
          )}
          
          <div className="border-t border-[var(--color-border)] pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total TTC</span>
              <span className="text-xl font-bold text-[var(--color-blue)]">
                {formatCurrency(facture.montantTTC || facture.montantTotal || 0)}
              </span>
            </div>
          </div>

          {facture.acompte && facture.acompte > 0 && (
            <>
              <div className="flex justify-between items-center text-[var(--color-warning)]">
                <span className="text-sm">Acompte versé</span>
                <span className="font-medium">-{formatCurrency(facture.acompte)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Reste à payer</span>
                <span className="font-bold text-[var(--color-error)]">
                  {formatCurrency((facture.montantTTC || facture.montantTotal || 0) - facture.acompte)}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Articles/Services */}
      {facture.lignes && facture.lignes.length > 0 && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Détail des Articles/Services ({facture.lignes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facture.lignes.map((ligne, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-[var(--color-foreground)]">
                      {ligne.designation || ligne.nom || `Article ${index + 1}`}
                    </h4>
                    {ligne.description && (
                      <p className="text-sm text-[var(--color-foreground-muted)]">
                        {ligne.description}
                      </p>
                    )}
                    {ligne.reference && (
                      <p className="text-xs text-[var(--color-foreground-muted)] mt-1">
                        Réf: {ligne.reference}
                      </p>
                    )}
                  </div>
                  <div className="text-right min-w-[120px]">
                    <div className="flex items-center justify-end gap-2 text-sm text-[var(--color-foreground-muted)]">
                      <span>Qté: {ligne.quantite || 1}</span>
                      <span>×</span>
                      <span>{formatCurrency(ligne.prixUnitaire || 0)}</span>
                    </div>
                    <div className="text-base font-medium text-[var(--color-blue)]">
                      {formatCurrency((ligne.quantite || 1) * (ligne.prixUnitaire || 0))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Commande associée */}
      {facture.commandeReference && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Commande Associée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-foreground)]">
                  Commande {facture.commandeReference}
                </p>
                {facture.dateCommande && (
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    Passée le {formatDate(facture.dateCommande)}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Eye className="h-4 w-4" />
                Voir la commande
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {facture.notes && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes et Commentaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--color-foreground)] whitespace-pre-wrap">
              {facture.notes}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
