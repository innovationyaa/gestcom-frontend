import centralData from "../data/centralData.json";

class CentralDataService {
  constructor() {
    this.data = centralData;
  }

  // Simulate API delay
  async delay(ms = 300) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Provide raw accessors used by stockAdjustmentService
  async getData() {
    await this.delay();
    return this.data;
  }

  async updateData(updated) {
    await this.delay(200);
    // Replace in-memory data reference
    this.data = updated;
    // Optionally refresh derived statistics
    try {
      await this.refreshStats();
    } catch (e) {
      // noop if stats shape missing in early boot
    }
    return this.data;
  }

  // Dashboard Data
  async getDashboardStats() {
    await this.delay();
    return this.data.statistiques.dashboard;
  }
  async getRecentOrders(limit = 10) {
    await this.delay();
    return this.data.commandes_fournisseurs
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }

  async getAlertes() {
    await this.delay();
    return this.data.alertes;
  }

  // Stock Data
  async getStock() {
    await this.delay();
    return this.data.stock;
  }

  async getStockStats() {
    await this.delay();
    return this.data.statistiques.stock;
  }

  async getStockById(id) {
    await this.delay();
    return this.data.stock.find((item) => item.id === id);
  }

  async addStockItem(newItem) {
    await this.delay(500);
    const newId = Math.max(0, ...this.data.stock.map((item) => item.id)) + 1;
    const itemToAdd = {
      ...newItem,
      id: newId,
      dateCreation: new Date().toISOString().split("T")[0],
      dateModification: new Date().toISOString().split("T")[0],
    };
    this.data.stock.unshift(itemToAdd);
    return itemToAdd;
  }

  // Fournisseurs Data
  async getFournisseurs() {
    await this.delay();
    return this.data.fournisseurs;
  }

  async getFournisseursStats() {
    await this.delay();
    return this.data.statistiques.fournisseurs;
  }

  async getFournisseurById(id) {
    await this.delay();
    return this.data.fournisseurs.find((f) => f.id === id);
  }

  async addFournisseur(newFournisseur) {
    await this.delay(500);
    const newId = Math.max(0, ...this.data.fournisseurs.map((f) => f.id)) + 1;
    const fournisseurToAdd = {
      ...newFournisseur,
      id: newId,
      dateCreation: new Date().toISOString().split("T")[0],
      derniereCommande: null,
      totalCommandes: 0,
      chiffreAffaires: 0,
    };
    this.data.fournisseurs.unshift(fournisseurToAdd);
    return fournisseurToAdd;
  }

  async updateFournisseur(id, updatedData) {
    await this.delay(500);
    const index = this.data.fournisseurs.findIndex((f) => f.id === id);
    if (index === -1) throw new Error("Fournisseur not found");

    this.data.fournisseurs[index] = {
      ...this.data.fournisseurs[index],
      ...updatedData,
    };
    return this.data.fournisseurs[index];
  }

  async deleteFournisseur(id) {
    await this.delay(300);
    const index = this.data.fournisseurs.findIndex((f) => f.id === id);
    if (index === -1) throw new Error("Fournisseur not found");

    return this.data.fournisseurs.splice(index, 1)[0];
  }

