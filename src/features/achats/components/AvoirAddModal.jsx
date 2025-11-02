// filepath: src/features/achats/components/AvoirAddModal.jsx
import { useState } from "react";
import { DetailModal } from "@/components/modals";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AvoirAddModal({
  isOpen,
  onClose,
  onCreate,
  invoiceOptions = [],
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    fournisseur: "",
    avoirNumber: "",
    linkedInvoiceId: "",
    amount: "",
    reason: "",
    notes: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const submit = async () => {
    setError("");
    if (!form.date) return setError("La date est requise.");
    if (!form.fournisseur) return setError("Le fournisseur est requis.");
    if (!form.linkedInvoiceId) return setError("La facture liée est requise.");
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0) return setError("Montant invalide.");
    if (!form.reason) return setError("Le motif est requis.");

    try {
      setLoading(true);
      const inv = invoiceOptions.find(
        (i) => String(i.id) === String(form.linkedInvoiceId)
      );
      const payload = {
        date: form.date,
        fournisseur: form.fournisseur,
        avoirNumber: form.avoirNumber || undefined,
        linkedInvoiceId: form.linkedInvoiceId,
        linkedInvoiceNumber: inv?.invoiceNumber,
        amount: amt,
        reason: form.reason,
        status: "en attente",
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

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvel Avoir"
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
              N° Avoir
            </Label>
            <Input
              name="avoirNumber"
              placeholder="Ex: AV-2025-0001"
              value={form.avoirNumber}
              onChange={onChange}
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Facture liée <span className="text-[#ef4444]">*</span>
            </Label>
            <div className="relative">
              <select
                name="linkedInvoiceId"
                value={form.linkedInvoiceId}
                onChange={onChange}
                className="w-full h-11 pl-3 pr-8 text-sm border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] appearance-none bg-[#eff6ff] transition-all duration-200"
              >
                <option value="">Sélectionner</option>
                {invoiceOptions.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.invoiceNumber} — {inv.fournisseur}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Montant (MAD) <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              name="amount"
              value={form.amount}
              onChange={onChange}
              placeholder="0.00"
              className="w-full h-11 border-[#dbeafe] bg-[#eff6ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm px-3.5 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-sm font-medium text-[#171717]">
              Motif <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              name="reason"
              placeholder="Ex: Articles défectueux, erreur de facturation..."
              value={form.reason}
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
            {loading ? "Création..." : "Créer l'avoir"}
          </button>
        </div>
      </div>
    </DetailModal>
  );
}
