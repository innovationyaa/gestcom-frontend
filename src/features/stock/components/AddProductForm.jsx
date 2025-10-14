import { useState } from 'react';
import { X, Package, Save, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function AddProductForm({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    reference: '',
    nom: '',
    description: '',
    quantite: '',
    prixAchat: '',
    prixVente: '',
    seuilMinimum: '',
    uniteMesure: 'pièces',
    categorie: '',
    fournisseur: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Format the data before saving
      const productData = {
        ...formData,
        quantite: parseInt(formData.quantite, 10),
        prixAchat: parseFloat(formData.prixAchat),
        prixVente: parseFloat(formData.prixVente),
        seuilMinimum: parseInt(formData.seuilMinimum, 10),
        dateCreation: new Date().toISOString().split('T')[0],
        dateModification: new Date().toISOString().split('T')[0]
      };
      
      await onSave(productData);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto -mx-2 px-2">
            {/* Colonne de gauche */}
            <div className="space-y-4 overflow-visible">
              <div className="space-y-1.5">
                <Label htmlFor="reference" className="text-sm font-medium text-[#171717]">
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
                <Label htmlFor="nom" className="text-sm font-medium text-[#171717]">
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
                <Label htmlFor="categorie" className="text-sm font-medium text-[#171717]">
                  Catégorie <span className="text-[#ef4444]">*</span>
                </Label>
                <Input
                  id="categorie"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  placeholder="Ex: Informatique"
                  required
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fournisseur" className="text-sm font-medium text-[#171717]">
                  Fournisseur
                </Label>
                <Input
                  id="fournisseur"
                  name="fournisseur"
                  value={formData.fournisseur}
                  onChange={handleChange}
                  placeholder="Nom du fournisseur"
                  className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-sm font-medium text-[#171717]">
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
            </div>

            {/* Colonne de droite */}
            <div className="space-y-4 overflow-visible">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="quantite" className="text-sm font-medium text-[#171717]">
                    Quantité <span className="text-[#ef4444]">*</span>
                  </Label>
                  <Input
                    id="quantite"
                    name="quantite"
                    type="number"
                    min="0"
                    value={formData.quantite}
                    onChange={handleChange}
                    required
                    className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="seuilMinimum" className="text-sm font-medium text-[#171717]">
                    Seuil min <span className="text-[#ef4444]">*</span>
                  </Label>
                  <Input
                    id="seuilMinimum"
                    name="seuilMinimum"
                    type="number"
                    min="0"
                    value={formData.seuilMinimum}
                    onChange={handleChange}
                    required
                    className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="prixAchat" className="text-sm font-medium text-[#171717]">
                    Prix d'achat (€) <span className="text-[#ef4444]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="prixAchat"
                      name="prixAchat"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.prixAchat}
                      onChange={handleChange}
                      required
                      className="w-full border-[#e5e5e5] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] rounded-md text-sm h-10 pl-8"
                    />
                    <span className="absolute left-3 top-2.5 text-sm text-[#737373]">€</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="prixVente" className="text-sm font-medium text-[#171717]">
                    Prix de vente (€) <span className="text-[#ef4444]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="prixVente"
                      name="prixVente"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.prixVente}
                      onChange={handleChange}
                      required
                      className="w-full border-[#e5e5e5] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] rounded-md text-sm h-10 pl-8"
                    />
                    <span className="absolute left-3 top-2.5 text-sm text-[#737373]">€</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="uniteMesure" className="text-sm font-medium text-[#171717]">
                  Unité de mesure <span className="text-[#ef4444]">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="uniteMesure"
                    name="uniteMesure"
                    value={formData.uniteMesure}
                    onChange={handleChange}
                    className="w-full h-11 pl-3 pr-8 text-sm border border-[#e0e7ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] appearance-none bg-[#f8faff] transition-all duration-200"
                    required
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
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-4 border-t border-[#e5f2ff] md:col-span-2">
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
