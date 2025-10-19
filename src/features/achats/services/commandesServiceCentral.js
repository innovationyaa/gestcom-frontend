import centralDataService from "@/services/centralDataService";

export class CommandesService {
  static async getAllCommandes() {
    return await centralDataService.getCommandes();
  }

  static async getCommandeById(id) {
    return await centralDataService.getCommandeById(id);
  }

  static async getCommandesByStatus(statut) {
    const commandes = await centralDataService.getCommandes();
    return commandes.filter((commande) => commande.statut === statut);
  }

  static async getCommandesByFournisseur(fournisseurId) {
    const commandes = await centralDataService.getCommandes();
    return commandes.filter(
      (commande) => commande.fournisseurId === fournisseurId
    );
  }

  static async searchCommandes(query) {
    const commandes = await centralDataService.getCommandes();
    const lowerQuery = query.toLowerCase();
    return commandes.filter(
      (commande) =>
        commande.reference.toLowerCase().includes(lowerQuery) ||
        commande.fournisseur.toLowerCase().includes(lowerQuery) ||
        commande.notes?.toLowerCase().includes(lowerQuery)
    );
  }

  static async addCommande(commandeData) {
    return await centralDataService.addCommande(commandeData);
  }

  static async updateCommande(id, commandeData) {
    // Note: Update method would need to be implemented in centralDataService
    const commande = await centralDataService.getCommandeById(id);
    if (!commande) {
      throw new Error("Commande not found");
    }

    // For now, we'll simulate an update
    Object.assign(commande, commandeData);
    return commande;
  }

  static async deleteCommande(id) {
    return await centralDataService.deleteCommande(id);
  }

  static async getCommandesStats() {
    return await centralDataService.getCommandesStats();
  }

  static async getCommandesByDateRange(startDate, endDate) {
    const commandes = await centralDataService.getCommandes();
    return commandes.filter((commande) => {
      const commandeDate = new Date(commande.date);
      return (
        commandeDate >= new Date(startDate) && commandeDate <= new Date(endDate)
      );
    });
  }

  static async getCommandesWithFilters(filters) {
    let commandes = await centralDataService.getCommandes();

    if (filters.statut && filters.statut !== "all") {
      commandes = commandes.filter((c) => c.statut === filters.statut);
    }

    if (filters.fournisseur) {
      commandes = commandes.filter((c) =>
        c.fournisseur.toLowerCase().includes(filters.fournisseur.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      commandes = commandes.filter(
        (c) => new Date(c.date) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      commandes = commandes.filter(
        (c) => new Date(c.date) <= new Date(filters.dateTo)
      );
    }

    if (filters.montantMin) {
      commandes = commandes.filter(
        (c) => c.montantTotal >= parseFloat(filters.montantMin)
      );
    }

    if (filters.montantMax) {
      commandes = commandes.filter(
        (c) => c.montantTotal <= parseFloat(filters.montantMax)
      );
    }

    return commandes;
  }

  static async getTopFournisseurs(limit = 5) {
    const commandes = await centralDataService.getCommandes();
    const fournisseurStats = {};

    commandes.forEach((commande) => {
      if (!fournisseurStats[commande.fournisseur]) {
        fournisseurStats[commande.fournisseur] = {
          name: commande.fournisseur,
          total: 0,
          count: 0,
        };
      }
      fournisseurStats[commande.fournisseur].total +=
        commande.montantTotal || 0;
      fournisseurStats[commande.fournisseur].count += 1;
    });

    return Object.values(fournisseurStats)
      .sort((a, b) => b.total - a.total)
      .slice(0, limit);
  }

  static async getRecentCommandes(limit = 10) {
    const commandes = await centralDataService.getCommandes();
    return commandes
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }
}
