// filepath: src/features/stock/components/StockEditModal.jsx
import React, { useState } from "react";
import { Package, Save, Loader2, ChevronDown } from "lucide-react";
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

export default function StockEditModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    reference: item?.reference || "",
    nom: item?.nom || "",
    description: item?.description || "",
    quantiteActuelle: item?.quantiteActuelle || item?.quantite || 0,
    seuilMinimum: item?.seuilMinimum || 0,
    prixAchat: item?.prixAchat || 0,
    prixVente: item?.prixVente || 0,
    fournisseurId:
      typeof item?.fournisseur === "object"
        ? item.fournisseur?.id
        : item?.fournisseurId || null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.reference.trim()) {
      newErrors.reference = "La référence est obligatoire";
    }
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est obligatoire";
    }
    if (formData.quantiteActuelle < 0) {
      newErrors.quantiteActuelle = "La quantité ne peut pas être négative";
    }
    if (formData.prixAchat < 0) {
      newErrors.prixAchat = "Le prix d'achat ne peut pas être négatif";
    }
    if (formData.prixVente < 0) {
      newErrors.prixVente = "Le prix de vente ne peut pas être négatif";
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
      const stockData = {
        reference: formData.reference,
        nom: formData.nom,
        description: formData.description || "",
        quantiteActuelle: parseInt(formData.quantiteActuelle, 10),
        seuilMinimum: parseInt(formData.seuilMinimum, 10),
        prixAchat: parseFloat(formData.prixAchat),
        prixVente: parseFloat(formData.prixVente),
        fournisseurId: formData.fournisseurId
          ? parseInt(formData.fournisseurId, 10)
          : null,
      };

      await onSave(stockData);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={!!item} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white rounded-xl shadow-xl overflow-visible p-0 [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:right-4 [&>button]:top-4">
        <DialogHeader className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-white m-0">
                  Modifier l'article
                </DialogTitle>
                <DialogDescription className="text-sm text-white/90 mt-1">
                  Modifiez les détails de l'article de stock
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
                  placeholder="Ex: ART123"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
                {errors.reference && (
                  <p className="text-sm text-red-500">{errors.reference}</p>
                )}
              </div>{" "}
              <div className="space-y-1.5">
                <Label
                  htmlFor="nom"
                  className="text-sm font-medium text-[#171717]"
                >
                  Nom de l'article <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ex: Ordinateur portable"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
                {errors.nom && (
                  <p className="text-sm text-red-500">{errors.nom}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-[#171717]"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description détaillée de l'article"
                  rows={3}
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm transition-all duration-200 bg-[#f0fdf4] px-3.5 py-2.5 resize-none focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="quantiteActuelle"
                  className="text-sm font-medium text-[#171717]"
                >
                  Quantité en stock
                </Label>
                <Input
                  id="quantiteActuelle"
                  name="quantiteActuelle"
                  type="number"
                  value={formData.quantiteActuelle}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
                {errors.quantiteActuelle && (
                  <p className="text-sm text-red-500">
                    {errors.quantiteActuelle}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="seuilMinimum"
                  className="text-sm font-medium text-[#171717]"
                >
                  Seuil d'alerte minimum
                </Label>
                <Input
                  id="seuilMinimum"
                  name="seuilMinimum"
                  type="number"
                  value={formData.seuilMinimum}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
              </div>
            </div>{" "}
            {/* Colonne de droite */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="prixAchat"
                  className="text-sm font-medium text-[#171717]"
                >
                  Prix d'achat (MAD) <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="prixAchat"
                  name="prixAchat"
                  type="number"
                  step="0.01"
                  value={formData.prixAchat}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  required
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
                {errors.prixAchat && (
                  <p className="text-sm text-red-500">{errors.prixAchat}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="prixVente"
                  className="text-sm font-medium text-[#171717]"
                >
                  Prix de vente (MAD) <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="prixVente"
                  name="prixVente"
                  type="number"
                  step="0.01"
                  value={formData.prixVente}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  required
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
                {errors.prixVente && (
                  <p className="text-sm text-red-500">{errors.prixVente}</p>
                )}
              </div>

              {/* Display calculated metrics */}
              <div className="space-y-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Marge:</span>
                  <span className="font-medium text-green-700">
                    {formData.prixVente && formData.prixAchat
                      ? `${(formData.prixVente - formData.prixAchat).toFixed(2)} MAD`
                      : "0.00 MAD"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taux de marge:</span>
                  <span className="font-medium text-green-700">
                    {formData.prixVente && formData.prixAchat
                      ? `${(((formData.prixVente - formData.prixAchat) / formData.prixVente) * 100).toFixed(1)}%`
                      : "0%"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valeur du stock:</span>
                  <span className="font-medium text-green-700">
                    {formData.quantiteActuelle && formData.prixAchat
                      ? `${(formData.quantiteActuelle * formData.prixAchat).toFixed(2)} MAD`
                      : "0.00 MAD"}
                  </span>
                </div>{" "}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-4 border-t border-[#dcfce7] md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-[#22c55e] bg-white border border-[#e5e5e5] rounded-lg hover:bg-[#f0fdf4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22c55e]/30 transition-all duration-200 h-11 flex items-center"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#22c55e] to-[#16a34a] border border-transparent rounded-lg hover:from-[#22c55e]/90 hover:to-[#16a34a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22c55e]/50 transition-all duration-200 h-11 flex items-center shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Modification...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Modifier l'article
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
