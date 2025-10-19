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
    categorie: item?.categorie || "",
    quantite: item?.quantite || 0,
    seuilMinimum: item?.seuilMinimum || 0,
    seuilMaximum: item?.seuilMaximum || 0,
    uniteMesure: item?.uniteMesure || "pièces",
    prixAchat: item?.prixAchat || 0,
    prixVente: item?.prixVente || 0,
    fournisseur:
      typeof item?.fournisseur === "string"
        ? item.fournisseur
        : item?.fournisseur?.nom || "",
    emplacement: item?.emplacement || "",
    delaiLivraison: item?.delaiLivraison || 0,
    imageUrl: item?.imageUrl || "",
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
    if (formData.quantite < 0) {
      newErrors.quantite = "La quantité ne peut pas être négative";
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
        ...formData,
        quantite: parseInt(formData.quantite, 10),
        seuilMinimum: parseInt(formData.seuilMinimum, 10),
        seuilMaximum: parseInt(formData.seuilMaximum, 10),
        prixAchat: parseFloat(formData.prixAchat),
        prixVente: parseFloat(formData.prixVente),
        delaiLivraison: parseInt(formData.delaiLivraison, 10),
        dateModification: new Date().toISOString().split("T")[0],
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
              </div>

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
                  htmlFor="categorie"
                  className="text-sm font-medium text-[#171717]"
                >
                  Catégorie
                </Label>
                <Input
                  id="categorie"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  placeholder="Ex: Informatique"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="quantite"
                  className="text-sm font-medium text-[#171717]"
                >
                  Quantité en stock
                </Label>
                <Input
                  id="quantite"
                  name="quantite"
                  type="number"
                  value={formData.quantite}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
                {errors.quantite && (
                  <p className="text-sm text-red-500">{errors.quantite}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="uniteMesure"
                  className="text-sm font-medium text-[#171717]"
                >
                  Unité de mesure
                </Label>
                <div className="relative">
                  <select
                    id="uniteMesure"
                    name="uniteMesure"
                    value={formData.uniteMesure}
                    onChange={handleChange}
                    className="w-full h-11 pl-3 pr-8 text-sm border border-[#dcfce7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 focus:border-[#22c55e] appearance-none bg-[#f0fdf4] transition-all duration-200"
                  >
                    <option value="pièces">Pièces</option>
                    <option value="kg">Kilogramme</option>
                    <option value="g">Gramme</option>
                    <option value="L">Litre</option>
                    <option value="m">Mètre</option>
                    <option value="m²">Mètre carré</option>
                    <option value="m³">Mètre cube</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
                </div>
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
            </div>

            {/* Colonne de droite */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="seuilMinimum"
                  className="text-sm font-medium text-[#171717]"
                >
                  Seuil minimum
                </Label>
                <Input
                  id="seuilMinimum"
                  name="seuilMinimum"
                  type="number"
                  value={formData.seuilMinimum}
                  onChange={handleChange}
                  placeholder="5"
                  min="0"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="seuilMaximum"
                  className="text-sm font-medium text-[#171717]"
                >
                  Seuil maximum
                </Label>
                <Input
                  id="seuilMaximum"
                  name="seuilMaximum"
                  type="number"
                  value={formData.seuilMaximum}
                  onChange={handleChange}
                  placeholder="100"
                  min="0"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="prixAchat"
                  className="text-sm font-medium text-[#171717]"
                >
                  Prix d'achat (€)
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
                  Prix de vente (€)
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
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
                {errors.prixVente && (
                  <p className="text-sm text-red-500">{errors.prixVente}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fournisseur"
                  className="text-sm font-medium text-[#171717]"
                >
                  Fournisseur
                </Label>
                <Input
                  id="fournisseur"
                  name="fournisseur"
                  value={formData.fournisseur}
                  onChange={handleChange}
                  placeholder="Nom du fournisseur"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="emplacement"
                  className="text-sm font-medium text-[#171717]"
                >
                  Emplacement
                </Label>
                <Input
                  id="emplacement"
                  name="emplacement"
                  value={formData.emplacement}
                  onChange={handleChange}
                  placeholder="Ex: Allée A, Étagère 3"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="imageUrl"
                  className="text-sm font-medium text-[#171717]"
                >
                  Image de l'article
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://exemple.com/image.jpg"
                  className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
                />
                <div className="mt-2">
                  {formData.imageUrl ? (
                    <img
                      src={formData.imageUrl}
                      alt="Aperçu"
                      className="h-20 w-20 object-cover rounded border border-[#dcfce7] bg-white"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-xs text-[#737373]">Aucune image</span>
                  )}
                </div>
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
