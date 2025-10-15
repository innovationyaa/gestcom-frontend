import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Calendar,
  Tag,
  BarChart3,
  Edit,
  Plus,
  Minus,
} from "lucide-react";
import { STOCK_STATUS } from "../../features/stock/utils/constants";

export function StockDetailModal({ item, onClose, onEdit, onAdjustStock }) {
  if (!item) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case STOCK_STATUS.OUT_OF_STOCK:
        return <AlertTriangle className="h-4 w-4" style={{ color: 'var(--color-error)' }} />;
      case STOCK_STATUS.LOW_STOCK:
        return <TrendingDown className="h-4 w-4" style={{ color: 'var(--color-warning)' }} />;
      default:
        return <Package className="h-4 w-4" style={{ color: 'var(--color-success)' }} />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {      case STOCK_STATUS.OUT_OF_STOCK:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-300 shadow-sm"
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Rupture de stock
          </Badge>
        );
      case STOCK_STATUS.LOW_STOCK:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-300 shadow-sm"
          >
            <TrendingDown className="h-4 w-4 mr-1" />
            Stock faible
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm"
          >
            <Package className="h-4 w-4 mr-1" />
            En stock
          </Badge>
        );
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount || 0);
  };

  const calculateMargin = () => {
    if (!item.prixVente || !item.prixAchat) return 0;
    return ((item.prixVente - item.prixAchat) / item.prixVente * 100).toFixed(1);
  };

  const calculateStockValue = () => {
    return item.quantite * (item.prixAchat || 0);
  };

  return (
    <div className="space-y-6">
      {/* Header avec informations principales */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
            {item.nom}
          </h3>
          <div className="flex items-center gap-4 text-sm text-[var(--color-foreground-muted)]">
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span>Réf: {item.reference}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span>Catégorie: {item.categorie}</span>
            </div>
          </div>
          {item.description && (
            <p className="text-sm text-[var(--color-foreground-muted)] mt-2">
              {item.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(item.status)}
        </div>
      </div>      {/* Actions */}
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit && onEdit(item)}
          className="flex items-center gap-1 bg-white hover:bg-blue-50 text-blue-700 border-blue-300 hover:border-blue-400"
        >
          <Edit className="h-4 w-4" />
          Modifier
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAdjustStock && onAdjustStock(item, 'increase')}
          className="flex items-center gap-1 bg-white hover:bg-green-50 text-green-700 border-green-300 hover:border-green-400"
        >
          <Plus className="h-4 w-4" />
          Ajouter stock
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAdjustStock && onAdjustStock(item, 'decrease')}
          className="flex items-center gap-1 bg-white hover:bg-orange-50 text-orange-700 border-orange-300 hover:border-orange-400"
        >
          <Minus className="h-4 w-4" />
          Retirer stock
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">        {/* Informations de Stock */}
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-indigo-800">
              <Package className="h-4 w-4 text-indigo-600" />
              Stock Actuel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getStatusIcon(item.status)}
                <span className="text-3xl font-bold text-[var(--color-foreground)]">
                  {item.quantite}
                </span>
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  {item.uniteMesure}
                </span>
              </div>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                Quantité disponible
              </p>
            </div>
            
            {item.seuilMinimum && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">Seuil minimum</span>
                <span className="font-medium">{item.seuilMinimum} {item.uniteMesure}</span>
              </div>
            )}
            
            {item.seuilMaximum && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">Seuil maximum</span>
                <span className="font-medium">{item.seuilMaximum} {item.uniteMesure}</span>
              </div>
            )}

            {item.emplacement && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">Emplacement</span>
                <span className="font-medium">{item.emplacement}</span>
              </div>
            )}
          </CardContent>
        </Card>        {/* Informations Financières */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-green-800">
              <DollarSign className="h-4 w-4 text-green-600" />
              Informations Financières
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-foreground-muted)]">Prix d'achat</span>
              <span className="font-medium">{formatCurrency(item.prixAchat)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-foreground-muted)]">Prix de vente</span>
              <span className="font-medium">{formatCurrency(item.prixVente)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-foreground-muted)]">Marge</span>
              <span className={`font-medium ${parseFloat(calculateMargin()) > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                {calculateMargin()}%
              </span>
            </div>
            <div className="border-t border-[var(--color-border)] pt-2">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium">Valeur du stock</span>
                <span className="text-lg font-bold text-[var(--color-blue)]">
                  {formatCurrency(calculateStockValue())}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations Fournisseur */}
      {item.fournisseur && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              Fournisseur Principal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[var(--color-foreground)]">
                  {typeof item.fournisseur === 'string' ? item.fournisseur : item.fournisseur.nom}
                </h4>
                {typeof item.fournisseur === 'object' && item.fournisseur.contact && (
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    {item.fournisseur.contact}
                  </p>
                )}
              </div>
              {item.delaiLivraison && (
                <div className="text-right">
                  <div className="text-sm text-[var(--color-foreground-muted)]">Délai de livraison</div>
                  <div className="font-medium">{item.delaiLivraison} jours</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historique des mouvements récents */}
      {item.mouvementsRecents && item.mouvementsRecents.length > 0 && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Mouvements Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {item.mouvementsRecents.map((mouvement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      mouvement.type === 'entree' 
                        ? 'bg-[var(--color-success)] bg-opacity-10' 
                        : 'bg-[var(--color-warning)] bg-opacity-10'
                    }`}>
                      {mouvement.type === 'entree' ? (
                        <TrendingUp className={`h-4 w-4 text-[var(--color-success)]`} />
                      ) : (
                        <TrendingDown className={`h-4 w-4 text-[var(--color-warning)]`} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-foreground)]">
                        {mouvement.type === 'entree' ? 'Entrée' : 'Sortie'}: {mouvement.quantite} {item.uniteMesure}
                      </div>
                      <div className="text-sm text-[var(--color-foreground-muted)]">
                        {mouvement.motif || 'Mouvement de stock'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[var(--color-foreground-muted)]">
                      {mouvement.date}
                    </div>
                    {mouvement.utilisateur && (
                      <div className="text-xs text-[var(--color-foreground-muted)]">
                        Par {mouvement.utilisateur}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
