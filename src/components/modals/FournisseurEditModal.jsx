import React, { useState } from "react";
import { Users, Save, Loader2, ChevronDown } from "lucide-react";
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

export function FournisseurEditModal({ fournisseur, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nom: fournisseur?.nom || "",
    email: fournisseur?.email || "",
    telephone: fournisseur?.telephone || "",
    adresse: fournisseur?.adresse || "",
    ville: fournisseur?.ville || "",
    codePostal: fournisseur?.codePostal || "",
    pays: fournisseur?.pays || "",
    siret: fournisseur?.siret || "",
    tva: fournisseur?.tva || "",
    categorie: fournisseur?.categorie || "",
    delaiPaiement: fournisseur?.delaiPaiement || 30,
    notes: fournisseur?.notes || "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est obligatoire";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (formData.telephone && !/^[0-9+\-\s()]+$/.test(formData.telephone)) {
      newErrors.telephone = "Numéro de téléphone invalide";
    }
    if (formData.delaiPaiement < 0) {
      newErrors.delaiPaiement = "Le délai de paiement ne peut pas être négatif";
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
      const fournisseurData = {
        ...formData,
        delaiPaiement: parseInt(formData.delaiPaiement, 10),
        dateModification: new Date().toISOString().split("T")[0],
      };

      await onSave(fournisseurData);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={!!fournisseur} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white rounded-xl shadow-xl overflow-visible p-0 [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:right-4 [&>button]:top-4">
        <DialogHeader className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-white m-0">
                  Modifier le fournisseur
                </DialogTitle>
                <DialogDescription className="text-sm text-white/90 mt-1">
                  Modifiez les informations du fournisseur
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
                  htmlFor="nom"
                  className="text-sm font-medium text-[#171717]"
                >
                  Nom de l'entreprise <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ex: TechCorp SARL"
                  className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#faf5ff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
                {errors.nom && (
                  <p className="text-sm text-red-500">{errors.nom}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-[#171717]"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@techcorp.fr"
                  className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#faf5ff] px-3.5 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="telephone"
                  className="text-sm font-medium text-[#171717]"
                >
                  Téléphone
                </Label>
                <Input
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="01 23 45 67 89"
                  className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#faf5ff] px-3.5 focus:outline-none"
                />
                {errors.telephone && (
                  <p className="text-sm text-red-500">{errors.telephone}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="adresse"
                  className="text-sm font-medium text-[#171717]"
                >
                  Adresse
                </Label>
                <Textarea
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  placeholder="123 Rue de la République"
                  rows={2}
                  className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm transition-all duration-200 bg-[#faf5ff] px-3.5 py-2.5 resize-none focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="codePostal"
                    className="text-sm font-medium text-[#171717]"
                  >
                    Code postal
                  </Label>
                  <Input
                    id="codePostal"
                    name="codePostal"
                    value={formData.codePostal}
                    onChange={handleChange}
                    placeholder="75001"
                    className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#faf5ff] px-3.5 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="ville"
                    className="text-sm font-medium text-[#171717]"
                  >
                    Ville
                  </Label>
                  <Input
                    id="ville"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                    placeholder="Paris"
                    className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#faf5ff] px-3.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pays"
                  className="text-sm font-medium text-[#171717]"
                >
                  Pays
                </Label>
                <div className="relative">
                  <select
                    id="pays"
                    name="pays"
                    value={formData.pays}
                    onChange={handleChange}
                    className="w-full h-11 pl-3 pr-8 text-sm border border-[#e9d5ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/30 focus:border-[#8b5cf6] appearance-none bg-[#faf5ff] transition-all duration-200"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Allemagne">Allemagne</option>
                    <option value="Espagne">Espagne</option>
                    <option value="Italie">Italie</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="siret"
                  className="text-sm font-medium text-[#171717]"
                >
                  SIRET
                </Label>
                <Input
                  id="siret"
                  name="siret"
                  value={formData.siret}
                  onChange={handleChange}
                  placeholder="12345678901234"
                  className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#faf5ff] px-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="tva"
                  className="text-sm font-medium text-[#171717]"
                >
                  Numéro de TVA
                </Label>
                <Input
                  id="tva"
                  name="tva"
                  value={formData.tva}
                  onChange={handleChange}
                  placeholder="FR12345678901"
                  className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#faf5ff] px-3.5 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="categorie"
                  className="text-sm font-medium text-[#171717]"
                >
                  Catégorie
                </Label>
                <div className="relative">
                  <select
                    id="categorie"
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    className="w-full h-11 pl-3 pr-8 text-sm border border-[#e9d5ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/30 focus:border-[#8b5cf6] appearance-none bg-[#faf5ff] transition-all duration-200"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Fournitures">Fournitures</option>
                    <option value="Services">Services</option>
                    <option value="Équipements">Équipements</option>
                    <option value="Alimentaire">Alimentaire</option>
                    <option value="Textile">Textile</option>
                    <option value="Construction">Construction</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="delaiPaiement"
                  className="text-sm font-medium text-[#171717]"
                >
                  Délai de paiement (jours)
                </Label>
                <Input
                  id="delaiPaiement"
                  name="delaiPaiement"
                  type="number"
                  value={formData.delaiPaiement}
                  onChange={handleChange}
                  placeholder="30"
                  min="0"
                  className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#faf5ff] px-3.5 focus:outline-none"
                />
                {errors.delaiPaiement && (
                  <p className="text-sm text-red-500">{errors.delaiPaiement}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="notes"
                  className="text-sm font-medium text-[#171717]"
                >
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Notes sur le fournisseur..."
                  rows={5}
                  className="w-full border-[#e9d5ff] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 rounded-lg text-sm transition-all duration-200 bg-[#faf5ff] px-3.5 py-2.5 resize-none focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-4 border-t border-[#e9d5ff] md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-[#8b5cf6] bg-white border border-[#e5e5e5] rounded-lg hover:bg-[#faf5ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b5cf6]/30 transition-all duration-200 h-11 flex items-center"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] border border-transparent rounded-lg hover:from-[#8b5cf6]/90 hover:to-[#7c3aed]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b5cf6]/50 transition-all duration-200 h-11 flex items-center shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Modification...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Modifier le fournisseur
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
