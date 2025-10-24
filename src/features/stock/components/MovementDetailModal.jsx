// filepath: src/features/stock/components/MovementDetailModal.jsx
import { DetailModal } from "@/components/ui/DetailModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Calendar,
  FileText,
  Hash,
} from "lucide-react";

export function MovementDetailModal({ isOpen, onClose, movement }) {
  if (!movement) return null;

  const isEntry = movement.typeMouvement === "entrée";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails du Mouvement"
      size="large"
    >
      <div className="space-y-6">
        {/* Header with Type Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            {isEntry ? (
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            ) : (
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-orange-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                {isEntry ? "Entrée de Stock" : "Sortie de Stock"}
              </h3>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                Mouvement #{movement.id}
              </p>
            </div>
          </div>
          <Badge
            className={
              isEntry
                ? "bg-green-100 text-green-800 border-green-300"
                : "bg-orange-100 text-orange-800 border-orange-300"
            }
          >
            {isEntry ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {isEntry ? "Entrée" : "Sortie"}
          </Badge>
        </div>

        {/* Movement Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date */}
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[var(--color-surface)] rounded-lg">
                  <Calendar className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--color-foreground-muted)] mb-1">
                    Date et Heure
                  </p>
                  <p className="text-sm font-medium text-[var(--color-foreground)]">
                    {formatDate(movement.date)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quantity */}
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${isEntry ? "bg-green-100" : "bg-orange-100"}`}
                >
                  <Hash
                    className={`h-4 w-4 ${isEntry ? "text-green-600" : "text-orange-600"}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--color-foreground-muted)] mb-1">
                    Quantité
                  </p>
                  <p
                    className={`text-2xl font-bold ${isEntry ? "text-green-600" : "text-orange-600"}`}
                  >
                    {isEntry ? "+" : "-"}
                    {movement.quantite}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Article Information */}
        {movement.article && (
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--color-foreground-muted)] mb-2">
                    Article concerné
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[var(--color-foreground)]">
                      {movement.article.reference || "N/A"}
                    </p>
                    <p className="text-sm text-[var(--color-foreground)]">
                      {movement.article.nom || "N/A"}
                    </p>
                    {movement.article.description && (
                      <p className="text-xs text-[var(--color-foreground-muted)] mt-1">
                        {movement.article.description}
                      </p>
                    )}
                    {movement.article.quantiteActuelle !== undefined && (
                      <div className="mt-2 pt-2 border-t border-[var(--color-border)]">
                        <p className="text-xs text-[var(--color-foreground-muted)]">
                          Stock actuel:{" "}
                          <span className="font-semibold text-[var(--color-foreground)]">
                            {movement.article.quantiteActuelle}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Remarque */}
        {movement.remarque && (
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[var(--color-surface)] rounded-lg">
                  <FileText className="h-4 w-4 text-[var(--color-foreground-muted)]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--color-foreground-muted)] mb-2">
                    Remarque
                  </p>
                  <p className="text-sm text-[var(--color-foreground)] whitespace-pre-wrap">
                    {movement.remarque}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end pt-4 border-t border-[var(--color-border)]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </DetailModal>
  );
}
