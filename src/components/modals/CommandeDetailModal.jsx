import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  CreditCard,
  Package,
  MapPin,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  Edit,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { STATUT_COMMANDE } from "../../features/achats/utils/constants";

export function CommandeDetailModal({ commande, onClose, onEdit, onDownload }) {
  if (!commande) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case STATUT_COMMANDE.PAYE:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Payé
          </Badge>
        );
      case STATUT_COMMANDE.EN_ATTENTE:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-300 shadow-sm"
          >
            <Clock className="h-4 w-4 mr-1" />
            En attente
          </Badge>
        );
      case STATUT_COMMANDE.ANNULE:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-300 shadow-sm"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Annulé
          </Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
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

  return (
    <div className="space-y-6">
      {/* Header avec informations principales */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
            {commande.reference ||
              `CMD-${commande.id.toString().padStart(4, "0")}`}
          </h3>
          <div className="flex items-center gap-4 text-sm text-[var(--color-foreground-muted)]">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Créée le {formatDate(commande.date)}</span>
            </div>
            {commande.dateLivraison && (
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>
                  Livraison prévue le {formatDate(commande.dateLivraison)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(commande.statut)}
        </div>
      </div>{" "}
      {/* Actions */}
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit && onEdit(commande)}
          className="flex items-center gap-1 bg-white hover:bg-blue-50 text-blue-700 border-blue-300 hover:border-blue-400"
        >
          <Edit className="h-4 w-4" />
          Modifier
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDownload && onDownload(commande)}
          className="flex items-center gap-1 bg-white hover:bg-green-50 text-green-700 border-green-300 hover:border-green-400"
        >
          <Download className="h-4 w-4" />
          Télécharger
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-white hover:bg-purple-50 text-purple-700 border-purple-300 hover:border-purple-400"
        >
          <FileText className="h-4 w-4" />
          Facture
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {" "}
        {/* Informations Fournisseur */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-blue-800">
              <User className="h-4 w-4 text-blue-600" />
              Informations Fournisseur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[var(--color-foreground-muted)]">
                Nom du fournisseur
              </label>
              <p className="text-[var(--color-foreground)] font-medium">
                {commande.fournisseur || "Non spécifié"}
              </p>
            </div>

            {commande.fournisseurDetails && (
              <>
                {commande.fournisseurDetails.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                    <span className="text-sm">
                      {commande.fournisseurDetails.email}
                    </span>
                  </div>
                )}
                {commande.fournisseurDetails.telephone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                    <span className="text-sm">
                      {commande.fournisseurDetails.telephone}
                    </span>
                  </div>
                )}
                {commande.fournisseurDetails.adresse && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-[var(--color-foreground-muted)] mt-0.5" />
                    <span className="text-sm">
                      {commande.fournisseurDetails.adresse}
                    </span>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>{" "}
        {/* Informations Financières */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-green-800">
              <CreditCard className="h-4 w-4 text-green-600" />
              Informations Financières
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-foreground-muted)]">
                Montant HT
              </span>
              <span className="font-medium">
                {formatCurrency(commande.montantHT || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-foreground-muted)]">
                TVA
              </span>
              <span className="font-medium">
                {formatCurrency(
                  (commande.montantTTC || commande.montantTotal || 0) -
                    (commande.montantHT || 0)
                )}
              </span>
            </div>
            <div className="border-t border-[var(--color-border)] pt-2">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium">Total TTC</span>
                <span className="text-lg font-bold text-[var(--color-blue)]">
                  {formatCurrency(
                    commande.montantTTC || commande.montantTotal || 0
                  )}
                </span>
              </div>
            </div>
            {commande.modePaiement && (
              <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--color-foreground-muted)]">
                    Mode de paiement
                  </span>
                  <span className="font-medium">{commande.modePaiement}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Articles commandés */}
      {commande.articles && commande.articles.length > 0 && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              Articles Commandés ({commande.articles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commande.articles.map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-[var(--color-foreground)]">
                      {article.nom ||
                        article.designation ||
                        `Article ${index + 1}`}
                    </h4>
                    {article.description && (
                      <p className="text-sm text-[var(--color-foreground-muted)]">
                        {article.description}
                      </p>
                    )}
                    {article.reference && (
                      <p className="text-xs text-[var(--color-foreground-muted)] mt-1">
                        Réf: {article.reference}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[var(--color-foreground-muted)]">
                        Qté: {article.quantite || 1}
                      </span>
                      {article.prixUnitaire && (
                        <span className="font-medium">
                          {formatCurrency(article.prixUnitaire)}
                        </span>
                      )}
                    </div>
                    {article.quantite && article.prixUnitaire && (
                      <div className="text-sm font-medium text-[var(--color-blue)]">
                        {formatCurrency(
                          article.quantite * article.prixUnitaire
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* Notes et commentaires */}
      {commande.notes && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes et Commentaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--color-foreground)] whitespace-pre-wrap">
              {commande.notes}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
