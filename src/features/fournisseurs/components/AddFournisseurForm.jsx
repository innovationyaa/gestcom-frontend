import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Loader2 } from "lucide-react";

export function AddFournisseurForm({ open, onOpenChange, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    ice: "",
    ifNumber: "",
    contact: "",
    adresse: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.contact.trim()) newErrors.contact = "Le contact est requis";
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const payload = {
        nom: formData.nom,
        ice: formData.ice,
        ifNumber: formData.ifNumber,
        contact: formData.contact,
        adresse: formData.adresse,
      };
      const result = await onSubmit(payload);
      if (result.success) {
        handleReset();
        onOpenChange(false);
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Erreur lors de l'ajout du fournisseur" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ nom: "", ice: "", ifNumber: "", contact: "", adresse: "" });
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--color-surface)] border-[var(--color-border)] max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--color-foreground)]">
            <Building className="h-5 w-5" />
            Nouveau Fournisseur
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                placeholder="Nom du fournisseur"
                className={`bg-[var(--color-surface)] border-[var(--color-border)] ${errors.nom ? "border-red-500" : ""}`}
              />
              {errors.nom && (
                <p className="text-xs text-red-500">{errors.nom}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ice">ICE</Label>
                <Input
                  id="ice"
                  value={formData.ice}
                  onChange={(e) => handleInputChange("ice", e.target.value)}
                  placeholder="ICE"
                  className="bg-[var(--color-surface)] border-[var(--color-border)]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ifNumber">IF</Label>
                <Input
                  id="ifNumber"
                  value={formData.ifNumber}
                  onChange={(e) =>
                    handleInputChange("ifNumber", e.target.value)
                  }
                  placeholder="IF"
                  className="bg-[var(--color-surface)] border-[var(--color-border)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact *</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
                placeholder="Email ou téléphone"
                className={`bg-[var(--color-surface)] border-[var(--color-border)] ${errors.contact ? "border-red-500" : ""}`}
              />
              {errors.contact && (
                <p className="text-xs text-red-500">{errors.contact}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse *</Label>
              <Textarea
                id="adresse"
                value={formData.adresse}
                onChange={(e) => handleInputChange("adresse", e.target.value)}
                placeholder="Adresse complète"
                rows={2}
                className={`bg-[var(--color-surface)] border-[var(--color-border)] ${errors.adresse ? "border-red-500" : ""}`}
              />
              {errors.adresse && (
                <p className="text-xs text-red-500">{errors.adresse}</p>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="bg-[var(--color-surface)] hover:bg-gray-50 text-gray-700 border-gray-300"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Ajout en cours...
                </>
              ) : (
                "Ajouter le fournisseur"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
