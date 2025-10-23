import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MapPin,
  User,
  DollarSign,
  Calendar,
  Edit,
  Plus,
  Minus,
  History,
  Save,
  RotateCcw,
  Tag,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import StockMovementsTable from "@/features/stock/components/StockMovementsTable";

export function StockDetailModal({
  item,
  onClose,
  onSave,
  onAdjust,
  showAdjustments = true,
}) {
  const [showAdjustmentForm, setShowAdjustmentForm] = useState(false);
  const [adjustment, setAdjustment] = useState({
    type: "sortie",
    quantity: "",
    reason: "",
    reference: "",
    notes: "",
  });
  const [movPage, setMovPage] = useState(1);
  const [movPageSize, setMovPageSize] = useState(10);

  if (!item) return null;

  // Stock movements data - will be loaded from centralData.json
  const stockMovements = item.mouvements || [];

  const STOCK_STATUS = {
    OUT_OF_STOCK: "out_of_stock",
    LOW_STOCK: "low_stock",
    IN_STOCK: "in_stock",
  };

  const ADJUSTMENT_REASONS = {
    entree: [
      { value: "achat", label: "Achat/Réception" },
      { value: "retour", label: "Retour client" },
      { value: "production", label: "Production interne" },
      { value: "ajustement_positif", label: "Ajustement inventaire (+)" },
      { value: "transfert_entree", label: "Transfert entrant" },
      { value: "autre_entree", label: "Autre motif d'entrée" },
    ],
    sortie: [
      { value: "vente", label: "Vente" },
      { value: "utilisation_interne", label: "Utilisation interne" },
      { value: "perte_casse", label: "Perte/Casse" },
      { value: "vol", label: "Vol/Perte inexpliquée" },
      { value: "peremption", label: "Péremption/Obsolescence" },
      { value: "ajustement_negatif", label: "Ajustement inventaire (-)" },
      { value: "transfert_sortie", label: "Transfert sortant" },
      { value: "retour_fournisseur", label: "Retour fournisseur" },
      { value: "autre_sortie", label: "Autre motif de sortie" },
    ],
  };

  const handleAdjustmentSubmit = () => {
    if (!adjustment.quantity || adjustment.quantity <= 0) {
      alert("Veuillez saisir une quantité valide");
      return;
    }

    if (!adjustment.reason) {
      alert("Veuillez sélectionner un motif");
      return;
    }

    const adjustmentData = {
      ...adjustment,
      quantity: parseInt(adjustment.quantity),
      stockBefore: item.quantite,
      stockAfter:
        adjustment.type === "entree"
          ? item.quantite + parseInt(adjustment.quantity)
          : item.quantite - parseInt(adjustment.quantity),
      date: new Date().toISOString(),
      user: "Utilisateur Actuel", // TODO: Replace with actual user
    }; // Validate that sortie doesn't exceed current stock
    if (adjustment.type === "sortie" && adjustmentData.stockAfter < 0) {
      alert(
        "La quantité à retirer ne peut pas être supérieure au stock disponible"
      );
      return;
    }

    onAdjust(item.id, adjustmentData);
    setShowAdjustmentForm(false);
    setAdjustment({
      type: "sortie",
      quantity: "",
      reason: "",
      reference: "",
      notes: "",
    });
  };

  const resetAdjustmentForm = () => {
    setAdjustment({
      type: "sortie",
      quantity: "",
      reason: "",
      reference: "",
      notes: "",
    });
  };

  const getStockStatus = (quantity, seuilMinimum) => {
    if (quantity === 0) return STOCK_STATUS.OUT_OF_STOCK;
    if (seuilMinimum && quantity <= seuilMinimum) return STOCK_STATUS.LOW_STOCK;
    return STOCK_STATUS.IN_STOCK;
  };

  const getStatusIcon = (status) => {
    switch (status || getStockStatus(item.quantite, item.seuilMinimum)) {
      case STOCK_STATUS.OUT_OF_STOCK:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case STOCK_STATUS.LOW_STOCK:
        return <TrendingDown className="h-5 w-5 text-orange-500" />;
      default:
        return <Package className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status || getStockStatus(item.quantite, item.seuilMinimum)) {
      case STOCK_STATUS.OUT_OF_STOCK:
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
    return (((item.prixVente - item.prixAchat) / item.prixVente) * 100).toFixed(
      1
    );
  };

  const calculateStockValue = () => {
    return item.quantite * (item.prixAchat || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: fr });
    } catch {
      return dateString;
    }
  };

  const getMovementBadge = (type) => {
    return type === "entree" ? (
      <Badge className="bg-green-100 text-green-800 border-green-300">
        <TrendingUp className="h-3 w-3 mr-1" />
        Entrée
      </Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800 border-orange-300">
        <TrendingDown className="h-3 w-3 mr-1" />
        Sortie
      </Badge>
    );
  };

  const getReasonLabel = (type, reason) => {
    const allReasons = [
      ...ADJUSTMENT_REASONS.entree,
      ...ADJUSTMENT_REASONS.sortie,
    ];
    const reasonObj = allReasons.find((r) => r.value === reason);
    return reasonObj ? reasonObj.label : reason;
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header avec informations principales */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] flex items-center justify-center">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.nom}
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <div className="text-[var(--color-foreground-muted)]">
                <Package className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-foreground)] mb-1 sm:mb-2 truncate">
              {item.nom}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-[var(--color-foreground-muted)]">
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Réf: {item.reference}</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Catégorie: {item.categorie}</span>
              </div>
            </div>
            {item.description && (
              <p className="text-xs sm:text-sm text-[var(--color-foreground-muted)] mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-none">
                {item.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start">
          {getStatusBadge(item.status)}
        </div>
      </div>      {/* Stock Adjustment Form */}
      {showAdjustments && showAdjustmentForm && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-blue-800">
              <History className="h-4 w-4 sm:h-5 sm:w-5" />
              Ajustement de Stock
            </CardTitle>
          </CardHeader>{" "}
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="adjustmentType"
                  className="text-sm font-medium text-[#171717]"
                >
                  Type d'opération <span className="text-[#ef4444]">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="adjustmentType"
                    value={adjustment.type}
                    onChange={(e) =>
                      setAdjustment((prev) => ({
                        ...prev,
                        type: e.target.value,
                        reason: "",
                      }))
                    }
                    className="w-full h-11 pl-3 pr-8 text-sm border border-[#e0e7ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] appearance-none bg-[#f8faff] transition-all duration-200"
                    required
                  >
                    <option value="entree">➕ Entrée de stock</option>
                    <option value="sortie">➖ Sortie de stock</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="adjustmentQuantity"
                  className="text-sm font-medium text-[#171717]"
                >
                  Quantité <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="adjustmentQuantity"
                  type="number"
                  min="1"
                  value={adjustment.quantity}
                  onChange={(e) =>
                    setAdjustment((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                  }
                  placeholder="Saisir la quantité"
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="adjustmentReason"
                  className="text-sm font-medium text-[#171717]"
                >
                  Motif <span className="text-[#ef4444]">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="adjustmentReason"
                    value={adjustment.reason}
                    onChange={(e) =>
                      setAdjustment((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    className="w-full h-11 pl-3 pr-8 text-sm border border-[#e0e7ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] appearance-none bg-[#f8faff] transition-all duration-200"
                    required
                  >
                    <option value="">Sélectionner un motif</option>
                    {ADJUSTMENT_REASONS[adjustment.type].map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="adjustmentReference"
                  className="text-sm font-medium text-[#171717]"
                >
                  Référence document
                </Label>
                <Input
                  id="adjustmentReference"
                  value={adjustment.reference}
                  onChange={(e) =>
                    setAdjustment((prev) => ({
                      ...prev,
                      reference: e.target.value,
                    }))
                  }
                  placeholder="ex: FAC-2024-001, BON-123..."
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="adjustmentNotes"
                className="text-sm font-medium text-[#171717]"
              >
                Notes
              </Label>
              <Textarea
                id="adjustmentNotes"
                value={adjustment.notes}
                onChange={(e) =>
                  setAdjustment((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Commentaires supplémentaires..."
                rows={3}
                className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm transition-all duration-200 bg-[#f8faff] min-h-[100px] p-3.5 focus:outline-none"
              />
            </div>{" "}
            {/* Stock calculation preview */}
            {adjustment.quantity && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between text-sm text-[#171717]">
                  <span className="font-medium">Stock actuel:</span>
                  <span className="font-semibold">
                    {item.quantite} {item.uniteMesure}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#171717] mt-2">
                  <span className="font-medium">
                    {adjustment.type === "entree"
                      ? "Quantité ajoutée:"
                      : "Quantité retirée:"}
                  </span>
                  <span
                    className={`font-semibold ${adjustment.type === "entree" ? "text-green-600" : "text-orange-600"}`}
                  >
                    {adjustment.type === "entree" ? "+" : "-"}
                    {adjustment.quantity} {item.uniteMesure}
                  </span>
                </div>
                <hr className="my-3 border-blue-200" />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-[#171717]">Nouveau stock:</span>
                  <span
                    className={`text-lg ${
                      adjustment.type === "entree"
                        ? "text-green-600"
                        : item.quantite - parseInt(adjustment.quantity || 0) < 0
                          ? "text-red-600"
                          : "text-blue-600"
                    }`}
                  >
                    {adjustment.type === "entree"
                      ? item.quantite + parseInt(adjustment.quantity || 0)
                      : item.quantite - parseInt(adjustment.quantity || 0)}{" "}
                    {item.uniteMesure}
                  </span>
                </div>
                {adjustment.type === "sortie" &&
                  item.quantite - parseInt(adjustment.quantity || 0) < 0 && (
                    <div className="text-red-600 text-sm mt-3 flex items-center gap-2 bg-red-50 p-2 rounded-md border border-red-200">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">
                        Attention: Stock insuffisant
                      </span>
                    </div>
                  )}
              </div>
            )}            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 mt-4 border-t border-[#e5f2ff]">
              <button
                type="button"
                onClick={() => setShowAdjustmentForm(false)}
                className="px-4 sm:px-5 py-2.5 text-sm font-medium text-[#3b82f6] bg-white border border-[#e5e5e5] rounded-lg hover:bg-[#f8faff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]/30 transition-all duration-200 h-11 flex items-center justify-center"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={resetAdjustmentForm}
                className="px-4 sm:px-5 py-2.5 text-sm font-medium text-[#6b7280] bg-white border border-[#e5e5e5] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500/30 transition-all duration-200 h-11 flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Réinitialiser
              </button>
              <button
                type="button"
                onClick={handleAdjustmentSubmit}
                disabled={!adjustment.quantity || !adjustment.reason}
                className="px-4 sm:px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#3b82f6] to-[#2563eb] border border-transparent rounded-lg hover:from-[#3b82f6]/90 hover:to-[#2563eb]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]/50 transition-all duration-200 h-11 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                Valider l'ajustement
              </button>
            </div>
          </CardContent>
        </Card>
      )}{" "}      {/* Actions */}
      {showAdjustments && (
        <div className="flex items-center gap-2 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdjustmentForm(true)}
            className="flex items-center gap-1 bg-white hover:bg-purple-50 text-purple-700 border-purple-300 hover:border-purple-400 text-xs sm:text-sm w-full sm:w-auto justify-center"
          >
            <History className="h-3 w-3 sm:h-4 sm:w-4" />
            Ajustement de stock
          </Button>
        </div>
      )}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Informations de Stock */}
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
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Seuil minimum
                </span>
                <span className="font-medium">
                  {item.seuilMinimum} {item.uniteMesure}
                </span>
              </div>
            )}

            {item.seuilMaximum && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Seuil maximum
                </span>
                <span className="font-medium">
                  {item.seuilMaximum} {item.uniteMesure}
                </span>
              </div>
            )}

            {item.emplacement && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-foreground-muted)]">
                  Emplacement
                </span>
                <span className="font-medium">{item.emplacement}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informations Financières */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-green-800">
              <DollarSign className="h-4 w-4 text-green-600" />
              Informations Financières
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-foreground-muted)]">
                Prix d'achat
              </span>
              <span className="font-medium">
                {formatCurrency(item.prixAchat)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-foreground-muted)]">
                Prix de vente
              </span>
              <span className="font-medium">
                {formatCurrency(item.prixVente)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-foreground-muted)]">
                Marge
              </span>
              <span
                className={`font-medium ${parseFloat(calculateMargin()) > 0 ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}
              >
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
                  {typeof item.fournisseur === "string"
                    ? item.fournisseur
                    : item.fournisseur.nom}
                </h4>
                {typeof item.fournisseur === "object" &&
                  item.fournisseur.contact && (
                    <p className="text-sm text-[var(--color-foreground-muted)]">
                      {item.fournisseur.contact}
                    </p>
                  )}
              </div>
              {item.delaiLivraison && (
                <div className="text-right">
                  <div className="text-sm text-[var(--color-foreground-muted)]">
                    Délai de livraison
                  </div>
                  <div className="font-medium">{item.delaiLivraison} jours</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      {/* Historique des mouvements */}
      {stockMovements && stockMovements.length > 0 && (
        <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Historique des Mouvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StockMovementsTable
              movements={stockMovements}
              showArticleColumn={false}
              page={movPage}
              pageSize={movPageSize}
              onPageChange={setMovPage}
              onPageSizeChange={(n) => {
                setMovPageSize(n);
                setMovPage(1);
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
