// filepath: src/features/charges/components/ChargeSalarialeAddModal.jsx
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

const CHARGE_TYPES = [
  { value: "salaire", label: "Salaire" },
  { value: "cnss", label: "CNSS" },
  { value: "prime", label: "Prime" },
  { value: "mutuelle", label: "Mutuelle" },
  { value: "formation", label: "Formation" },
  { value: "autre", label: "Autre" },
];

export default function ChargeSalarialeAddModal({ isOpen, onClose, onCreate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    libelle: "",
    type: "salaire",
    montant: "",
    nbrEmployes: "",
    nbrBeneficiaires: "",
    reference: "",
    periode: "",
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

  const submit = async () => {
    setError("");
    if (!form.date) return setError("La date est requise.");
    if (!form.libelle) return setError("Le libellé est requis.");
    if (!form.montant || parseFloat(form.montant) <= 0)
      return setError("Le montant est requis et doit être positif.");

    try {
      setLoading(true);

      const payload = {
        date: form.date,
        libelle: form.libelle,
        type: form.type,
        montant: parseFloat(form.montant),
        status: "en_attente",
        reference: form.reference || undefined,
        periode: form.periode || undefined,
        notes: form.notes || undefined,
      };

      // Add optional numeric fields if provided
      if (form.type === "salaire" && form.nbrEmployes) {
        payload.nbrEmployes = parseInt(form.nbrEmployes);
      }
      if (
        ["prime", "formation", "mutuelle"].includes(form.type) &&
        form.nbrBeneficiaires
      ) {
        payload.nbrBeneficiaires = parseInt(form.nbrBeneficiaires);
      }

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

  const showNbrEmployes = form.type === "salaire";
  const showNbrBeneficiaires = ["prime", "formation", "mutuelle"].includes(
    form.type
  );

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle Charge Salariale"
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
              Type de charge <span className="text-[#ef4444]">*</span>
            </Label>
            <Select
              value={form.type}
              onValueChange={(value) => onSelectChange("type", value)}
            >
              <SelectTrigger className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CHARGE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-sm font-medium text-[#171717]">
              Libellé <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              name="libelle"
              placeholder="Description de la charge salariale"
              value={form.libelle}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Montant (DH) <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              type="number"
              name="montant"
              placeholder="0.00"
              step="0.01"
              value={form.montant}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          {showNbrEmployes && (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#171717]">
                Nombre d'employés
              </Label>
              <Input
                type="number"
                name="nbrEmployes"
                placeholder="0"
                value={form.nbrEmployes}
                onChange={onChange}
                className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
              />
            </div>
          )}

          {showNbrBeneficiaires && (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#171717]">
                Nombre de bénéficiaires
              </Label>
              <Input
                type="number"
                name="nbrBeneficiaires"
                placeholder="0"
                value={form.nbrBeneficiaires}
                onChange={onChange}
                className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Période
            </Label>
            <Input
              name="periode"
              placeholder="Ex: 2025-01, 2025-Q1"
              value={form.periode}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Référence
            </Label>
            <Input
              name="reference"
              placeholder="Numéro de référence..."
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

          {form.montant && (
            <div className="md:col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-900 font-medium">
                  Montant total:
                </span>
                <span className="text-xl text-blue-900 font-bold">
                  {parseFloat(form.montant).toFixed(2)} DH
                </span>
              </div>
              {showNbrEmployes && form.nbrEmployes && (
                <div className="mt-2 pt-2 border-t border-blue-200 text-xs text-blue-700">
                  Soit{" "}
                  {(
                    parseFloat(form.montant) / parseInt(form.nbrEmployes)
                  ).toFixed(2)}{" "}
                  DH par employé
                </div>
              )}
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
