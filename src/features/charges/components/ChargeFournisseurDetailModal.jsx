import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function ChargeFournisseurDetailModal({
  charge,
  open,
  onClose,
}) {
  if (!charge) return null;

  const statusConfig = {
    payee: { label: "Payée", tone: "bg-green-100 text-green-800" },
    en_attente: { label: "En attente", tone: "bg-orange-100 text-orange-800" },
    annulee: { label: "Annulée", tone: "bg-red-100 text-red-800" },
  };

  const status = statusConfig[charge.status] || statusConfig.en_attente;

  return (
    <Dialog open={!!open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-md border-0">
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-md -mx-6 -mt-6">
          <DialogTitle className="text-white">
            Détails Charge Fournisseur
          </DialogTitle>
          <DialogDescription className="text-blue-100 text-sm">
            {charge.libelle}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-[var(--color-foreground-muted)]">Date</p>
            <div className="font-medium">{formatDate(charge.date)}</div>
          </div>

          <div>
            <p className="text-xs text-[var(--color-foreground-muted)]">
              Fournisseur
            </p>
            <div className="font-medium">{charge.fournisseur}</div>
          </div>

          <div>
            <p className="text-xs text-[var(--color-foreground-muted)]">
              Catégorie
            </p>
            <div className="font-medium">{charge.categorie}</div>
          </div>

          <div>
            <p className="text-xs text-[var(--color-foreground-muted)]">
              Statut
            </p>
            <Badge className={`${status.tone} border-transparent`}>
              {status.label}
            </Badge>
          </div>

          <div>
            <p className="text-xs text-[var(--color-foreground-muted)]">
              Montant HT
            </p>
            <div className="font-semibold">
              {charge.montantHT?.toLocaleString()} DH
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--color-foreground-muted)]">TVA</p>
            <div className="font-semibold">
              {charge.tva}% ({charge.montantTVA?.toLocaleString()} DH)
            </div>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-[var(--color-foreground-muted)]">
              Montant TTC
            </p>
            <div className="text-[var(--color-blue)] text-lg font-bold">
              {charge.montantTTC?.toLocaleString()} DH
            </div>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-[var(--color-foreground-muted)]">
              Notes
            </p>
            <div className="text-sm text-[var(--color-foreground)] whitespace-pre-wrap">
              {charge.notes || "-"}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
