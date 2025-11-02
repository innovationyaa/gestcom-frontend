// filepath: src/features/achats/components/InvoiceAddModal.jsx
import { useMemo, useState } from "react";
import { DetailModal } from "@/components/modals";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function InvoiceAddModal({
  isOpen,
  onClose,
  onCreate,
  blOptions = [],
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    fournisseur: "",
    invoiceNumber: "",
    dueDate: "",
    paymentMethod: "",
    linkedBLs: [],
    notes: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const onChangeMulti = (e) => {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm((p) => ({ ...p, linkedBLs: values }));
  };

  const submit = async () => {
    setError("");
    if (!form.date) return setError("La date est requise.");
    if (!form.fournisseur) return setError("Le fournisseur est requis.");
    if (!form.dueDate) return setError("L'échéance est requise.");
    if (!form.paymentMethod)
      return setError("La méthode de règlement est requise.");
    if (!form.linkedBLs || form.linkedBLs.length === 0)
      return setError("Sélectionnez au moins un BL.");

    try {
      setLoading(true);
      const payload = {
        date: form.date,
        fournisseur: form.fournisseur,
        invoiceNumber: form.invoiceNumber || undefined,
        dueDate: form.dueDate,
        paymentMethod: form.paymentMethod,
        linkedBLs: form.linkedBLs,
        notes: form.notes || undefined,
        status: "en attente",
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

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle Facture"
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

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              N° Facture
            </Label>
            <Input
              name="invoiceNumber"
              placeholder="Ex: FA-2025-0001"
              value={form.invoiceNumber}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Échéance <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Méthode de règlement <span className="text-[#ef4444]">*</span>
            </Label>
            <div className="relative">
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={onChange}
                className="w-full h-11 pl-3 pr-8 text-sm border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] appearance-none bg-[#eff6ff] transition-all duration-200"
              >
                <option value="">Sélectionner</option>
                <option value="Virement">Virement</option>
                <option value="Chèque">Chèque</option>
                <option value="Espèces">Espèces</option>
                <option value="Carte">Carte</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-sm font-medium text-[#171717]">
              Lier des BL <span className="text-[#ef4444]">*</span>
            </Label>
            <select
              multiple
              value={form.linkedBLs}
              onChange={onChangeMulti}
              className="w-full min-h-28 p-2 text-sm border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] bg-[#eff6ff]"
            >
              {blOptions.map((bl) => (
                <option key={bl.id} value={bl.blNumber}>
                  {bl.blNumber} — {bl.fournisseur}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-blue-700 bg-blue-50 rounded px-2 py-1 border border-blue-100">
              Maintenez Ctrl/Cmd pour sélectionner plusieurs BL.
            </p>
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
            {loading ? "Création..." : "Créer la facture"}
          </button>
        </div>
      </div>
    </DetailModal>
  );
}
