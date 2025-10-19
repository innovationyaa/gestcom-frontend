import React, { useState } from "react";
import { ShoppingCart, Save, Loader2, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function CommandeEditModal({ commande, onClose, onSave }) {
  const [formData, setFormData] = useState({
    reference: commande?.reference || "",
    fournisseur: commande?.fournisseur || "",
    date: commande?.date || "",
    dateLivraison: commande?.dateLivraison || "",
    montantHT: commande?.montantHT || 0,
    montantTTC: commande?.montantTTC || commande?.montantTotal || 0,
    statut: commande?.statut || "en_attente",
    modePaiement: commande?.modePaiement || "",
    notes: commande?.notes || "",
    tauxTVA: commande?.tauxTVA || 20,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Recalculate amounts when relevant fields change
      if (name === "montantHT" || name === "tauxTVA") {
        const montantHT =
          name === "montantHT" ? parseFloat(value) || 0 : newData.montantHT;
        const tauxTVA =
          name === "tauxTVA" ? parseFloat(value) || 0 : newData.tauxTVA;

        const montantTVA = (montantHT * tauxTVA) / 100;
        const montantTTC = montantHT + montantTVA;

        newData.montantTVA = Math.round(montantTVA * 100) / 100;
        newData.montantTTC = Math.round(montantTTC * 100) / 100;
      }

      return newData;
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.reference.trim()) {
      newErrors.reference = "La référence est obligatoire";
    }
    if (!formData.fournisseur.trim()) {
      newErrors.fournisseur = "Le fournisseur est obligatoire";
    }
    if (!formData.date) {
      newErrors.date = "La date est obligatoire";
    }
    if (formData.montantHT < 0) {
      newErrors.montantHT = "Le montant HT ne peut pas être négatif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const commandeData = {
        ...formData,
        montantHT: parseFloat(formData.montantHT),
        montantTTC: parseFloat(formData.montantTTC),
        tauxTVA: parseFloat(formData.tauxTVA),
        dateModification: new Date().toISOString().split("T")[0],
      };

      await onSave(commandeData);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={!!commande} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white rounded-xl shadow-xl overflow-visible p-0 [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:right-4 [&>button]:top-4">
        <DialogHeader className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/20">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-white m-0">
                  Modifier la commande
                </DialogTitle>
                <DialogDescription className="text-sm text-white/90 mt-1">
                  Modifiez les détails de la commande
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto -mx-2 px-2">
            {/* Colonne de gauche */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="reference"
                  className="text-sm font-medium text-[#171717]"
                >
                  Référence <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  placeholder="Ex: CMD123"
                  className="w-full border-[#fed7aa] focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#fffbeb] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
                {errors.reference && (
                  <p className="text-sm text-red-500">{errors.reference}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fournisseur"
                  className="text-sm font-medium text-[#171717]"
                >
                  Fournisseur <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="fournisseur"
                  name="fournisseur"
                  value={formData.fournisseur}
                  onChange={handleChange}
                  placeholder="Nom du fournisseur"
                  className="w-full border-[#fed7aa] focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#fffbeb] px-3.5 focus:outline-none"
                />
                {errors.fournisseur && (
                  <p className="text-sm text-red-500">{errors.fournisseur}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="date"
                  className="text-sm font-medium text-[#171717]"
                >
                  Date de commande <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border-[#fed7aa] focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#fffbeb] px-3.5 focus:outline-none"
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="dateLivraison"
                  className="text-sm font-medium text-[#171717]"
                >
                  Date de livraison prévue
                </Label>
                <Input
                  id="dateLivraison"
                  name="dateLivraison"
                  type="date"
                  value={formData.dateLivraison}
                  onChange={handleChange}
                  className="w-full border-[#fed7aa] focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#fffbeb] px-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="statut"
                  className="text-sm font-medium text-[#171717]"
                >
                  Statut
                </Label>
                <div className="relative">
                  <select
                    id="statut"
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    className="w-full h-11 pl-3 pr-8 text-sm border border-[#fed7aa] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30 focus:border-[#f59e0b] appearance-none bg-[#fffbeb] transition-all duration-200"
                  >
                    <option value="en_attente">En attente</option>
                    <option value="confirmee">Confirmée</option>
                    <option value="expediee">Expédiée</option>
                    <option value="livree">Livrée</option>
                    <option value="annulee">Annulée</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="modePaiement"
                  className="text-sm font-medium text-[#171717]"
                >
                  Mode de paiement
                </Label>
                <div className="relative">
                  <select
                    id="modePaiement"
                    name="modePaiement"
                    value={formData.modePaiement}
                    onChange={handleChange}
                    className="w-full h-11 pl-3 pr-8 text-sm border border-[#fed7aa] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30 focus:border-[#f59e0b] appearance-none bg-[#fffbeb] transition-all duration-200"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="virement">Virement bancaire</option>
                    <option value="cheque">Chèque</option>
                    <option value="especes">Espèces</option>
                    <option value="carte">Carte bancaire</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="montantHT"
                  className="text-sm font-medium text-[#171717]"
                >
                  Montant HT (€)
                </Label>
                <Input
                  id="montantHT"
                  name="montantHT"
                  type="number"
                  step="0.01"
                  value={formData.montantHT}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  className="w-full border-[#fed7aa] focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#fffbeb] px-3.5 focus:outline-none"
                />
                {errors.montantHT && (
                  <p className="text-sm text-red-500">{errors.montantHT}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="tauxTVA"
                  className="text-sm font-medium text-[#171717]"
                >
                  Taux TVA (%)
                </Label>
                <Input
                  id="tauxTVA"
                  name="tauxTVA"
                  type="number"
                  step="0.01"
                  value={formData.tauxTVA}
                  onChange={handleChange}
                  placeholder="20.00"
                  min="0"
                  max="100"
                  className="w-full border-[#fed7aa] focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#fffbeb] px-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#171717]">
                  Montant TVA (€)
                </Label>
                <Input
                  value={
                    formData.montantTVA ||
                    ((formData.montantHT * formData.tauxTVA) / 100).toFixed(2)
                  }
                  readOnly
                  className="w-full border-[#fed7aa] rounded-lg text-sm h-11 bg-[#f3f4f6] px-3.5 text-[#6b7280] cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#171717]">
                  Montant TTC (€)
                </Label>
                <Input
                  value={
                    formData.montantTTC ||
                    (
                      parseFloat(formData.montantHT) +
                      (formData.montantHT * formData.tauxTVA) / 100
                    ).toFixed(2)
                  }
                  readOnly
                  className="w-full border-[#fed7aa] rounded-lg text-sm h-11 bg-[#f3f4f6] px-3.5 text-[#6b7280] cursor-not-allowed font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="notes"
                  className="text-sm font-medium text-[#171717]"
                >
                  Notes et commentaires
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Ajoutez des notes ou commentaires..."
                  rows={4}
                  className="w-full border-[#fed7aa] focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/30 rounded-lg text-sm transition-all duration-200 bg-[#fffbeb] px-3.5 py-2.5 resize-none focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-4 border-t border-[#fed7aa] md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-[#f59e0b] bg-white border border-[#e5e5e5] rounded-lg hover:bg-[#fffbeb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f59e0b]/30 transition-all duration-200 h-11 flex items-center"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#f59e0b] to-[#d97706] border border-transparent rounded-lg hover:from-[#f59e0b]/90 hover:to-[#d97706]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f59e0b]/50 transition-all duration-200 h-11 flex items-center shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Modification...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Modifier la commande
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
