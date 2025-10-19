import commandesData from "./commandes.json";

export class CommandesService {
  static async getAllCommandes() {
    // Simuler une latence réseau
    await new Promise((resolve) => setTimeout(resolve, 500));
    return commandesData;
  }

  static async getCommandeById(id) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return commandesData.find((commande) => commande.id === id);
  }

  static async getCommandesByFournisseur(fournisseur) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return commandesData.filter(
      (commande) => commande.fournisseur === fournisseur
    );
  }

  static async getCommandesByStatut(statut) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return commandesData.filter((commande) => commande.statut === statut);
  }

  static async searchCommandes(query) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const searchTerm = query.toLowerCase();
    return commandesData.filter(
      (commande) =>
        commande.id.toLowerCase().includes(searchTerm) ||
        commande.fournisseur.toLowerCase().includes(searchTerm) ||
        commande.articles.some((article) =>
          article.designation.toLowerCase().includes(searchTerm)
        )
    );
  }

  static async addCommande(commandeData) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newCommande = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      statut: "en attente",
      ...commandeData,
    };
    commandesData.unshift(newCommande);
    return newCommande;
  }

  static async updateCommande(id, commandeData) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = commandesData.findIndex((commande) => commande.id === id);
    if (index !== -1) {
      commandesData[index] = { ...commandesData[index], ...commandeData };
      return commandesData[index];
    }
    throw new Error("Commande not found");
  }

  static async deleteCommande(id) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = commandesData.findIndex((commande) => commande.id === id);
    if (index !== -1) {
      return commandesData.splice(index, 1)[0];
    }
    throw new Error("Commande not found");
  }

  static async getCommandesStats() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const total = commandesData.length;
    const payes = commandesData.filter((c) => c.statut === "payé").length;
    const enAttente = commandesData.filter(
      (c) => c.statut === "en attente"
    ).length;
    const annules = commandesData.filter((c) => c.statut === "annulé").length;

    const montantTotal = commandesData.reduce((sum, commande) => {
      return sum + (commande.montantTotal || 0);
    }, 0);

    const montantMoyen = total > 0 ? montantTotal / total : 0;

    return {
      total,
      payes,
      enAttente,
      annules,
      montantTotal,
      montantMoyen,
    };
  }
}
