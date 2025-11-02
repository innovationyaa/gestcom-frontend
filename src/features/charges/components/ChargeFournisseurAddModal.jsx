// filepath: src/features/charges/components/ChargeFournisseurAddModal.jsx
import { useState } from "react";
import { DetailModal } from "@/components/modals";
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

const TVA_RATES = [
  { value: "0", label: "0%" },
  { value: "7", label: "7%" },
  { value: "10", label: "10%" },
  { value: "14", label: "14%" },
  { value: "20", label: "20%" },
];

const CATEGORIES = [
  "Services informatiques",
  "Entretien et réparations",
  "Fournitures",
  "Transport et logistique",
  "Services professionnels",
  "Marketing et publicité",
  "Équipement et mobilier",
  "Autre",
];

export default function ChargeFournisseurAddModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    fournisseur: "",
    libelle: "",
    montantHT: "",
    tva: "20",
    reference: "",
    categorie: "",
    notes: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const onSelectChange = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const calculateTotals = () => {
    const ht = parseFloat(form.montantHT) || 0;
    const tvaRate = parseFloat(form.tva) || 0;
    const tvaAmount = (ht * tvaRate) / 100;
    const ttc = ht + tvaAmount;
    return { tvaAmount, ttc };
  };

  const submit = async () => {
    setError("");
    if (!form.date) return setError("La date est requise.");
    if (!form.fournisseur) return setError("Le fournisseur est requis.");
    if (!form.libelle) return setError("Le libellé est requis.");
    if (!form.montantHT || parseFloat(form.montantHT) <= 0)
      return setError("Le montant HT est requis et doit être positif.");

    try {
      setLoading(true);
      const { tvaAmount, ttc } = calculateTotals();

      const payload = {
        date: form.date,
        fournisseur: form.fournisseur,
        libelle: form.libelle,
        montantHT: parseFloat(form.montantHT),
        tva: parseFloat(form.tva),
        montantTVA: tvaAmount,
        montantTTC: ttc,
        status: "en_attente",
        reference: form.reference || undefined,
        categorie: form.categorie || "Autre",
        notes: form.notes || undefined,
      };

      const res = await onCreate?.(payload);
      if (res?.success) {
        onClose?.();
      } else if (res?.error) {
        setError(res.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const { tvaAmount, ttc } = calculateTotals();

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle Charge Fournisseur"
      size="large"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto -mx-2 px-2">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Date <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Fournisseur <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              name="fournisseur"
              placeholder="Nom du fournisseur"
              value={form.fournisseur}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-sm font-medium text-[#171717]">
              Libellé <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              name="libelle"
              placeholder="Description de la charge"
              value={form.libelle}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Montant HT (DH) <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              type="number"
              name="montantHT"
              placeholder="0.00"
              step="0.01"
              value={form.montantHT}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Taux TVA
            </Label>
            <Select
              value={form.tva}
              onValueChange={(value) => onSelectChange("tva", value)}
            >
              <SelectTrigger className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TVA_RATES.map((rate) => (
                  <SelectItem key={rate.value} value={rate.value}>
                    {rate.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Catégorie
            </Label>
            <Select
              value={form.categorie}
              onValueChange={(value) => onSelectChange("categorie", value)}
            >
              <SelectTrigger className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Référence
            </Label>
            <Input
              name="reference"
              placeholder="N° facture, bon de commande..."
              value={form.reference}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">Notes</Label>
            <Textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={onChange}
              placeholder="Notes complémentaires (optionnel)"
              className="w-full min-h-[100px] border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm p-3.5 transition-all duration-200 focus:outline-none resize-none"
            />
          </div>

          {form.montantHT && (
            <div className="md:col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-900 font-medium">Montant HT:</span>
                <span className="text-blue-900 font-semibold">
                  {parseFloat(form.montantHT).toFixed(2)} DH
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">TVA ({form.tva}%):</span>
                <span className="text-blue-700 font-medium">
                  {tvaAmount.toFixed(2)} DH
                </span>
              </div>
              <div className="flex justify-between text-base border-t border-blue-300 pt-2">
                <span className="text-blue-900 font-bold">Total TTC:</span>
                <span className="text-blue-900 font-bold text-lg">
                  {ttc.toFixed(2)} DH
                </span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 mt-2 border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-medium text-[var(--color-foreground)] bg-white border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-blue)]/30 transition-all duration-200 h-11 flex items-center disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-medium text-white bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-blue)]/50 transition-all duration-200 h-11 flex items-center shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer la charge"}
          </button>
        </div>
      </div>
    </DetailModal>
  );
}
