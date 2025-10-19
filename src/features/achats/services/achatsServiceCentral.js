import centralDataService from "@/services/centralDataService";

export class AchatsService {
  static async getAllAchats() {
    return await centralDataService.getAchats();
  }

  static async getAchatById(id) {
    return await centralDataService.getAchatById(id);
  }

  static async getAchatsByStatus(statut) {
    const achats = await centralDataService.getAchats();
    return achats.filter((achat) => achat.statut === statut);
  }

  static async getAchatsByFournisseur(fournisseurId) {
    const achats = await centralDataService.getAchats();
    return achats.filter((achat) => achat.fournisseurId === fournisseurId);
  }

  static async searchAchats(query) {
    const achats = await centralDataService.getAchats();
    const lowerQuery = query.toLowerCase();
    return achats.filter(
      (achat) =>
        achat.reference.toLowerCase().includes(lowerQuery) ||
        achat.fournisseur.toLowerCase().includes(lowerQuery) ||
        achat.notes?.toLowerCase().includes(lowerQuery)
    );
  }

  static async addAchat(newAchat) {
    return await centralDataService.addAchat(newAchat);
  }

  static async updateAchat(id, updatedData) {
    // This would need to be implemented in centralDataService
    const achats = await centralDataService.getAchats();
    const index = achats.findIndex((achat) => achat.id === id);
    if (index === -1) throw new Error("Achat not found");

    achats[index] = { ...achats[index], ...updatedData };
    return achats[index];
  }

  static async deleteAchat(id) {
    return await centralDataService.deleteAchat(id);
  }

  static async getStats() {
    return await centralDataService.getAchatsStats();
  }

  static async getFilteredAchats(filters) {
    let achats = await this.getAllAchats();

    // Apply filters
    if (filters.search) {
      achats = await this.searchAchats(filters.search);
    }

    if (filters.statut && filters.statut !== "all") {
      achats = achats.filter((achat) => achat.statut === filters.statut);
    }

    if (filters.fournisseur && filters.fournisseur !== "all") {
      achats = achats.filter(
        (achat) => achat.fournisseurId === parseInt(filters.fournisseur)
      );
    }

    if (filters.dateStart) {
      achats = achats.filter((achat) => achat.date >= filters.dateStart);
    }

    if (filters.dateEnd) {
      achats = achats.filter((achat) => achat.date <= filters.dateEnd);
    }

    // Apply sorting
    if (filters.sortBy) {
      achats.sort((a, b) => {
        let aVal = a[filters.sortBy];
        let bVal = b[filters.sortBy];

        if (filters.sortBy === "montantTTC") {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }

        if (filters.sortOrder === "desc") {
          return bVal > aVal ? 1 : -1;
        } else {
          return aVal > bVal ? 1 : -1;
        }
      });
    }

    return achats;
  }
}
