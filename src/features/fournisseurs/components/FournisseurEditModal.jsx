import React, { useState } from "react";
import { User, Save, Loader2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";

export default function FournisseurEditModal({ fournisseur, open, onClose, onSave }) {
  const [form, setForm] = useState({
    nom: fournisseur?.nom || "",
    ice: fournisseur?.ice || "",
    ifNumber: fournisseur?.ifNumber || "",
    contact: fournisseur?.contact || "",
    adresse: fournisseur?.adresse || "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setForm({
      nom: fournisseur?.nom || "",
      ice: fournisseur?.ice || "",
      ifNumber: fournisseur?.ifNumber || "",
      contact: fournisseur?.contact || "",
      adresse: fournisseur?.adresse || "",
    });
  }, [fournisseur]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = "Le nom est obligatoire";
    if (!form.ice.trim()) newErrors.ice = "ICE est obligatoire";
    if (!form.ifNumber.trim()) newErrors.ifNumber = "IF est obligatoire";
    if (!form.contact.trim()) newErrors.contact = "Contact est obligatoire";
    if (!form.adresse.trim()) newErrors.adresse = "Adresse est obligatoire";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await onSave(form);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-xl shadow-xl overflow-visible p-0">
        <DialogHeader className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4 relative">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white/20">
              <User className="h-5 w-5 text-white" />
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
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto -mx-2 px-2">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nom" className="text-sm font-medium text-[#171717]">Nom <span className="text-[#ef4444]">*</span></Label>
                <Input
                  id="nom"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="Ex: Fournisseur B"
                  className="w-full border-[#dbeafe] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#eff6ff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
                  required
                />
                {errors.nom && <span className="text-xs text-red-500">{errors.nom}</span>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ice" className="text-sm font-medium text-[#171717]">ICE <span className="text-[#ef4444]">*</span></Label>
                <Input
                  id="ice"
                  name="ice"
                  value={form.ice}
                  onChange={handleChange}
                  placeholder="Ex: 123456784"
                  className="w-full border-[#dbeafe] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#eff6ff] px-3.5 focus:outline-none"
                  required
                />
                {errors.ice && <span className="text-xs text-red-500">{errors.ice}</span>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ifNumber" className="text-sm font-medium text-[#171717]">IF <span className="text-[#ef4444]">*</span></Label>
                <Input
                  id="ifNumber"
                  name="ifNumber"
                  value={form.ifNumber}
                  onChange={handleChange}
                  placeholder="Ex: 12321"
                  className="w-full border-[#dbeafe] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#eff6ff] px-3.5 focus:outline-none"
                  required
                />
                {errors.ifNumber && <span className="text-xs text-red-500">{errors.ifNumber}</span>}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="contact" className="text-sm font-medium text-[#171717]">Contact <span className="text-[#ef4444]">*</span></Label>
                <Input
                  id="contact"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Ex: fourn@gmail.com"
                  className="w-full border-[#dbeafe] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#eff6ff] px-3.5 focus:outline-none"
                  required
                />
                {errors.contact && <span className="text-xs text-red-500">{errors.contact}</span>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="adresse" className="text-sm font-medium text-[#171717]">Adresse <span className="text-[#ef4444]">*</span></Label>
                <Textarea
                  id="adresse"
                  name="adresse"
                  value={form.adresse}
                  onChange={handleChange}
                  placeholder="Ex: test adresse"
                  className="w-full border-[#dbeafe] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 rounded-lg text-sm transition-all duration-200 bg-[#eff6ff] px-3.5 focus:outline-none"
                  required
                  rows={3}
                />
                {errors.adresse && <span className="text-xs text-red-500">{errors.adresse}</span>}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6 gap-2">
            <Button type="button" variant="secondary" size="lg" onClick={onClose} className="rounded-lg h-11 px-6 text-sm bg-[#e0e7ff] text-[#2563eb] hover:bg-[#c7d2fe]">
              Annuler
            </Button>
            <Button type="submit" variant="default" size="lg" className="rounded-lg h-11 px-6 text-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4 mr-1" />} Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
