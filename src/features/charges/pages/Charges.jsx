// filepath: src/features/charges/pages/Charges.jsx
import { useMemo } from "react";

export default function Charges() {
  const info = useMemo(
    () => ({
      title: "Charges",
      subtitle: "Gestion des charges (à venir)",
    }),
    []
  );

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">
          {info.title}
        </h1>
        <p className="text-sm text-[var(--color-foreground-muted)]">
          {info.subtitle}
        </p>
      </div>

      <div className="p-8 text-center text-[var(--color-foreground-muted)] border border-[var(--color-border)] rounded-lg bg-white">
        La page Charges est vide pour l'instant. Nous commencerons son
        développement plus tard.
      </div>
    </div>
  );
}
