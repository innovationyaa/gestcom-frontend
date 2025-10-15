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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Loader2 } from "lucide-react";

export function AddFournisseurForm({ open, onOpenChange, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    codePostal: "",
    ville: "",
    pays: "France",
    type: "entreprise",
    statut: "actif",
    siret: "",
    siteweb: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    }

    if (!formData.adresse.trim()) {
      newErrors.adresse = "L'adresse est requise";
    }

    if (!formData.ville.trim()) {
      newErrors.ville = "La ville est requise";
    }

    if (!formData.codePostal.trim()) {
      newErrors.codePostal = "Le code postal est requis";
    }

    if (formData.type === "entreprise" && !formData.siret.trim()) {
      newErrors.siret = "Le SIRET est requis pour les entreprises";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await onSubmit(formData);
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
    setFormData({
      nom: "",
      email: "",
      telephone: "",
      adresse: "",
      codePostal: "",
      ville: "",
      pays: "France",
      type: "entreprise",
      statut: "actif",
      siret: "",
      siteweb: "",
    });
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--color-surface)] border-[var(--color-border)] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--color-foreground)]">
            <Building className="h-5 w-5" />
            Nouveau Fournisseur
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-[var(--color-foreground)]">
              Informations générales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                  className={`bg-[var(--color-surface)] border-[var(--color-border)] ${
                    errors.nom ? "border-red-500" : ""
                  }`}
                  placeholder="Nom du fournisseur"
                />
                {errors.nom && (
                  <p className="text-xs text-red-500">{errors.nom}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <SelectItem value="entreprise">Entreprise</SelectItem>
                    <SelectItem value="particulier">Particulier</SelectItem>
                    <SelectItem value="association">Association</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-[var(--color-surface)] border-[var(--color-border)] ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="email@exemple.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input
                  id="telephone"
                  value={formData.telephone}
                  onChange={(e) =>
                    handleInputChange("telephone", e.target.value)
                  }
                  className={`bg-[var(--color-surface)] border-[var(--color-border)] ${
                    errors.telephone ? "border-red-500" : ""
                  }`}
                  placeholder="+33 1 23 45 67 89"
                />
                {errors.telephone && (
                  <p className="text-xs text-red-500">{errors.telephone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-[var(--color-foreground)]">
              Adresse
            </h3>

            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse *</Label>
              <Textarea
                id="adresse"
                value={formData.adresse}
                onChange={(e) => handleInputChange("adresse", e.target.value)}
                className={`bg-[var(--color-surface)] border-[var(--color-border)] ${
                  errors.adresse ? "border-red-500" : ""
                }`}
                placeholder="Adresse complète"
                rows={2}
              />
              {errors.adresse && (
                <p className="text-xs text-red-500">{errors.adresse}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codePostal">Code Postal *</Label>
                <Input
                  id="codePostal"
                  value={formData.codePostal}
                  onChange={(e) =>
                    handleInputChange("codePostal", e.target.value)
                  }
                  className={`bg-[var(--color-surface)] border-[var(--color-border)] ${
                    errors.codePostal ? "border-red-500" : ""
                  }`}
                  placeholder="75001"
                />
                {errors.codePostal && (
                  <p className="text-xs text-red-500">{errors.codePostal}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ville">Ville *</Label>
                <Input
                  id="ville"
                  value={formData.ville}
                  onChange={(e) => handleInputChange("ville", e.target.value)}
                  className={`bg-[var(--color-surface)] border-[var(--color-border)] ${
                    errors.ville ? "border-red-500" : ""
                  }`}
                  placeholder="Paris"
                />
                {errors.ville && (
                  <p className="text-xs text-red-500">{errors.ville}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pays">Pays</Label>
                <Input
                  id="pays"
                  value={formData.pays}
                  onChange={(e) => handleInputChange("pays", e.target.value)}
                  className="bg-[var(--color-surface)] border-[var(--color-border)]"
                  placeholder="France"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-[var(--color-foreground)]">
              Informations complémentaires
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.type === "entreprise" && (
                <div className="space-y-2">
                  <Label htmlFor="siret">SIRET *</Label>
                  <Input
                    id="siret"
                    value={formData.siret}
                    onChange={(e) => handleInputChange("siret", e.target.value)}
                    className={`bg-[var(--color-surface)] border-[var(--color-border)] ${
                      errors.siret ? "border-red-500" : ""
                    }`}
                    placeholder="12345678901234"
                  />
                  {errors.siret && (
                    <p className="text-xs text-red-500">{errors.siret}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="siteweb">Site Web</Label>
                <Input
                  id="siteweb"
                  type="url"
                  value={formData.siteweb}
                  onChange={(e) => handleInputChange("siteweb", e.target.value)}
                  className="bg-[var(--color-surface)] border-[var(--color-border)]"
                  placeholder="https://exemple.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select
                  value={formData.statut}
                  onValueChange={(value) => handleInputChange("statut", value)}
                >
                  <SelectTrigger className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                    <SelectItem value="suspendu">Suspendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
