import centralDataService from '@/services/centralDataService'

export class FournisseursService {  static async getAllFournisseurs() {
    return await centralDataService.getFournisseurs()
  }

  static async getFournisseurById(id) {
    return await centralDataService.getFournisseurById(id)
  }

  static async getFournisseursByType(type) {
    const fournisseurs = await centralDataService.getFournisseurs()
    return fournisseurs.filter(fournisseur => fournisseur.type === type)
  }

  static async getFournisseursByStatus(statut) {
    const fournisseurs = await centralDataService.getFournisseurs()
    return fournisseurs.filter(fournisseur => fournisseur.statut === statut)
  }

  static async searchFournisseurs(query) {
    const fournisseurs = await centralDataService.getFournisseurs()
    const lowerQuery = query.toLowerCase()
    return fournisseurs.filter(fournisseur =>
      fournisseur.nom.toLowerCase().includes(lowerQuery) ||
      fournisseur.email?.toLowerCase().includes(lowerQuery) ||
      fournisseur.telephone?.includes(lowerQuery) ||
      fournisseur.ville?.toLowerCase().includes(lowerQuery)
    )
  }

  static async addFournisseur(newFournisseur) {
    return await centralDataService.addFournisseur(newFournisseur)
  }

  static async updateFournisseur(id, updatedData) {
    return await centralDataService.updateFournisseur(id, updatedData)
  }

  static async deleteFournisseur(id) {
    return await centralDataService.deleteFournisseur(id)
  }

  static async getStats() {
    return await centralDataService.getFournisseursStats()
  }
}
