// filepath: src/features/stock/components/ImportStockModal.jsx
import { useState } from "react";
import { DetailModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ImportStockModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFile = (e) => setFile(e.target.files?.[0] || null);

  const submit = async () => {
    if (!file)
      return setError("Veuillez sélectionner un fichier CSV ou Excel.");
    setError("");
    try {
      setLoading(true);
      // TODO: implement real parsing + mapping.
      // For now, just simulate success.
      await new Promise((r) => setTimeout(r, 800));
      onClose?.();
      setFile(null);
    } catch (e) {
      setError("Échec de l'import.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Importer du stock"
      size="large"
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label className="text-sm">Fichier (CSV, XLSX)</Label>
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={onFile}
            className="block w-full text-sm text-[var(--color-foreground)] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-[var(--color-border)] file:text-sm file:font-medium file:bg-white file:text-[var(--color-foreground)] hover:file:bg-[var(--color-background)]"
          />
        </div>

        {error && (
          <div className="text-sm text-[var(--color-error)] bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button
            onClick={submit}
            disabled={loading || !file}
            className="bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white"
          >
            {loading ? "Importation..." : "Importer"}
          </Button>
        </div>
      </div>
    </DetailModal>
  );
}