  // Commandes Data
  async getCommandes() {
    await this.delay();
    return this.data.commandes_fournisseurs;
  }
  async getCommandesStats() {
    await this.delay();
    return this.data.statistiques.commandes_fournisseurs;
  }
  async getCommandeById(id) {
    await this.delay();
    return this.data.commandes_fournisseurs.find(
      (commande) => commande.id === id
    );
  }
  async addCommande(newCommande) {
    await this.delay(500);
    const newId =
      Math.max(0, ...this.data.commandes_fournisseurs.map((c) => c.id)) + 1;
    const commandeToAdd = {
      ...newCommande,
      id: newId,
      reference: `CMD-${String(newId).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
    };
    this.data.commandes_fournisseurs.unshift(commandeToAdd);
    return commandeToAdd;
  }
  async deleteCommande(id) {
    await this.delay(300);
    const index = this.data.commandes_fournisseurs.findIndex(
      (c) => c.id === id
    );
    if (index === -1) throw new Error("Commande not found");

    return this.data.commandes_fournisseurs.splice(index, 1)[0];
  }

  // Factures Data
  async getFactures() {
    await this.delay();
    return this.data.factures;
  }

  async getFactureById(id) {
    await this.delay();
    return this.data.factures.find((facture) => facture.id === id);
  }

  async addFacture(newFacture) {
    await this.delay(500);
    const newId = Math.max(0, ...this.data.factures.map((f) => f.id)) + 1;
    const factureToAdd = {
      ...newFacture,
      id: newId,
      numero: `FAC-${new Date().getFullYear()}-${String(newId).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
    };
    this.data.factures.unshift(factureToAdd);
    return factureToAdd;
  }

  // Clients Data
  async getClients() {
    await this.delay();
    return this.data.clients;
  }

  async getClientById(id) {
    await this.delay();
    return this.data.clients.find((client) => client.id === id);
  }

  // Categories Data
  async getCategories() {
    await this.delay();
    return this.data.categories;
  }

  // Search functionality
  async searchGlobal(query) {
    await this.delay();
    const results = {
      stock: this.data.stock.filter(
        (item) =>
          item.nom.toLowerCase().includes(query.toLowerCase()) ||
          item.reference.toLowerCase().includes(query.toLowerCase())
      ),
      fournisseurs: this.data.fournisseurs.filter(
        (f) =>
          f.nom.toLowerCase().includes(query.toLowerCase()) ||
          f.email.toLowerCase().includes(query.toLowerCase())
      ),
      clients: this.data.clients.filter(
        (c) =>
          c.nom.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase())
      ),
      commandes: this.data.commandes.filter(
        (o) =>
          o.numero.toLowerCase().includes(query.toLowerCase()) ||
          o.client.toLowerCase().includes(query.toLowerCase())
      ),
    };
    return results;
  }

  // Utility methods
  async refreshStats() {
    await this.delay();

    // Recalculate statistics based on current data
    const stockStats = {
      total: this.data.stock.length,
      inStock: this.data.stock.filter((item) => item.quantite > 0).length,
      outOfStock: this.data.stock.filter((item) => item.quantite === 0).length,
      lowStock: this.data.stock.filter(
        (item) => item.quantite <= item.seuilMinimum && item.quantite > 0
      ).length,
      totalValue: this.data.stock.reduce(
        (sum, item) => sum + item.quantite * item.prixAchat,
        0
      ),
    };

    const fournisseursStats = {
      total: this.data.fournisseurs.length,
      actifs: this.data.fournisseurs.filter((f) => f.statut === "actif").length,
      inactifs: this.data.fournisseurs.filter((f) => f.statut === "inactif")
        .length,
      suspendus: this.data.fournisseurs.filter((f) => f.statut === "suspendu")
        .length,
      totalChiffreAffaires: this.data.fournisseurs.reduce(
        (sum, f) => sum + f.chiffreAffaires,
        0
      ),
    };

    const commandesStats = {
      total: this.data.commandes_fournisseurs.length,
      enAttente: this.data.commandes_fournisseurs.filter(
        (c) => c.statut === "en_attente"
      ).length,
      livrees: this.data.commandes_fournisseurs.filter(
        (c) => c.statut === "livre"
      ).length,
      annulees: this.data.commandes_fournisseurs.filter(
        (c) => c.statut === "annule"
      ).length,
      totalValue: this.data.commandes_fournisseurs.reduce(
        (sum, c) => sum + c.montantTTC,
        0
      ),
    };

    // Update statistics
    this.data.statistiques.stock = stockStats;
    this.data.statistiques.fournisseurs = fournisseursStats;
    this.data.statistiques.commandes_fournisseurs = commandesStats;

    return {
      stock: stockStats,
      fournisseurs: fournisseursStats,
      commandes: commandesStats,
    };
  }
}

// Export singleton instance
export const centralDataService = new CentralDataService();
export default centralDataService;
