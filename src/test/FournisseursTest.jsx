import React from "react";
import { useFournisseurs } from "@/features/fournisseurs/hooks/useFournisseurs";
import { FournisseursStats } from "@/features/fournisseurs/components/FournisseursStats";
import { Button } from "@/components/ui/button";

export default function FournisseursTest() {
  const { fournisseurs, loading, error, stats, addFournisseur } =
    useFournisseurs();

  const testAddFournisseur = async () => {
    const testData = {
      nom: "Test Fournisseur " + Date.now(),
      email: "test@example.com",
      telephone: "+33 1 23 45 67 89",
      adresse: "123 Rue de Test",
      codePostal: "75001",
      ville: "Paris",
      pays: "France",
      type: "entreprise",
      statut: "actif",
      siret: "12345678901234",
    };

    const result = await addFournisseur(testData);
    console.log("Add result:", result);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 p-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Fournisseurs Test Page</h1>
        <p className="text-sm text-muted-foreground">
          Testing Fournisseurs functionality
        </p>
      </div>

      <FournisseursStats stats={stats} loading={loading} />

      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            Fournisseurs Data ({fournisseurs.length})
          </h2>
          <Button onClick={testAddFournisseur}>Test Add Fournisseur</Button>
        </div>

        <div className="space-y-2">
          {fournisseurs.slice(0, 5).map((fournisseur) => (
            <div key={fournisseur.id} className="p-3 border rounded">
              <div className="font-medium">{fournisseur.nom}</div>
              <div className="text-sm text-muted-foreground">
                {fournisseur.email} • {fournisseur.type} • {fournisseur.statut}
              </div>
            </div>
          ))}
          {fournisseurs.length > 5 && (
            <div className="text-sm text-muted-foreground">
              ... and {fournisseurs.length - 5} more
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">Stats Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>Total: {stats.total}</div>
          <div>Actifs: {stats.actifs}</div>
          <div>Inactifs: {stats.inactifs}</div>
          <div>Suspendus: {stats.suspendus}</div>
        </div>
      </div>
    </div>
  );
}
