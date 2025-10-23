import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building, Calendar } from "lucide-react";

export function FournisseurDetailModal({ fournisseur, open, onOpenChange }) {
  if (!fournisseur) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Non définie";
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[var(--color-surface)] border-[var(--color-border)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--color-foreground)]">
            <Building className="h-5 w-5" />
            Détails du Fournisseur
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Nom */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[var(--color-foreground-muted)] uppercase">
              Nom
            </p>
            <p className="text-sm text-[var(--color-foreground)]">
              {fournisseur.nom}
            </p>
          </div>

          {/* ICE & IF */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[var(--color-foreground-muted)] uppercase">
                ICE
              </p>
              <p className="text-sm text-[var(--color-foreground)]">
                {fournisseur.ice || "-"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[var(--color-foreground-muted)] uppercase">
                IF
              </p>
              <p className="text-sm text-[var(--color-foreground)]">
                {fournisseur.ifNumber || "-"}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[var(--color-foreground-muted)] uppercase">
              Contact
            </p>
            <p className="text-sm text-[var(--color-foreground)]">
              {fournisseur.contact || "-"}
            </p>
          </div>

          {/* Adresse */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[var(--color-foreground-muted)] uppercase">
              Adresse
            </p>
            <p className="text-sm text-[var(--color-foreground)]">
              {fournisseur.adresse || "-"}
            </p>
          </div>

          {/* Date Création */}
          {fournisseur.dateCreation && (
            <div className="space-y-1 pt-2 border-t border-[var(--color-border)]">
              <p className="text-xs font-semibold text-[var(--color-foreground-muted)] uppercase flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Date création
              </p>
              <p className="text-sm text-[var(--color-foreground)]">
                {formatDate(fournisseur.dateCreation)}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
