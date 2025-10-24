// filepath: src/features/stock/components/QuickStockEntryModal.jsx
import { useEffect, useMemo, useState } from "react";
import { DetailModal } from "@/components/modals";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react";
import { useArticles } from "../hooks/useArticles";
import { useMouvements } from "../hooks/useMouvements";

const REASONS = [
  { value: "achat", label: "Achat/Réception" },
  { value: "retour", label: "Retour client" },
  { value: "production", label: "Production interne" },
  { value: "ajustement_positif", label: "Ajustement inventaire (+)" },
  { value: "transfert_entree", label: "Transfert entrant" },
  { value: "autre_entree", label: "Autre motif d'entrée" },
];

export default function QuickStockEntryModal({ isOpen, onClose, onSuccess }) {
  const { articles } = useArticles();
  const { addEntry } = useMouvements();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    articleId: "",
    quantity: "",
    reason: "achat",
    reference: "",
    notes: "",
  });
  const [error, setError] = useState("");

  // Sort articles by reference
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) =>
      (a.reference || "").localeCompare(b.reference || "")
    );
  }, [articles]);

  const selectedItem = useMemo(
    () => articles.find((it) => String(it.id) === String(form.articleId)),
    [articles, form.articleId]
  );

  const qtyNum = useMemo(
    () => parseInt(form.quantity, 10) || 0,
    [form.quantity]
  );

  const projected = useMemo(() => {
    if (!selectedItem) return null;
    return (
      (selectedItem.quantiteActuelle || selectedItem.quantite || 0) + qtyNum
    );
  }, [selectedItem, qtyNum]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on change
  };
  const submit = async () => {
    setError("");

    // Validation
    if (!form.articleId) return setError("Veuillez choisir un article.");
    if (qtyNum <= 0) return setError("La quantité doit être supérieure à 0.");
    if (!form.reason) return setError("Le motif est requis.");

    // Build remarque from reason and notes
    const remarque = [
      REASONS.find((r) => r.value === form.reason)?.label || form.reason,
      form.reference ? `Réf: ${form.reference}` : "",
      form.notes || "",
    ]
      .filter(Boolean)
      .join(" - ");

    try {
      setLoading(true);
      const result = await addEntry(
        parseInt(form.articleId, 10),
        qtyNum,
        remarque
      );

      if (result.success) {
        // Reset form
        setForm({
          articleId: "",
          quantity: "",
          reason: "achat",
          reference: "",
          notes: "",
        });
        onSuccess?.();
        onClose?.();
      } else {
        setError(result.error || "Erreur lors de l'enregistrement.");
      }
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
              Article <span className="text-[#ef4444]">*</span>
            </Label>
            <div className="relative">
              <select
                name="articleId"
                value={form.articleId}
                onChange={onChange}
                className="w-full h-11 pl-3 pr-8 text-sm border border-[#dcfce7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 focus:border-[#22c55e] appearance-none bg-[#f0fdf4] transition-all duration-200"
              >
                <option value="">Sélectionner un article</option>
                {sortedArticles.map((it) => (
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
              Quantité à entrer <span className="text-[#ef4444]">*</span>
            </Label>
            <Input
              type="number"
              min="1"
              name="quantity"
              value={form.quantity}
              onChange={onChange}
              placeholder="0"
              className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
            />
            {selectedItem && (
              <p className="mt-1 text-xs text-green-700 bg-green-50 rounded px-2 py-1">
                Stock actuel:{" "}
                {selectedItem.quantiteActuelle || selectedItem.quantite || 0} •
                Après entrée: <span className="font-semibold">{projected}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">
              Motif <span className="text-[#ef4444]">*</span>
            </Label>
            <div className="relative">
              <select
                name="reason"
                value={form.reason}
                onChange={onChange}
                className="w-full h-11 pl-3 pr-8 text-sm border border-[#dcfce7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 focus:border-[#22c55e] appearance-none bg-[#f0fdf4] transition-all duration-200"
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
              Référence document
            </Label>
            <Input
              name="reference"
              value={form.reference}
              onChange={onChange}
              placeholder="N° BL, facture, etc."
              className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm h-11 transition-all duration-200 bg-[#f0fdf4] px-3.5 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-sm font-medium text-[#171717]">Notes</Label>
            <Textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder="Notes complémentaires (optionnel)"
              className="w-full border-[#dcfce7] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30 rounded-lg text-sm transition-all duration-200 bg-[#f0fdf4] min-h-[100px] p-3.5 focus:outline-none resize-none"
              rows={3}
            />
          </div>
        </div>
        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}{" "}
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
            {" "}
            {loading ? "Enregistrement..." : "Enregistrer l'entrée"}
          </button>
        </div>
      </div>
    </DetailModal>
  );
}
