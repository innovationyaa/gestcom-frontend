import { useState, useEffect } from "react";
import { X, Package, Save, Loader2, ChevronDown } from "lucide-react";
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
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import fournisseursService from "@/services/fournisseursService";

export function AddProductForm({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    reference: "",
    nom: "",
    description: "",
    quantiteActuelle: "",
    prixAchat: "",
    prixVente: "",
    seuilMinimum: "",
    fournisseurId: "",
  });
  const [fournisseurs, setFournisseurs] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch fournisseurs on mount
  useEffect(() => {
    const loadFournisseurs = async () => {
      try {
        const data = await fournisseursService.getAll();
        setFournisseurs(data);
      } catch (err) {
        console.error("Error loading fournisseurs:", err);
      }
    };
    if (isOpen) {
      loadFournisseurs();
      setError(""); // Clear any previous errors when modal opens
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setImageFile(file);
      }
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Format the data for backend
      const productData = {
        reference: formData.reference,
        nom: formData.nom,
        description: formData.description || "",
        quantiteActuelle: parseInt(formData.quantiteActuelle, 10) || 0,
        prixAchat: parseFloat(formData.prixAchat),
        prixVente: parseFloat(formData.prixVente),
        seuilMinimum: parseInt(formData.seuilMinimum, 10) || 0,
        fournisseurId: formData.fournisseurId
          ? parseInt(formData.fournisseurId, 10)
          : null,
      };

      const result = await onSave(productData);

      if (result?.success) {
        // Reset form
        setFormData({
          reference: "",
          nom: "",
          description: "",
          quantiteActuelle: "",
          prixAchat: "",
          prixVente: "",
          seuilMinimum: "",
          fournisseurId: "",
        });
        setPreviewUrl("");
        setImageFile(null);
        onClose();
      } else {
        setError(result?.error || "Erreur lors de l'ajout du produit");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      setError(error.message || "Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white rounded-xl shadow-xl overflow-visible p-0 [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:right-4 [&>button]:top-4">
        <DialogHeader className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-white m-0">
                  Ajouter un nouvel article
                </DialogTitle>
                <DialogDescription className="text-sm text-white/90 mt-1">
                  Remplissez les détails du nouvel article à ajouter au stock
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto -mx-2 px-2">
            {/* Colonne de gauche */}
            <div className="space-y-4 overflow-visible">
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
                  required
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="nom"
                  className="text-sm font-medium text-[#171717]"
                >
                  Nom du produit <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ex: Ordinateur Portable"
                  required
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
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
                  placeholder="Description détaillée du produit"
                  rows={3}
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm transition-all duration-200 bg-[#f8faff] min-h-[100px] p-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fournisseurId"
                  className="text-sm font-medium text-[#171717]"
                >
                  Fournisseur
                </Label>
                <Select
                  value={formData.fournisseurId || undefined}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, fournisseurId: value }))
                  }
                >
                  <SelectTrigger className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 bg-[#f8faff]">
                    <SelectValue placeholder="Sélectionner un fournisseur (optionnel)" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-[#e0e7ff] shadow-lg">
                    {fournisseurs.map((f) => (
                      <SelectItem key={f.id} value={f.id.toString()}>
                        {f.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="imageFile"
                  className="text-sm font-medium text-[#171717]"
                >
                  Image du produit
                </Label>
                <input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm text-[var(--color-foreground)] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-[var(--color-border)] file:text-sm file:font-medium file:bg-white file:text-[var(--color-foreground)] hover:file:bg-[var(--color-background)]"
                />
                {previewUrl && (
                  <div className="mt-2 h-20 w-20 rounded-md overflow-hidden border border-[var(--color-border)]">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-4 overflow-visible">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="quantiteActuelle"
                    className="text-sm font-medium text-[#171717]"
                  >
                    Quantité <span className="text-[#ef4444]">*</span>
                  </Label>
                  <Input
                    id="quantiteActuelle"
                    name="quantiteActuelle"
                    type="number"
                    min="0"
                    value={formData.quantiteActuelle}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="seuilMinimum"
                    className="text-sm font-medium text-[#171717]"
                  >
                    Seuil Min <span className="text-[#ef4444]">*</span>
                  </Label>
                  <Input
                    id="seuilMinimum"
                    name="seuilMinimum"
                    type="number"
                    min="0"
                    value={formData.seuilMinimum}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                  />
                </div>
              </div>

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
                  min="0"
                  step="0.01"
                  value={formData.prixAchat}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
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
                  min="0"
                  step="0.01"
                  value={formData.prixVente}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
              </div>

              <div className="space-y-2 bg-gradient-to-br from-[#f0f7ff] to-[#e0f0ff] rounded-lg p-4 border border-[#bfdbfe]">
                <h4 className="text-sm font-semibold text-[#1e40af] mb-2">
                  Informations calculées
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#475569]">Marge unitaire:</span>
                    <span className="font-semibold text-[#1e40af]">
                      {formData.prixVente && formData.prixAchat
                        ? `${(
                            parseFloat(formData.prixVente) -
                            parseFloat(formData.prixAchat)
                          ).toFixed(2)} MAD`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#475569]">Taux de marge:</span>
                    <span className="font-semibold text-[#1e40af]">
                      {formData.prixVente && formData.prixAchat
                        ? `${(
                            ((parseFloat(formData.prixVente) -
                              parseFloat(formData.prixAchat)) /
                              parseFloat(formData.prixAchat)) *
                            100
                          ).toFixed(1)}%`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#475569]">Valeur du stock:</span>
                    <span className="font-semibold text-[#1e40af]">
                      {formData.quantiteActuelle && formData.prixAchat
                        ? `${(
                            parseInt(formData.quantiteActuelle) *
                            parseFloat(formData.prixAchat)
                          ).toFixed(2)} MAD`
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-4 border-t border-[#e5f2ff]">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-[#3b82f6] bg-white border border-[#e5e5e5] rounded-lg hover:bg-[#f8faff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]/30 transition-all duration-200 h-11 flex items-center"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#3b82f6] to-[#2563eb] border border-transparent rounded-lg hover:from-[#3b82f6]/90 hover:to-[#2563eb]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]/50 transition-all duration-200 h-11 flex items-center shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer l'article
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
