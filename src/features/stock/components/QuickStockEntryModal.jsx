// filepath: src/features/stock/components/QuickStockEntryModal.jsx
import { useEffect, useMemo, useState } from "react";
import { DetailModal } from "@/components/modals";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import centralDataService from "@/services/centralDataService";
import stockAdjustmentService from "../services/stockAdjustmentService";
import { ChevronDown } from "lucide-react";

const REASONS = [
  { value: "achat", label: "Achat/Réception" },
  { value: "retour", label: "Retour client" },
  { value: "production", label: "Production interne" },
  { value: "correction", label: "Correction inventaire" },
  { value: "transfert_entree", label: "Transfert entrant" },
  { value: "autre", label: "Autre" },
];

export default function QuickStockEntryModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    articleId: "",
    quantity: "",
    reason: "achat",
    reference: "",
    notes: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const load = async () => {
      const stock = await centralDataService.getStock();
      setItems(
        (stock || [])
          .slice()
          .sort((a, b) => (a.reference || "").localeCompare(b.reference || ""))
      );
    };
    load();
  }, [isOpen]);

  const selectedItem = useMemo(
    () => items.find((it) => String(it.id) === String(form.articleId)),
    [items, form.articleId]
  );

  const qtyNum = useMemo(
    () => parseInt(form.quantity, 10) || 0,
    [form.quantity]
  );
  const projected = useMemo(() => {
    if (!selectedItem) return null;
    return selectedItem.quantite + qtyNum;
  }, [selectedItem, qtyNum]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    setError("");
    if (!form.articleId) return setError("Veuillez choisir un article.");
    if (qtyNum <= 0) return setError("Quantité invalide.");
    if (!form.reason) return setError("Motif requis.");

    const payload = {
      type: "entree",
      quantity: qtyNum,
      reason: form.reason,
      reference: form.reference,
      notes: form.notes,
      user: "Admin User",
    };

    const validation = stockAdjustmentService.validateAdjustment(payload);
    if (!validation.isValid) {
      return setError(validation.errors.join("\n"));
    }

    try {
      setLoading(true);
      const result = await stockAdjustmentService.addStockMovement(
        Number(form.articleId),
        payload
      );
      onSuccess?.(result);
      onClose?.();
      setForm({
        articleId: "",
        quantity: "",
        reason: "achat",
        reference: "",
        notes: "",
      });
    } catch (e) {
      setError(e.message || "Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Saisir une entrée de stock"
      size="large"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto -mx-2 px-2">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Article
            </Label>
            <div className="relative">
              <select
                name="articleId"
                value={form.articleId}
                onChange={onChange}
                className="w-full h-11 pl-3 pr-8 text-sm border border-[#e0e7ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] appearance-none bg-[#f8faff] transition-all duration-200"
              >
                <option value="" disabled>
                  Sélectionner un article
                </option>
                {items.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.reference} — {it.nom}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Quantité à entrer
            </Label>
            <Input
              type="number"
              min="1"
              name="quantity"
              value={form.quantity}
              onChange={onChange}
              placeholder="0"
              className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
            />
            {selectedItem && (
              <p className="mt-1 text-xs text-[var(--color-foreground-muted)]">
                Stock actuel: {selectedItem.quantite} • Après entrée:{" "}
                {projected}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">Motif</Label>
            <div className="relative">
              <select
                name="reason"
                value={form.reason}
                onChange={onChange}
                className="w-full h-11 pl-3 pr-8 text-sm border border-[#e0e7ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] appearance-none bg-[#f8faff] transition-all duration-200"
              >
                {REASONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[#737373] pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Référence (document)
            </Label>
            <Input
              name="reference"
              value={form.reference}
              onChange={onChange}
              placeholder="N° BL, facture, etc."
              className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f8faff] px-3.5 focus:outline-none focus:ring-offset-1 focus:ring-offset-transparent"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">Notes</Label>
            <Textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder="Notes complémentaires"
              className="w-full border-[#e0e7ff] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/30 rounded-lg text-sm transition-all duration-200 bg-[#f8faff] min-h-[100px] p-3.5 focus:outline-none"
              rows={3}
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-[var(--color-error)] bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 mt-2 border-t border-[#e5f2ff] md:col-span-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-medium text-[#3b82f6] bg-white border border-[#e5e5e5] rounded-lg hover:bg-[#f8faff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]/30 transition-all duration-200 h-11 flex items-center"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#3b82f6] to-[#2563eb] border border-transparent rounded-lg hover:from-[#3b82f6]/90 hover:to-[#2563eb]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]/50 transition-all duration-200 h-11 flex items-center shadow-md hover:shadow-lg"
          >
            {loading ? "Enregistrement..." : "Enregistrer l'entrée"}
          </button>
        </div>
      </div>
    </DetailModal>
  );
}
