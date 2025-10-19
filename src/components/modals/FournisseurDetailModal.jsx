import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  CreditCard,
  Package,
  TrendingUp,
  FileText,
  Edit,
  UserPlus,
  DollarSign,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";

export function FournisseurDetailModal({
  fournisseur,
  onClose,
  onEdit,
  onContact,
}) {
  if (!fournisseur) return null;

  const getStatusBadge = (statut) => {
    switch (statut) {
      case "actif":
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm"
          >
            Actif
          </Badge>
        );
      case "inactif":
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-300 shadow-sm"
          >
            Inactif
          </Badge>
        );
      case "suspendu":
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-300 shadow-sm"
          >
            Suspendu
          </Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    const typeColors = {
      entreprise:
        "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300 shadow-sm",
      particulier:
        "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-sm",
      association:
        "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300 shadow-sm",
    };

    return (
      <Badge
        variant="outline"
        className={typeColors[type] || "bg-gray-50 text-gray-700"}
      >
        {type?.charAt(0).toUpperCase() + type?.slice(1) || "Non défini"}
      </Badge>
    );
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
            {fournisseur.nom}
          </h3>
          <div className="flex items-center gap-4 text-sm text-[var(--color-foreground-muted)]">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{getTypeBadge(fournisseur.type)}</span>
            </div>
            {fournisseur.dateCreation && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  Client depuis le {formatDate(fournisseur.dateCreation)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(fournisseur.statut)}
        </div>
      </div>{" "}
      {/* Actions */}
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200/50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit && onEdit(fournisseur)}
          className="flex items-center gap-1 bg-white hover:bg-blue-50 text-blue-700 border-blue-300 hover:border-blue-400"
        >
          <Edit className="h-4 w-4" />
          Modifier
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onContact && onContact(fournisseur)}
          className="flex items-center gap-1 bg-white hover:bg-green-50 text-green-700 border-green-300 hover:border-green-400"
        >
          <Mail className="h-4 w-4" />
          Contacter
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-white hover:bg-purple-50 text-purple-700 border-purple-300 hover:border-purple-400"
        >
          <FileText className="h-4 w-4" />
          Nouvelle commande
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Informations de Contact */}
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Informations de Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fournisseur.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                <div>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    Email
                  </p>
                  <a
                    href={`mailto:${fournisseur.email}`}
                    className="text-[var(--color-blue)] hover:underline"
                  >
                    {fournisseur.email}
                  </a>
                </div>
              </div>
            )}

            {fournisseur.telephone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                <div>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    Téléphone
                  </p>
                  <a
                    href={`tel:${fournisseur.telephone}`}
                    className="text-[var(--color-blue)] hover:underline"
                  >
                    {fournisseur.telephone}
                  </a>
                </div>
              </div>
            )}

            {fournisseur.fax && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                <div>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    Fax
                  </p>
                  <p className="text-[var(--color-foreground)]">
                    {fournisseur.fax}
                  </p>
                </div>
              </div>
            )}

            {fournisseur.siteWeb && (
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                <div>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    Site web
                  </p>
                  <a
                    href={fournisseur.siteWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-blue)] hover:underline"
                  >
                    {fournisseur.siteWeb}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Adresse */}
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Adresse
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fournisseur.adresse ? (
              <div className="space-y-2">
                <p className="text-[var(--color-foreground)]">
                  {fournisseur.adresse}
                </p>
                {fournisseur.codePostal && fournisseur.ville && (
                  <p className="text-[var(--color-foreground)]">
                    {fournisseur.codePostal} {fournisseur.ville}
                  </p>
                )}
                {fournisseur.pays && (
                  <p className="text-[var(--color-foreground-muted)]">
                    {fournisseur.pays}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-[var(--color-foreground-muted)]">
                Adresse non renseignée
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Informations Commerciales */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Conditions de Paiement */}
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Conditions Commerciales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fournisseur.delaiPaiement && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Délai de paiement
                </span>
                <span className="font-medium">
                  {fournisseur.delaiPaiement} jours
                </span>
              </div>
            )}

            {fournisseur.modePaiement && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Mode de paiement
                </span>
                <span className="font-medium">{fournisseur.modePaiement}</span>
              </div>
            )}

            {fournisseur.remise && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Remise accordée
                </span>
                <span className="font-medium text-[var(--color-success)]">
                  {fournisseur.remise}%
                </span>
              </div>
            )}

            {fournisseur.creditLimit && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Limite de crédit
                </span>
                <span className="font-medium">
                  {formatCurrency(fournisseur.creditLimit)}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fournisseur.nombreCommandes && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Commandes passées
                </span>
                <span className="font-medium">
                  {fournisseur.nombreCommandes}
                </span>
              </div>
            )}

            {fournisseur.montantTotal && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Montant total
                </span>
                <span className="font-medium text-[var(--color-blue)]">
                  {formatCurrency(fournisseur.montantTotal)}
                </span>
              </div>
            )}

            {fournisseur.derniereCommande && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Dernière commande
                </span>
                <span className="font-medium">
                  {formatDate(fournisseur.derniereCommande)}
                </span>
              </div>
            )}

            {fournisseur.evaluationQualite && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Évaluation qualité
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    {fournisseur.evaluationQualite}/5
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < fournisseur.evaluationQualite
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Informations Légales */}
      {(fournisseur.siret || fournisseur.numeroTVA || fournisseur.rcs) && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Informations Légales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fournisseur.siret && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  SIRET
                </span>
                <span className="font-medium">{fournisseur.siret}</span>
              </div>
            )}

            {fournisseur.numeroTVA && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  N° TVA
                </span>
                <span className="font-medium">{fournisseur.numeroTVA}</span>
              </div>
            )}

            {fournisseur.rcs && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  RCS
                </span>
                <span className="font-medium">{fournisseur.rcs}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {/* Notes */}
      {fournisseur.notes && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes et Commentaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--color-foreground)] whitespace-pre-wrap">
              {fournisseur.notes}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
