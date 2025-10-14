import achatsData from './achats.json';

export class AchatsService {
  static async getAllAchats() {
    // Simuler une latence réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    return achatsData;
  }

  static async getAchatById(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return achatsData.find(achat => achat.id === id);
  }

  static async getAchatsByFournisseur(fournisseur) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return achatsData.filter(achat => achat.fournisseur === fournisseur);
  }

  static async getAchatsByStatut(statut) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return achatsData.filter(achat => achat.statut === statut);
  }

  static async searchAchats(query) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const searchTerm = query.toLowerCase();
    return achatsData.filter(achat => 
      achat.id.toLowerCase().includes(searchTerm) ||
      achat.fournisseur.toLowerCase().includes(searchTerm) ||
      achat.articles.some(article => 
        article.nom.toLowerCase().includes(searchTerm)
      )
    );
  }

  static async addAchat(nouvelAchat) {
    await new Promise(resolve => setTimeout(resolve, 700));
    achatsData.unshift(nouvelAchat);
    return nouvelAchat;
  }

  static async updateAchat(id, updatedAchat) {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = achatsData.findIndex(a => a.id === id);
    if (index !== -1) {
      achatsData[index] = { ...updatedAchat, id };
      return achatsData[index];
    }
    return null;
  }

  static async deleteAchat(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = achatsData.findIndex(a => a.id === id);
    if (index !== -1) {
      return achatsData.splice(index, 1)[0];
    }
    return null;
  }

  static async getAchatsStats() {
    await new Promise(resolve => setTimeout(resolve, 400));
    const total = achatsData.length;
    const payes = achatsData.filter(a => a.statut === 'payé').length;
    const enAttente = achatsData.filter(a => a.statut === 'en attente').length;
    const annules = achatsData.filter(a => a.statut === 'annulé').length;
    const montantTotal = achatsData.reduce((sum, a) => sum + a.totalTTC, 0);
    const montantMoyen = total > 0 ? montantTotal / total : 0;

    return {
      total,
      payes,
      enAttente,
      annules,
      montantTotal: parseFloat(montantTotal.toFixed(2)),
      montantMoyen: parseFloat(montantMoyen.toFixed(2))
    };
  }
}
